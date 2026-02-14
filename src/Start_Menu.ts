import Container = PIXI.Container;
import Text_Window from "./Text_Window";
import Global from "./Global";

export default class Start_Menu extends Container {
    private _TextWindow:Text_Window;

    constructor(textForStartMenu:string) {
        super();
        this.createBackground();
        this.createTextForStartMenu(textForStartMenu);
    }

    private createBackground():void {
        let background:PIXI.Graphics = new PIXI.Graphics;
        background
            .beginFill(0xddd6df)
            .drawRect(0, 0, Global.WINDOW_WIDTH, Global.WINDOW_HEIGHT);
        this.addChild(background);
    }

    private createTextForStartMenu(textForStartMenu:string):void {
        this._TextWindow = new Text_Window(textForStartMenu, 0x492a3d, 0, false);
        this._TextWindow.x = (Global.WINDOW_WIDTH - this._TextWindow.width) / 2;
        this._TextWindow.y = (Global.WINDOW_HEIGHT - this._TextWindow.height) / 3;
        this.addChild(this._TextWindow);
    }
}
