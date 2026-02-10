import Container = PIXI.Container;
import Text_Window from "./Text_Window";
// @ts-ignore
import TextInput from "../node_modules/pixi-text-input/text-input";
import Button from "./Button";

export default class Storage_Window_Constructor extends Container {
    private _dataForTypeRow:string = "type"
    private _dataForURLRow:string = "url"
    private _dataForLoginRow:string = "login"
    private _dataForPasswordRow:string = "password"
    private _dataForDescriptionRow:string = "description"
    private _markerIterator:number = 1;
    private _dataFinishedMarker1:PIXI.Graphics;
    private _dataFinishedMarker2:PIXI.Graphics;
    private _dataFinishedMarker3:PIXI.Graphics;
    private _dataFinishedMarker4:PIXI.Graphics;
    private _dataFinishedMarker5:PIXI.Graphics;
    private readonly _level:ILevel;

    constructor(WindowCreatorWidth:number, WindowCreatorHeight:number, level:ILevel) {
        super();

        let windowWidth;
        let windowHeight;

        WindowCreatorWidth <= 500 ? windowWidth = 500 : windowWidth = WindowCreatorWidth;
        WindowCreatorHeight <= 500 ? windowHeight = 500 : windowHeight = WindowCreatorHeight;



        this._level = level;
        let textForWindow:string = "Type:\n\n\n\nUrl\n\n\n\nLogin\n\n\n\nPassword\n\n\n\nDescription";
        let gap:number = 20;

        let storageWindow:PIXI.Graphics = new PIXI.Graphics;
        storageWindow
            .beginFill(0xddd6df)
            .lineStyle(2, 0x997a8d)
            .drawRect(0, 0, windowWidth, windowHeight);
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
        let replacementText:string = "";
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
            replacementText = input.text
            if (keycode == 13 && data == this._dataForTypeRow) {
                this._dataForTypeRow = replacementText
                this._dataFinishedMarker1.tint = 0x00ff00;
            } else if(keycode == 13 && data == this._dataForURLRow) {
                this._dataForURLRow = replacementText
                this._dataFinishedMarker2.tint = 0x00ff00;
            }else if(keycode == 13 && data == this._dataForLoginRow) {
                this._dataForLoginRow = replacementText
                this._dataFinishedMarker3.tint = 0x00ff00;
            }else if(keycode == 13 && data == this._dataForPasswordRow) {
                this._dataForPasswordRow = replacementText
                this._dataFinishedMarker4.tint = 0x00ff00;
            }else if(keycode == 13 && data == this._dataForDescriptionRow) {
                this._dataForDescriptionRow = replacementText
                this._dataFinishedMarker5.tint = 0x00ff00;
            }
        });

        let markerRadius:number = 10;
        let markerPosX:number = input.x + input.width + markerRadius * 2;
        let markerPosY:number = input.y + input.height/2;
        this.createFinishedFillingMarker(markerPosX, markerPosY, markerRadius);
    }

    private createFinishedFillingMarker(positionX:number, positionY:number, markerRadius:number):void {
        let marker:PIXI.Graphics;

        marker = new PIXI.Graphics;
        marker
            .beginFill(0xddd6df)
            .lineStyle(2, 0x997a8d)
            .drawCircle(0, 0, markerRadius)
        marker.x = positionX;
        marker.y = positionY;
        this.addChild(marker);
        marker.tint = 0xdddddd;

        if (this._markerIterator == 1) {
            this._dataFinishedMarker1 = marker;
        } else if (this._markerIterator == 2) {
            this._dataFinishedMarker2 = marker;
        }else if (this._markerIterator == 3) {
            this._dataFinishedMarker3 = marker;
        }else if (this._markerIterator == 4) {
            this._dataFinishedMarker4 = marker;
        }else if (this._markerIterator == 5) {
            this._dataFinishedMarker5 = marker;
        }
        this._markerIterator ++;
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
        let newObj:IBlock = (
            {
                type:this._dataForTypeRow,
                url:this._dataForURLRow,
                login:this._dataForLoginRow,
                password:this._dataForPasswordRow,
                description:this._dataForDescriptionRow
            }
        );

        this._level.items.push(newObj);
        JSON.stringify(this._level)
        let res = JSON.stringify(this._level);

        let blob = new Blob([res], {type: "json"});
        let link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "base.json");
        link.click();

        console.log(res);
    }
}
