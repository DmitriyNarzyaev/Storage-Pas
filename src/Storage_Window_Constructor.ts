import Container = PIXI.Container;
import Text_Window from "./Text_Window";
// @ts-ignore
import TextInput from "../node_modules/pixi-text-input/text-input";

export default class Storage_Window_Constructor extends Container {

    constructor(WindowCreatorWidth:number, WindowCreatorHeight:number) {
        super();
        let textForWindow:string = "Type:\n\n\n\nUrl\n\n\n\nLogin\n\n\n\nPassword\n\n\n\nDescription";
        let gap:number = 20;

        let storageWindow:PIXI.Graphics = new PIXI.Graphics;
        storageWindow
            .beginFill(0xddd6df)
            .lineStyle(2, 0x997a8d)
            .drawRect(0, 0, WindowCreatorWidth, WindowCreatorHeight);
        this.addChild(storageWindow);

        let textForStorageWindow:Text_Window = new Text_Window(textForWindow, 0x000000, 0);
        textForStorageWindow.x = gap;
        textForStorageWindow.y = gap;
        this.addChild(textForStorageWindow);

        let dataForTypeRow:string = ""
        let dataForURLRow:string = ""
        let dataForLoginRow:string = ""
        let dataForPasswordRow:string = ""
        let dataForDescriptionRow:string = ""

        this.textInputWindow(20, 55, dataForTypeRow);
        this.textInputWindow(20, 140, dataForURLRow);
        this.textInputWindow(20, 225, dataForLoginRow);
        this.textInputWindow(20, 310, dataForPasswordRow);
        this.textInputWindow(20, 395, dataForDescriptionRow);
    }

    private textInputWindow(windowX:number, windowY:number, data:string):void {
        let input = new TextInput({
            input: {
                fontSize: '14pt',
                padding: '7px',
                width: '265px',
                color: '#000000',
            },
            box: {
                default: {fill: 0xE8E9F3, rounded: 5, stroke: {color: 0x997a8d, width: 2}},
                focused: {fill: 0xE1E3EE, rounded: 5, stroke: {color: 0xb9aabd, width: 2}},
                disabled: {fill: 0xDBDBDB, rounded: 5}
            }
        });
        input.x = windowX;
        input.y = windowY;
        this.addChild(input);

        input.on('keydown', (keycode: number) => {
            if (keycode == 13) {
                data += input.text
                console.log(data);
            }
        })
    }
}
