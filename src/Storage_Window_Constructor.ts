import Container = PIXI.Container;
import Text_Window from "./Text_Window";

export default class Storage_Window_Constructor extends Container {

    constructor(WindowCreatorWidth:number, WindowCreatorHeight:number) {
        super();
        let textForWindow:string = "Type:\n\n\n\nUrl\n\n\n\nLogin\n\n\n\nPassword\n\n\n\nDescription";
        let gap:number = 20;

        let storageWindow:PIXI.Graphics = new PIXI.Graphics;
        storageWindow
            .beginFill(0xddd6df)
            .lineStyle(2, 0x997a8d, 1, 0)
            .drawRect(0, 0, WindowCreatorWidth, WindowCreatorHeight);
        this.addChild(storageWindow);

        let textForStorageWindow:Text_Window = new Text_Window(textForWindow, 0x000000, 0);
        textForStorageWindow.x = gap;
        textForStorageWindow.y = gap;
        this.addChild(textForStorageWindow);
    }
}
