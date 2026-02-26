import Container = PIXI.Container;
import Text_Window from "./Text_Window";
import Global from "./Global";
import Button from "./Button";

export default class Start_Menu extends Container {
    private _TextWindow:Text_Window;
    private _questionTextContainer:PIXI.Container;

    constructor(textForStartMenu:string) {
        super();
        this.createBackground();
        this.createTextForStartMenu(textForStartMenu);
        this.createButtonAboutProgram();
    }

    private createBackground():void {
        let background:PIXI.Graphics = new PIXI.Graphics;
        background
            .beginFill(0xddd6df)
            .drawRect(0, 0, Global.WINDOW_WIDTH, Global.WINDOW_HEIGHT);
        this.addChild(background);
    }

    private createTextForStartMenu(textForStartMenu:string):void {
        this._TextWindow = new Text_Window(textForStartMenu, 0x492a3d, 0, Global.WINDOW_WIDTH);
        this._TextWindow.x = (Global.WINDOW_WIDTH - this._TextWindow.width) / 2;
        this._TextWindow.y = (Global.WINDOW_HEIGHT - this._TextWindow.height) / 3;
        this.addChild(this._TextWindow);
    }

    private createButtonAboutProgram():void {
        let questionMarkButtonSize:number = 25;
        let buttonX:number = Global.WINDOW_WIDTH - questionMarkButtonSize * 2;
        let buttonY:number = questionMarkButtonSize * 2;
        let gapX:number = buttonX;
        let gapY:number = buttonY + questionMarkButtonSize;
        let questionMarkButton:Button;
        questionMarkButton = new Button(
            "?",
            () => {this.createTextAboutProgram(gapX, gapY);},
            questionMarkButtonSize,
            questionMarkButtonSize);
        questionMarkButton.x = buttonX;
        questionMarkButton.y = buttonY;
        this.addChild(questionMarkButton);
    }

    private createTextAboutProgram(gapX:number, gapY:number):void {
        if (this._questionTextContainer) {
            this.removeChild(this._questionTextContainer);
            this._questionTextContainer = null
        } else {
            let backgroundWidth:number = 250;
            let backgroundHeight:number = 150;
            this._questionTextContainer = new PIXI.Container;
            this.addChild(this._questionTextContainer);
            let textAboutProgram:string =" Password Storage находится в процессе разработки." +
            "\n При работе с конструктором, нажимать кнопку Enter после заполнения каждого поля.";

            let dropPanelPositionX:number = gapX - backgroundWidth;
            let dropPanelPositionY:number = gapY;
            let background:PIXI.Graphics = new PIXI.Graphics;
            background.beginFill(0xbdb6bf);
            background
                .lineStyle(1, 0x997a8d)
                .drawRect(0, 0, backgroundWidth, backgroundHeight);
            background.x = dropPanelPositionX;
            background.y = dropPanelPositionY;
            this._questionTextContainer.addChild(background);

            let textAbout = new Text_Window(textAboutProgram, 0x492a3d, 0, backgroundWidth);
            textAbout.x = dropPanelPositionX;
            textAbout.y = dropPanelPositionY;
            this._questionTextContainer.addChild(textAbout);
        }
    }
}
