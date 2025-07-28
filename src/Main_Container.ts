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
	private _displacementSprite:PIXI.Sprite;

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
			.add("displacement", "displacement.jpg");
		loader.load((loader, resources)=> {
			this.startProject();

		});
	}

	private startProject():void {
		this.addedBackground();
		this.addedWater();
		this.addedLotuses();
		this.addedBoat();
		Main.pixiApp.ticker.add(this.ticker, this);
	}

	private addedBackground():void {
		this._background = Sprite.from("background");
		this.addChild(this._background);
	}

	private addedWater():void {
		this._water = Sprite.from("water");
		this.addChild(this._water);
		this._water.y = this._background.height - this._water.height;

		this._displacementSprite = PIXI.Sprite.from("displacement.jpg");
		let displacementFilter = new PIXI.filters.DisplacementFilter(this._displacementSprite);
		this._displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
		this.addChild(this._displacementSprite);
		this._displacementSprite.alpha = .01;
		this._water.filters = [displacementFilter];
    	this._displacementSprite.scale.x = 4;
    	this._displacementSprite.scale.y = 3;
	}

	private addedLotuses():void {
		this._lotuses = Sprite.from("lotuses");
		this._lotuses.x = 230;
		this._lotuses.y = 780;
		this.addChild(this._lotuses);
	}

	private addedBoat():void {
		this._boat = Sprite.from("boat");
		this._boat.x = 1390;
		this._boat.y = 580;
		this.addChild(this._boat);
	}

	private ticker():void {
	this._displacementSprite.x += 10;
    this._displacementSprite.y += 6;
	}
}
