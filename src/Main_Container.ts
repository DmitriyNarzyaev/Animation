import Container = PIXI.Container;
import { Sprite } from "pixi.js";
import { Main } from "./Main";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = 1920;
	public static readonly WINDOW_HEIGHT:number = 885;
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
	private _boatContainer:PIXI.Container;
	private _cloudsArray:Sprite[] = [];

	constructor() {
		super();
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
		loader.load((loader, resources)=> {
			this.startProject();

		});
	}

	private startProject():void {
		this.addedBackground();
		this.addedDisplacementFilter();
		this.addedLotuses();
		this.addedBoat();
		this.addedClouds(0);
		Main.pixiApp.ticker.add(this.ticker, this);
	}

	private addedBackground():void {
		this._background = Sprite.from("background");
		this.addChild(this._background);
	}

	private addedDisplacementFilter():void {
		this._displacementSprite = PIXI.Sprite.from("displacement.jpg");
		let displacementFilter = new PIXI.filters.DisplacementFilter(this._displacementSprite);
		this._displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
		this.addChild(this._displacementSprite);
		this._displacementSprite.alpha = .01;
    	this._displacementSprite.scale.x = 4;
    	this._displacementSprite.scale.y = 3;

		this.addedWater(displacementFilter);
		this.addedJapaneseWoman(displacementFilter);
	}

	private addedWater(filter:PIXI.filters.DisplacementFilter):void {
		this._water = Sprite.from("water");
		this.addChild(this._water);
		this._water.y = this._background.height - this._water.height;
		this._water.filters = [filter];
	}

	private addedJapaneseWoman(filter:PIXI.filters.DisplacementFilter):void{
		this._body = Sprite.from("body");
		this._body.x = 895;
		this._body.y = this._background.height - this._body.height
		this._body.filters = [filter];
		this.addChild(this._body);

		this._umbrella = Sprite.from("umbrella");
		this._umbrella.x = 880;
		this._umbrella.y = this._background.height - 215;
		this.addChild(this._umbrella);

		this._wall = Sprite.from("wall");
		this._wall.x = 934;
		this._wall.y = this._background.height - this._wall.height;
		this.addChild(this._wall);
	}

	private addedLotuses():void {
		this._lotuses = Sprite.from("lotuses");
		this._lotuses.x = 230;
		this._lotuses.y = 780;
		this.addChild(this._lotuses);
	}

	private addedBoat():void {
		this._boatContainer = new PIXI.Container;
		this.addChild(this._boatContainer);
		this._boatContainer.x = 1460;
		this._boatContainer.y = 690;

		this._boat = Sprite.from("boat");
		this._boat.x -= this._boat.width/2;
		this._boat.y -= this._boat.height/1.5;
		this._boatContainer.addChild(this._boat);
	}

	private addedClouds(cloudsX:number):void {
		this._clouds = Sprite.from("clouds");
		this._clouds.height /= 1.5;
		this._clouds.alpha = .3;
		this._cloudsArray.push(this._clouds)
		this._clouds.x = cloudsX
		this.addChild(this._clouds);
	}

	private ticker():void {
		this._iterator ++
		this._displacementSprite.x += 3;

		this._lotuses.y += Math.cos(this._iterator/20)/10;
		this._boatContainer.rotation += Math.cos(this._iterator/50)/800;

		for (let iterator:number = 0; iterator < this._cloudsArray.length; iterator ++) {
			let clouds: Sprite = this._cloudsArray[iterator];
			clouds.x -= .25;

			if (this._clouds.x + this._clouds.width <= Main_Container.WINDOW_WIDTH) {
				this.addedClouds(this._clouds.x + this._clouds.width);
			}
			if (this._clouds.x + this._clouds.width <= 0) {
			this.removeChild(this._clouds);
			}
		}
	}
}
