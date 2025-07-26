import Container = PIXI.Container;
import { Sprite } from "pixi.js";
import { Main } from "./Main";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = 1920;
	public static readonly WINDOW_HEIGHT:number = 885;
	private _background:PIXI.Sprite;
	private _displacementSprite:PIXI.Sprite;

	constructor() {
		super();
		this.pictureLoader();
	}

	private pictureLoader():void {
		const loader:PIXI.Loader = new PIXI.Loader();
		loader
			.add("background", "background.jpg")
			.add("displacement", "displacement.jpg");
		loader.load((loader, resources)=> {
			this.startProject();

		});
	}

	private startProject():void {
		this._background = Sprite.from("background");
		this.addChild(this._background);

		this._displacementSprite = PIXI.Sprite.from("displacement.jpg");
		let displacementFilter = new PIXI.filters.DisplacementFilter(this._displacementSprite);
		this._displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
		this.addChild(this._displacementSprite);
		Main.pixiApp.stage.filters = [displacementFilter];
    	Main.pixiApp.renderer.view.style.transform = 'scale(1.02)';
    	this._displacementSprite.scale.x = 4;
    	this._displacementSprite.scale.y = 3;
		this._background.filters = [new PIXI.filters.BlurFilter()]

		Main.pixiApp.ticker.add(this.ticker, this);
	}

	private ticker():void {
	this._displacementSprite.x += 10;
    this._displacementSprite.y += 6;
	}
}
