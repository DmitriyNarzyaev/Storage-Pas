import Container = PIXI.Container;
import Main_Container from "./Main_Container";
import Text_Window from "./Text_Window";

export default class Start_Menu extends Container {
    private _TextWindow:Text_Window;
    private _TextForStartMenu:string = "Password Storage\n\n\nPassword Storage не хранит в себе базу данных и никуда"+
        " не передаёт пароли.\nФайл базы данных хранится у пользователя. Ответственность за сохранность я не несу";

    constructor() {
        super();
        this.createBackground();
        this.createTextForStartMenu();
    }

    private createBackground():void {
        let background:PIXI.Graphics = new PIXI.Graphics;
        background
            .beginFill(0xddd6df)
            .drawRect(0, 0, Main_Container.WINDOW_WIDTH, Main_Container.WINDOW_HEIGHT);
        this.addChild(background);
    }

    private createTextForStartMenu():void {
        this._TextWindow = new Text_Window(this._TextForStartMenu, 0x492a3d, 0);
        this._TextWindow.x = (Main_Container.WINDOW_WIDTH - this._TextWindow.width) / 2;
        this._TextWindow.y = (Main_Container.WINDOW_HEIGHT - this._TextWindow.height) / 3;
        this.addChild(this._TextWindow);
    }
}
