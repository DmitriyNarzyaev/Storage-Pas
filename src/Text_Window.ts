import Container = PIXI.Container;
import {TextStyle} from "pixi.js";

export default class Text_Window extends Container {

    constructor(textContent:string) {
        super();

        let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'times new roman',
            fontSize: 20,
            fill: ['#000000'],
            align: 'left'
        });

        const contentText:PIXI.Text = new PIXI.Text (textContent, textStyle);
        contentText.style.wordWrap = true;
        //contentText.style.wordWrapWidth = 300;
        this.addChild(contentText);
    }
}
