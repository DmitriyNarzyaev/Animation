import { Sprite } from "pixi.js";
var Container = PIXI.Container;
export default class Exit_Gate extends Container {
    constructor() {
        super();
        this.initialGate();
        this.initialVortex();
    }
    initialGate() {
        this._exitGateSprite = Sprite.from("exitgate");
        this.addChild(this._exitGateSprite);
    }
    initialVortex() {
        this.vortexContainer = new PIXI.Container;
        this.addChild(this.vortexContainer);
        this.exitGateVortex = Sprite.from("vortex");
        this.exitGateVortex.width = 60;
        this.exitGateVortex.height = 60;
        this.exitGateVortex.x -= this.exitGateVortex.width / 2;
        this.exitGateVortex.y -= this.exitGateVortex.height / 2;
        this.exitGateVortex.alpha = 0;
        this.vortexContainer.addChild(this.exitGateVortex);
        this.vortexContainer.x += this._exitGateSprite.width / 2;
        this.vortexContainer.y += this._exitGateSprite.height / 2;
        this.vortexContainer.width = 0;
        this.vortexContainer.height = 0;
    }
}
//# sourceMappingURL=Exit_Gate.js.map