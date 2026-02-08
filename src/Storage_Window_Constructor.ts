import Container = PIXI.Container;
import Text_Window from "./Text_Window";
// @ts-ignore
import TextInput from "../node_modules/pixi-text-input/text-input";
import Button from "./Button";
import Main_Container from "./Main_Container";

export default class Storage_Window_Constructor extends Container {
    private _dataForTypeRow:string = "type"
    private _dataForURLRow:string = "url"
    private _dataForLoginRow:string = "login"
    private _dataForPasswordRow:string = "password"
    private _dataForDescriptionRow:string = "description"
    private _databaseSection:string = " "

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

        this.textInputWindow(20, 55, this._dataForTypeRow);
        this.textInputWindow(20, 140, this._dataForURLRow);
        this.textInputWindow(20, 225, this._dataForLoginRow);
        this.textInputWindow(20, 310, this._dataForPasswordRow);
        this.textInputWindow(20, 395, this._dataForDescriptionRow);

        this.createDatabaseButton();
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

        let replacementText:string = "";

        input.on('keydown', (keycode: number) => {
            replacementText = input.text
            if (keycode == 13 && data == this._dataForTypeRow) {
                this._dataForTypeRow = replacementText
                console.log(this._dataForTypeRow);
            } else if(keycode == 13 && data == this._dataForURLRow) {
                this._dataForURLRow = replacementText
                console.log(this._dataForURLRow);
            }else if(keycode == 13 && data == this._dataForLoginRow) {
                this._dataForLoginRow = replacementText
                console.log(this._dataForLoginRow);
            }else if(keycode == 13 && data == this._dataForPasswordRow) {
                this._dataForPasswordRow = replacementText
                console.log(this._dataForPasswordRow);
            }else if(keycode == 13 && data == this._dataForDescriptionRow) {
                this._dataForDescriptionRow = replacementText
                console.log(this._dataForDescriptionRow);
            }
        });
    }

    private createDatabaseButton():void {
        let buttonX:number = 120;
        let buttonY:number = 450;
        let startButton:Button = new Button(
            "Create",
            () => {this.createDatabaseSection();},
            80,
            30);
        startButton.x = buttonX;
        startButton.y = buttonY;
        this.addChild(startButton);
    }

    private createDatabaseSection():void {
        this._databaseSection =
            '"type":"' + this._dataForTypeRow + '",\n' +
            '"url":"' + this._dataForURLRow + '",\n' +
            '"login":"' + this._dataForLoginRow + '",\n' +
            '"password":"' + this._dataForPasswordRow + '",\n' +
            '"description":"' + this._dataForDescriptionRow + '",'
        console.log(this._databaseSection);
    }
}
