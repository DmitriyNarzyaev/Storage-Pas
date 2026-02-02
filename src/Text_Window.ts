import Container = PIXI.Container;
import {TextStyle} from "pixi.js";

export default class Text_Window extends Container {

    constructor(textContent:string, color:number, maskWidth:number) {
        super();

        let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'times new roman',
            fontSize: 20,
            fill: [color],
            align: 'left'
        });

        let contentText:PIXI.Text = new PIXI.Text (textContent, textStyle);

        let textMask:PIXI.Graphics = new PIXI.Graphics
        textMask.beginFill(0x000000)
        textMask.drawRect(0, 0, maskWidth, 100)
        this.addChild(textMask);
        contentText.mask = textMask;

        this.addChild(contentText);
    }
}
