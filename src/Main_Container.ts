import Container = PIXI.Container;
import { Sprite } from "pixi.js";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = 1920;
	public static readonly WINDOW_HEIGHT:number = 885;
	private _background:PIXI.Sprite;

	constructor() {
		super();
		this.pictureLoader();
	}

	private pictureLoader():void {
		const loader:PIXI.Loader = new PIXI.Loader();
		loader
			.add("background", "background.jpg")			//0
		loader.load((loader, resources)=> {
			this.startProject();
		});
	}

	private startProject():void {
		this._background = Sprite.from("background");
		this.addChild(this._background);
	}
}
