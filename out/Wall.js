import { Sprite } from "pixi.js";
var Container = PIXI.Container;
import Main_Container from "./Main_Container";
export default class Wall extends Container {
    constructor(level) {
        super();
        this._level = level;
        this.stageLoader();
    }
    stageLoader() {
        for (let iterator = 0; iterator < this._level.walls.length; iterator++) {
            let blockX = this._level.walls[iterator].width * this._level.walls[iterator].x;
            let blockY = this._level.walls[iterator].height * this._level.walls[iterator].y;
            this._wall = Sprite.from("wall");
            this.addChild(this._wall);
            this._wall.x = blockX;
            this._wall.y = blockY;
            Main_Container.wallArray.push(this._wall);
        }
    }
}
//# sourceMappingURL=Wall.js.map