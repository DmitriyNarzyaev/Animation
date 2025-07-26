var Container = PIXI.Container;
export default class Score_Menu extends Container {
    constructor(score) {
        super();
        this._scoreMenuWidth = 80;
        this._scoreMenuHeight = 20;
        this.initialBackground();
        this.textForScoreMenu(score);
    }
    initialBackground() {
        const menu = new PIXI.Graphics;
        menu
            .beginFill(0x888833, .8)
            .drawRoundedRect(0, 0, this._scoreMenuWidth, this._scoreMenuHeight, 5);
        this.addChild(menu);
    }
    textForScoreMenu(score) {
        let textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'bold',
            fill: ['#503000'],
        });
        const menuText = new PIXI.Text("Keys: " + score, textStyle);
        menuText.x = this._scoreMenuWidth / 2 - menuText.width / 2;
        this.addChild(menuText);
    }
}
//# sourceMappingURL=Score_Menu.js.map