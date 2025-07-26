var Container = PIXI.Container;
export default class Button extends Container {
    constructor(buttonName, callback = null) {
        super();
        this._buttonWidth = 120;
        this._callback = callback;
        this.initialButton(buttonName, callback);
    }
    initialButton(buttonName, callback) {
        const button = new PIXI.Graphics;
        button.buttonMode = true;
        button.interactive = true;
        button
            .beginFill(0x999922, 1)
            .drawRoundedRect(0, 0, this._buttonWidth, 40, 10);
        this.addChild(button);
        let textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            fill: ['#333333'],
        });
        const buttonText = new PIXI.Text(buttonName, textStyle);
        buttonText.x = (button.width - buttonText.width) / 2;
        buttonText.y = (button.height - buttonText.height) / 2;
        button.addChild(buttonText);
        if (callback) {
            button.addListener('pointertap', this.pointerTabHandler, this);
        }
    }
    pointerTabHandler() {
        this._callback();
    }
}
//# sourceMappingURL=Button.js.map