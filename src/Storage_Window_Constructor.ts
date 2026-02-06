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

        this.textInputWindow(20, 55);
        this.textInputWindow(20, 140);
        this.textInputWindow(20, 225);
        this.textInputWindow(20, 310);
        this.textInputWindow(20, 395);
    }

    private textInputWindow(windowX:number, windowY:number):void {

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

    	let inputText:string = "";
    	input.on('keydown', (keycode: number) => {
    		if (String.fromCharCode(keycode) === String.fromCharCode(keycode).toUpperCase()) {
    			inputText += String.fromCharCode((96 <= keycode && keycode <= 105) ? keycode-48 : keycode)
    		} else {
    			inputText += String.fromCharCode((96 <= keycode && keycode <= 105) ? keycode-48 : keycode).toLowerCase();
    		}

    		if (keycode == 13) {
    			console.log(inputText);
    		}
    	})
    }
}
