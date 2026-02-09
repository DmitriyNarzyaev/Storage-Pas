import Container = PIXI.Container;
import Text_Window from "./Text_Window";
import Global from "./Global";

export default class Start_Menu extends Container {
    private _TextWindow:Text_Window;
    private _TextForStartMenu:string = "Password Storage\n\n\nPassword Storage не хранит в себе базы данных и никуда "+
        "их не передаёт.\nФайлы базы данных хранится у пользователя.\n\nПри заполнении поля конструктора " +
        "нажать клавишу Enter";

    constructor() {
        super();
        this.createBackground();
        this.createTextForStartMenu();
    }

    private createBackground():void {
        let background:PIXI.Graphics = new PIXI.Graphics;
        background
            .beginFill(0xddd6df)
            .drawRect(0, 0, Global.WINDOW_WIDTH, Global.WINDOW_HEIGHT);
        this.addChild(background);
    }

    private createTextForStartMenu():void {
        this._TextWindow = new Text_Window(this._TextForStartMenu, 0x492a3d, 0);
        this._TextWindow.x = (Global.WINDOW_WIDTH - this._TextWindow.width) / 2;
        this._TextWindow.y = (Global.WINDOW_HEIGHT - this._TextWindow.height) / 3;
        this.addChild(this._TextWindow);
    }
}
