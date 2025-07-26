var Container = PIXI.Container;
import Player from "./Player";
import Global from "./Global";
import Collision_Checking from "./Collision_Checking";
import Start_Menu from "./Start_Menu";
import Button from "./Button";
import Wall from "./Wall";
import Exit_Key from "./Exit_Key";
import Exit_Gate from "./Exit_Gate";
import Score_Menu from "./Score_Menu";
export default class Main_Container extends Container {
    constructor() {
        super();
        this.BUTTON_LEFT = false;
        this.BUTTON_RIGHT = false;
        this.BUTTON_UP = false;
        this.BUTTON_DOWN = false;
        this._keyIterator = 0;
        this._startMenuContainer = new Container;
        this.addChild(this._startMenuContainer);
        this.pictureLoader();
        console.log(Math.floor(40 / 1.65) + " -- 24");
    }
    pictureLoader() {
        const picLoader = new PIXI.Loader();
        picLoader
            .add("title", "title.jpg")
            .add("wall", "wall.png")
            .add("exitkey", "key.png")
            .add("exitgate", "exit.png")
            .add("vortex", "vortex.png")
            .add("car", "gamer.png");
        picLoader.load((loader, resources) => {
            this.jsonLiader();
        });
    }
    jsonLiader() {
        Main_Container.jsonLoader = new XMLHttpRequest();
        Main_Container.jsonLoader.responseType = "json";
        Main_Container.jsonLoader.open("GET", "level1.json", true);
        Main_Container.jsonLoader.onreadystatechange = () => {
            this.initialStartMenu();
        };
        Main_Container.jsonLoader.send();
    }
    initialStartMenu() {
        this._startMenu = new Start_Menu();
        this._startMenu.x = Main_Container.WIDTH / 2 - this._startMenu.width / 2;
        this._startMenuContainer.addChild(this._startMenu);
        this._button = new Button("START", () => { this.startProject(); });
        this._button.x = Main_Container.WIDTH / 2 - this._button.width / 2;
        this._button.y = Main_Container.HEIGHT / 3.5;
        this._startMenuContainer.addChild(this._button);
    }
    startProject() {
        this.removeChild(this._startMenuContainer);
        this.initialBackground();
        this.initialWalls();
        this.initialExitKey();
        this.initialExitGate();
        this.initialPlayer();
        this.initialScoreMenu("0");
        window.addEventListener("keydown", (e) => {
            this.keyDownHandler(e);
        });
        window.addEventListener("keyup", (e) => {
            this.keyUpHandler(e);
        });
        Global.PIXI_APP.ticker.add(this.ticker, this);
    }
    removeLevel() {
        this.removeChild(this._background);
        this.removeChild(this._wall);
        for (let iterator = 0; iterator < Main_Container.wallArray.length; iterator++) {
            let wall = Main_Container.wallArray[iterator];
            this._wall = null;
        }
        ;
    }
    initialBackground() {
        this._background = new PIXI.Graphics;
        this._background
            .beginFill(0x384428)
            .drawRect(0, 0, Main_Container.WIDTH, Main_Container.HEIGHT);
        this.addChild(this._background);
    }
    initialWalls() {
        this._wall = new Wall(Main_Container.jsonLoader.response);
        this.addChild(this._wall);
    }
    initialExitKey() {
        this._key = new Exit_Key();
        this.addChild(this._key);
    }
    initialExitGate() {
        this._exitGate = new Exit_Gate;
        this._exitGate.x = 1100;
        this._exitGate.y = 570;
        this.addChild(this._exitGate);
    }
    initialPlayer() {
        let startPositionX = 120;
        let startPositionY = 700;
        this._player = new Player;
        this._player.x = startPositionX;
        this._player.y = startPositionY;
        this.addChild(this._player);
    }
    initialScoreMenu(score) {
        this._scoreMenu = new Score_Menu(score);
        this._scoreMenu.x = Main_Container.WIDTH - this._scoreMenu.width - 45;
        this._scoreMenu.y = 45;
        this.addChild(this._scoreMenu);
    }
    keyDownHandler(e) {
        if (e.code == "ArrowLeft") {
            this.BUTTON_LEFT = true;
        }
        if (e.code == "ArrowRight") {
            this.BUTTON_RIGHT = true;
        }
        if (e.code == "ArrowUp") {
            this.BUTTON_UP = true;
        }
        if (e.code == "ArrowDown") {
            this.BUTTON_DOWN = true;
        }
    }
    keyUpHandler(e) {
        if (e.code == "ArrowLeft") {
            this.BUTTON_LEFT = false;
        }
        if (e.code == "ArrowRight") {
            this.BUTTON_RIGHT = false;
        }
        if (e.code == "ArrowUp") {
            this.BUTTON_UP = false;
        }
        if (e.code == "ArrowDown") {
            this.BUTTON_DOWN = false;
        }
        this._player.playerSpeed = 2.5;
        this._player.playerDiagSpeed = 1.75;
    }
    ticker() {
        this.keyCollision();
        if (this.BUTTON_LEFT == true && this.BUTTON_UP == false && this.BUTTON_RIGHT == false && this.BUTTON_DOWN == false) {
            this._player.rotation = Math.PI * 1.5;
            this.leftMove(false);
        }
        else if (this.BUTTON_UP == true && this.BUTTON_RIGHT == false && this.BUTTON_DOWN == false && this.BUTTON_LEFT == false) {
            this._player.rotation = 0;
            this.upMove(false);
        }
        else if (this.BUTTON_RIGHT == true && this.BUTTON_DOWN == false && this.BUTTON_LEFT == false && this.BUTTON_UP == false) {
            this._player.rotation = Math.PI / 2;
            this.rightMove(false);
        }
        else if (this.BUTTON_DOWN == true && this.BUTTON_LEFT == false && this.BUTTON_UP == false && this.BUTTON_RIGHT == false) {
            this._player.rotation = Math.PI;
            this.downMove(false);
        }
        if (this.BUTTON_LEFT == true && this.BUTTON_UP == true && this.BUTTON_RIGHT == false && this.BUTTON_DOWN == false) {
            this._player.rotation = (Math.PI * 7) / 4;
            this.upMove(true);
            this.leftMove(true);
        }
        if (this.BUTTON_UP == true && this.BUTTON_RIGHT == true && this.BUTTON_DOWN == false && this.BUTTON_LEFT == false) {
            this._player.rotation = Math.PI / 4;
            this.upMove(true);
            this.rightMove(true);
        }
        if (this.BUTTON_DOWN == true && this.BUTTON_LEFT == true && this.BUTTON_UP == false && this.BUTTON_RIGHT == false) {
            this._player.rotation = (Math.PI * 5) / 4;
            this.downMove(true);
            this.leftMove(true);
        }
        if (this.BUTTON_RIGHT == true && this.BUTTON_DOWN == true && this.BUTTON_LEFT == false && this.BUTTON_UP == false) {
            this._player.rotation = (Math.PI * 3) / 4;
            this.downMove(true);
            this.rightMove(true);
        }
        // if (this._keyIterator == 3) {
        // 	let gateRotationIterator:number = 0;
        // 	gateRotationIterator += 1;
        // 	this._exitGate.vortexContainer.rotation -= gateRotationIterator/20;
        // 	if (this._exitGate.exitGateVortex.alpha < 1) {
        // 		this._exitGate.exitGateVortex.alpha += .008;
        // 	} 
        // 	else {
        // 		this._exitGate.exitGateVortex.alpha == 1;
        // 	}
        // 	if (this._exitGate.vortexContainer.width < 60) {
        // 		this._exitGate.vortexContainer.width += .5;
        // 		this._exitGate.vortexContainer.height += .5;
        // 	}
        // }
        if (this._keyIterator == 1) {
            this.removeLevel();
        }
    }
    keyCollision() {
        for (let iterator = 0; iterator < Main_Container.keyArray.length; iterator++) {
            let key = Main_Container.keyArray[iterator];
            if (Collision_Checking.horizontal(this._player, key) &&
                Collision_Checking.vertical(this._player, key)) {
                this._keyIterator++;
                this._key.removeChild(key);
                this.removeChild(this._scoreMenu);
                this.initialScoreMenu(this._keyIterator);
            }
        }
    }
    leftMove(diag) {
        let speed;
        let limitX;
        let canMove = true;
        if (diag) {
            speed = this._player.playerDiagSpeed;
        }
        else {
            speed = this._player.playerSpeed;
        }
        for (let iterator = 0; iterator < Main_Container.wallArray.length; iterator++) {
            let wall = Main_Container.wallArray[iterator];
            limitX = wall.x + wall.width + this._player.width / 2;
            if (this._player.x >= limitX &&
                this._player.x - speed < limitX &&
                Collision_Checking.vertical(this._player, wall)) {
                this._player.x = limitX;
                canMove = false;
            }
        }
        ;
        if (canMove) {
            this._player.x -= speed;
        }
    }
    upMove(diag) {
        let speed;
        let limitY;
        let canMove = true;
        if (diag) {
            speed = this._player.playerDiagSpeed;
        }
        else {
            speed = this._player.playerSpeed;
        }
        for (let iterator = 0; iterator < Main_Container.wallArray.length; iterator++) {
            let wall = Main_Container.wallArray[iterator];
            limitY = wall.y + wall.height + this._player.height / 2;
            if (this._player.y >= limitY &&
                this._player.y - speed < limitY &&
                Collision_Checking.horizontal(this._player, wall)) {
                this._player.y = limitY;
                canMove = false;
            }
        }
        ;
        if (canMove) {
            this._player.y -= speed;
        }
    }
    rightMove(diag) {
        let speed;
        let limitX;
        let canMove = true;
        if (diag) {
            speed = this._player.playerDiagSpeed;
        }
        else {
            speed = this._player.playerSpeed;
        }
        for (let iterator = 0; iterator < Main_Container.wallArray.length; iterator++) {
            let wall = Main_Container.wallArray[iterator];
            limitX = wall.x - this._player.width / 2;
            if (this._player.x <= limitX &&
                this._player.x + speed > limitX &&
                Collision_Checking.vertical(this._player, wall)) {
                this._player.x = limitX;
                canMove = false;
            }
        }
        ;
        if (canMove) {
            this._player.x += speed;
        }
    }
    downMove(diag) {
        let speed;
        let limitY;
        let canMove = true;
        if (diag) {
            speed = this._player.playerDiagSpeed;
        }
        else {
            speed = this._player.playerSpeed;
        }
        for (let iterator = 0; iterator < Main_Container.wallArray.length; iterator++) {
            let wall = Main_Container.wallArray[iterator];
            limitY = wall.y - this._player.height / 2;
            if (this._player.y <= limitY &&
                this._player.y + speed > limitY &&
                Collision_Checking.horizontal(this._player, wall)) {
                this._player.y = limitY;
                canMove = false;
            }
        }
        ;
        if (canMove) {
            this._player.y += speed;
        }
    }
}
Main_Container.WIDTH = 1280;
Main_Container.HEIGHT = 800;
Main_Container.wallArray = [];
Main_Container.keyArray = [];
//# sourceMappingURL=Main_Container.js.map