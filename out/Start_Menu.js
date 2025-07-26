import { Sprite } from "pixi.js";
var Container = PIXI.Container;
export default class Start_Menu extends Container {
    constructor() {
        super();
        this.initialBackground();
    }
    initialBackground() {
        this._background = Sprite.from("title");
        this.addChild(this._background);
    }
}
//# sourceMappingURL=Start_Menu.js.map