import { Point } from "pixi.js";
export default class Collision_Checking {
    static horizontal(obj1, obj2) {
        if (!obj1.parent || !obj2.parent) {
            return false;
        }
        const obj1TopLeftGlobal = obj1.parent.toGlobal(obj1.position);
        const obj2TopLeftGlobal = obj2.parent.toGlobal(obj2.position);
        const obj1BottomRightGlobal = obj1.parent.toGlobal(new Point(obj1.x + obj1.width - 1, obj1.y + obj1.height));
        const obj2BottomRightGlobal = obj2.parent.toGlobal(new Point(obj2.x + obj2.width - 1, obj2.y + obj2.height));
        return !(obj1BottomRightGlobal.x - 24 <= obj2TopLeftGlobal.x ||
            obj1TopLeftGlobal.x - 24 >= obj2BottomRightGlobal.x);
    }
    static vertical(obj1, obj2) {
        if (!obj1.parent || !obj2.parent) {
            return false;
        }
        const obj1TopLeftGlobal = obj1.parent.toGlobal(obj1.position);
        const obj2TopLeftGlobal = obj2.parent.toGlobal(obj2.position);
        const obj1BottomRightGlobal = obj1.parent.toGlobal(new Point(obj1.x + obj1.width, obj1.y + obj1.height - 1));
        const obj2BottomRightGlobal = obj2.parent.toGlobal(new Point(obj2.x + obj2.width, obj2.y + obj2.height - 1));
        return !(obj1BottomRightGlobal.y - 24 <= obj2TopLeftGlobal.y ||
            obj1TopLeftGlobal.y - 24 >= obj2BottomRightGlobal.y);
    }
}
//# sourceMappingURL=Collision_Checking.js.map