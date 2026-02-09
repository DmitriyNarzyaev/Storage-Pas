import { TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Button extends Container {
    private readonly _callback:()=>void;

    constructor(buttonName:string, callback:()=>void = null, buttonWidth:number, buttonHeight:number) {
        super();
        this._callback = callback;
        this.initialButton(buttonName, callback, buttonWidth, buttonHeight);
    }

    private initialButton(buttonName:string, callback:any, buttonWidth:number, buttonHeight:number):void {
        const button:PIXI.Graphics = new PIXI.Graphics;
        button.buttonMode = true;
        button.interactive = true;
        button
            .beginFill(0xbdb6bf)
            .lineStyle(1, 0x997a8d)
            .drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(button);

        let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'times new roman',
            fontSize: 18,
            fill: ['#000000'],
        });

        const buttonText:PIXI.Text = new PIXI.Text (buttonName, textStyle);
        buttonText.x = (button.width - buttonText.width)/2 - 1;
        if (buttonHeight <= 20) {
            buttonText.y = (button.height - buttonText.height)/2 - 2;
        } else {
            buttonText.y = (button.height - buttonText.height)/2;
        }

        button.addChild(buttonText);

        if (callback) {
            button.addListener('pointertap', this.pointerTabHandler, this);
        }
    }

    private pointerTabHandler():void {
        this._callback();
    }
}
