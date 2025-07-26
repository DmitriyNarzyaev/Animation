import { Sprite } from "pixi.js";
var Container = PIXI.Container;
export default class Player extends Container {
    constructor() {
        super();
        this.playerSpeed = 2.5;
        this.playerDiagSpeed = 1.75;
        this._playerCarWidth = 40;
        this._playerCarHeight = 40;
        this.initialPlayer();
    }
    initialPlayer() {
        this.playerCar = Sprite.from("car");
        this.playerCar.x -= this.playerCar.width / 2;
        this.playerCar.y -= this.playerCar.height / 2;
        this.playerCar.width = this._playerCarWidth;
        this.playerCar.height = this._playerCarHeight;
        this.addChild(this.playerCar);
    }
}
//# sourceMappingURL=Player.js.map