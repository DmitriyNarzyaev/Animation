import Container = PIXI.Container;
import { Sprite } from "pixi.js";
import { Main } from "./Main";
import ColorMatrixFilter = PIXI.filters.ColorMatrixFilter;
import NoiseFilter = PIXI.filters.NoiseFilter;

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = 1920;
	public static readonly WINDOW_HEIGHT:number = 885;
	private readonly _animationContainer:PIXI.Container;
	private readonly _noiseFilter:NoiseFilter;
	private _colorMatrix:ColorMatrixFilter;
	private _background:PIXI.Sprite;
	private _water:PIXI.Sprite;
	private _lotuses:PIXI.Sprite;
	private _boat:PIXI.Sprite;
	private _body:PIXI.Sprite;
	private _umbrella:PIXI.Sprite;
	private _wall:PIXI.Sprite;
	private _clouds:PIXI.Sprite;
	private _displacementSprite:PIXI.Sprite;
	private _iterator:number = 0;
	private _cloudsArray:Sprite[] = [];
	private _progressBar:PIXI.Graphics;
	private _progressBarContainer:PIXI.Container;

	constructor() {
		super();
		this._animationContainer = new PIXI.Container;
		this.addChild(this._animationContainer);
		this._noiseFilter = new PIXI.filters.NoiseFilter(.2);
		this.pictureLoader();
	}

	private pictureLoader():void {
		const loader:PIXI.Loader = new PIXI.Loader();
		loader
			.add("background", "background.jpg")
			.add("water", "water.png")
			.add("lotuses", "lotuses.png")
			.add("boat", "boat.png")
			.add("body", "body.png")
			.add("umbrella", "umbrella.png")
			.add("wall", "wall.png")
			.add("clouds", "clouds.png")
			.add("displacement", "displacement.jpg");

		loader.onProgress.add(() => {
			this.addedProgressBar(loader.progress.toFixed(2) as unknown as number * 15)
		});

		loader.load(()=> {
			setTimeout(() => {
				this.startProject();
			}, 500);
		});
	}

	private addedProgressBar(lWidth:number):void {
		let loaderX:number = (Main_Container.WINDOW_WIDTH - 1500)/2;
		let loaderY:number = Main_Container.WINDOW_HEIGHT /1.2;

		if (this._progressBarContainer){
			this.removeChild(this._progressBarContainer);
		}
		this._progressBarContainer = new PIXI.Container;
		this.addChild(this._progressBarContainer);
		this._progressBarContainer.x = loaderX;
		this._progressBarContainer.y = loaderY;
		this._progressBarContainer.interactive = true;
		this._progressBarContainer.buttonMode = true;

		let progressBarBorders:PIXI.Graphics = new PIXI.Graphics;
		progressBarBorders.beginFill(0xffffff, .1);
		progressBarBorders.drawRect(0, 0, 1500, 12);
		this._progressBarContainer.addChild(progressBarBorders)

		this._progressBar = new PIXI.Graphics;
		this._progressBar.beginFill(0x885522);
		this._progressBar.drawRect(1, 1, lWidth, 10);
		this._progressBarContainer.addChild(this._progressBar)
	}

	private startProject():void {
		this.removeChild(this._progressBarContainer);
		this.addedBackground();
		this.addedDisplacementFilter();
		this.addedLotuses();
		this.addedBoat();
		this.addedClouds(0);
		Main.pixiApp.ticker.add(this.ticker, this);
		this._animationContainer.x = (Main_Container.WINDOW_WIDTH - this._background.width)/2;

		const mask = new PIXI.Graphics()
		mask.beginFill(0x000000)
		mask.drawRect(this._animationContainer.x, this._animationContainer.y, this._background.width, this._background.height);
		this._animationContainer.mask = mask;
	}

	private addedBackground():void {
		this._background = Sprite.from("background");
		this._animationContainer.addChild(this._background);
	}

	private addedDisplacementFilter():void {
		this._displacementSprite = PIXI.Sprite.from("displacement.jpg");
		let displacementFilter = new PIXI.filters.DisplacementFilter(this._displacementSprite);
		this._displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
		this._animationContainer.addChild(this._displacementSprite);
		this._displacementSprite.alpha = .01;
    	this._displacementSprite.scale.x = 4;
    	this._displacementSprite.scale.y = 3;

		this.addedWater(displacementFilter);
		this.addedJapaneseWoman(displacementFilter);
	}

	private addedWater(filter:PIXI.filters.DisplacementFilter):void {
		this._water = Sprite.from("water");
		this._animationContainer.addChild(this._water);
		this._water.y = this._background.height - this._water.height;
		this._water.filters = [filter];
	}

	private addedJapaneseWoman(filter:PIXI.filters.DisplacementFilter):void{
		this._body = Sprite.from("body");
		this._body.x = 895;
		this._body.y = this._background.height - this._body.height
		this._body.filters = [filter];
		this._animationContainer.addChild(this._body);

		this._umbrella = Sprite.from("umbrella");
		this._umbrella.x = 880;
		this._umbrella.y = this._background.height - 215;
		this._animationContainer.addChild(this._umbrella);

		this._wall = Sprite.from("wall");
		this._wall.x = 934;
		this._wall.y = this._background.height - this._wall.height;
		this._animationContainer.addChild(this._wall);
	}

	private addedLotuses():void {
		this._lotuses = Sprite.from("lotuses");
		this._lotuses.x = 230;
		this._lotuses.y = 780;
		this._animationContainer.addChild(this._lotuses);
	}

	private addedBoat():void {
		this._boat = Sprite.from("boat");
		this._boat.anchor.x = .5;
		this._boat.anchor.y = .75;
		this._boat.x = 1455;
		this._boat.y = 705;
		this._animationContainer.addChild(this._boat);
	}

	private addedClouds(cloudsX:number):void {
		this._colorMatrix = new PIXI.filters.ColorMatrixFilter();
		this._clouds = Sprite.from("clouds");
		this._clouds.height /= 1.5;
		this._clouds.alpha = .3;
		this._clouds.x = cloudsX
		this._cloudsArray.push(this._clouds)
		this._animationContainer.addChild(this._clouds);
	}

	private ticker():void {
		this._iterator ++
		this._displacementSprite.x += 3;

		this._lotuses.y += Math.cos(this._iterator/20)/10;
		this._boat.rotation += Math.cos(this._iterator/50)/800;

		for (let iterator:number = 0; iterator < this._cloudsArray.length; iterator ++) {
			let clouds: Sprite = this._cloudsArray[iterator];
			clouds.x -= .25;

			if (this._clouds.x + this._clouds.width <= Main_Container.WINDOW_WIDTH) {
				this.addedClouds(this._clouds.x + this._clouds.width);
			}
			if (this._clouds.x + this._clouds.width <= 0) {
			this.removeChild(this._clouds);
			}

			this._animationContainer.filters = [this._noiseFilter];
			this._noiseFilter.noise = (Math.cos(this._iterator/100))/10;

			clouds.filters = [this._colorMatrix];
			this._colorMatrix.contrast((Math.cos(this._iterator/100))-1.5, false);
		}
	}
}
