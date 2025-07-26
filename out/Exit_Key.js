import { Sprite } from "pixi.js";
var Container = PIXI.Container;
import Main_Container from "./Main_Container";
export default class Exit_Key extends Container {
    constructor() {
        super();
        this._keyWidth = 15;
        this._keyHeight = 30;
        this.initialKey(45, 485);
        this.initialKey(365, 45);
        this.initialKey(1005, 485);
    }
    initialKey(keyX, keyY) {
        this._exitKey = Sprite.from("exitkey");
        this._exitKey.tint = 0x888888;
        this._exitKey.width = this._keyWidth;
        this._exitKey.height = this._keyHeight;
        this._exitKey.x = keyX;
        this._exitKey.y = keyY;
        this.addChild(this._exitKey);
        Main_Container.keyArray.push(this._exitKey);
    }
}
//# sourceMappingURL=Exit_Key.js.map