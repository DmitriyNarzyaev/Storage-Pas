import Container = PIXI.Container;
import Text_Window from "./Text_Window";

export default class PopUp_Window extends Container {

    private readonly _windowWidth:number;
    private readonly _windowHeight:number;
    private readonly _windowText:string;
    private readonly _gap:number = 3;

    constructor(windowWidth:number, windowHeight:number, windowText:string) {
        super();

        this._windowWidth = windowWidth;
        this._windowHeight = windowHeight;
        this._windowText = windowText;

        this.createBackground();
        this.createText();
    }

    private createBackground():void {
        let windowBackground:PIXI.Graphics = new PIXI.Graphics;
        windowBackground.beginFill(0xffd0d0);
        windowBackground
            .lineStyle(1, 0x997a8d)
            .drawRect(0, 0, this._windowWidth, this._windowHeight);
        this.addChild(windowBackground);
    }

    private createText():void {
        let windowText = new Text_Window(
            this._windowText,
            0x492a3d,
            0,
            this._windowWidth - this._gap);
        windowText.x = this._gap;
        this.addChild(windowText);
    }
}
