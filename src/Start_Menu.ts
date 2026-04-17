import Container = PIXI.Container;
import Text_Window from "./Text_Window";
import Global from "./Global";
import Button from "./Button";
import PopUp_Window from "./PopUp_Window";

export default class Start_Menu extends Container {
    private _TextWindow:Text_Window;
    private _popUpContainer:PIXI.Container;

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
        if (this._popUpContainer) {
            this.removeChild(this._popUpContainer);
            this._popUpContainer = null
        } else {
            let aboutWindowWidth:number = 250;
            let aboutWindowHeight:number = 150;
            this._popUpContainer = new PIXI.Container;
            this.addChild(this._popUpContainer);
            let textAboutProgram:string =" Password Storage находится в процессе разработки." +
            "\n При работе с конструктором, нажимать кнопку Enter после заполнения каждого поля.";

            let dropPanelPositionX:number = gapX - aboutWindowWidth;
            let dropPanelPositionY:number = gapY;
            let popUpWindow:PopUp_Window = new PopUp_Window(aboutWindowWidth, aboutWindowHeight, textAboutProgram);
            popUpWindow.x = dropPanelPositionX;
            popUpWindow.y = dropPanelPositionY;
            this._popUpContainer.addChild(popUpWindow);
        }
    }
}
