import Container = PIXI.Container;
import "pixi.js";
//import "pixi-text-input"
//import TextInput from "../node_modules/pixi-text-input";
import Storage_Window from "./Storage_Window";
import Text_Window from "./Text_Window";
import Button from "./Button";
import Storage_Window_Constructor from "./Storage_Window_Constructor";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = window.innerWidth;
	public static readonly WINDOW_HEIGHT:number = window.innerHeight;
	public static JSON_LOADER:XMLHttpRequest;
	private _level:ILevel;
	private _storageWindowsContainer:PIXI.Container;
	private _gap:number = 10;

	constructor() {
		super();
		this.jsonLoader();
	}

	private jsonLoader():void {
		Main_Container.JSON_LOADER = new XMLHttpRequest();
		Main_Container.JSON_LOADER.responseType = "json";
		Main_Container.JSON_LOADER.open("GET", "base.json", true);
		Main_Container.JSON_LOADER.onreadystatechange = () => {
			this.startAll();
		};
		Main_Container.JSON_LOADER.send();
	}

	private startAll():void {
		this._level = Main_Container.JSON_LOADER.response;
		this._storageWindowsContainer = new PIXI.Container;
		this.addChild(this._storageWindowsContainer);
		this.createStorageWindowsGrid();
	}

	private createStorageWindowsGrid():void {
		let storageWindowsX:number = this._gap;
		let storageWindowsY:number = this._gap;
		let storageWindowsWidth:number = 300;
		let storageWindowsHeight:number = 140;
		let backgroundWidth:number;
		let backgroundHeight:number;
		if (this._level != null) {
			for (let iterator:number = 0; iterator < this._level.items.length; iterator++) {
				this.createStorageWindow(storageWindowsX, storageWindowsY, storageWindowsWidth, storageWindowsHeight, iterator);
				storageWindowsX += storageWindowsWidth + this._gap;
				if (storageWindowsX >= Main_Container.WINDOW_WIDTH - storageWindowsWidth) {
					backgroundWidth = storageWindowsX;
					storageWindowsY += storageWindowsHeight + this._gap;
					storageWindowsX = this._gap;
				}
			}

			let newStorageWindow:Storage_Window = new Storage_Window(storageWindowsWidth, storageWindowsHeight);
			newStorageWindow.x = storageWindowsX;
			newStorageWindow.y = storageWindowsY;
			this._storageWindowsContainer.addChild(newStorageWindow);

			let newWindowButton:Button = new Button(
				"CREATE NEW",
				() => {this.createStorageWindowConstructor();},
				storageWindowsWidth-this._gap*4,
				storageWindowsHeight-this._gap*8);
			newStorageWindow.addChild(newWindowButton);
			newWindowButton.x = this._gap*2;
			newWindowButton.y = (storageWindowsHeight - newWindowButton.height) / 2;

			//this.textInputWindow(newStorageWindow.x + this._gap, newStorageWindow.y + this._gap);
		}

		backgroundHeight = storageWindowsY + storageWindowsHeight + this._gap;
		this.createBackground(backgroundWidth, backgroundHeight);
	}

	private createStorageWindowConstructor():void {
		this.removeChild(this._storageWindowsContainer);
		const windowWidth:number = Main_Container.WINDOW_WIDTH*0.9;
		const windowHeight:number = Main_Container.WINDOW_HEIGHT*0.9;
		let newStorageWindowConstructor:Storage_Window_Constructor = new Storage_Window_Constructor(windowWidth, windowHeight);
		newStorageWindowConstructor.x = (Main_Container.WINDOW_WIDTH - windowWidth)/2;
		newStorageWindowConstructor.y = (Main_Container.WINDOW_HEIGHT - windowHeight)/2;
		this.addChild(newStorageWindowConstructor);
	}

	// private textInputWindow(windowX:number, windowY:number):void {
	// 	let input = new TextInput({
	// 		input: {
	// 			fontSize: '14pt',
	// 			padding: '7px',
	// 			width: '265px',
	// 			color: '#000000',
	// 		},
	// 		box: {
	// 			default: {fill: 0xE8E9F3, rounded: 5, stroke: {color: 0x997a8d, width: 2}},
	// 			focused: {fill: 0xE1E3EE, rounded: 5, stroke: {color: 0xb9aabd, width: 2}},
	// 			disabled: {fill: 0xDBDBDB, rounded: 5}
	// 		}
	// 	});
	// 	input.x = windowX;
	// 	input.y = windowY;
	// 	this._storageWindowsContainer.addChild(input);
	//
	// 	let inputText:string = "";
	// 	input.on('keydown', keycode => {
	// 		if (String.fromCharCode(keycode) === String.fromCharCode(keycode).toUpperCase()) {
	// 			inputText += String.fromCharCode((96 <= keycode && keycode <= 105) ? keycode-48 : keycode)
	// 		} else {
	// 			inputText += String.fromCharCode((96 <= keycode && keycode <= 105) ? keycode-48 : keycode).toLowerCase();
	// 		}
	//
	// 		if (keycode == 13) {
	// 			console.log(inputText);
	// 		}
	// 	})
	// }

	private createBackground(backgroundWidth:number, backgroundHeight:number):void {
		let backgroundX:number = 0;
		let backgroundY:number = 0;
		let background:PIXI.Graphics = new PIXI.Graphics;
		background
			.beginFill(0xbdb6bf)
			.lineStyle(2, 0x997a8d)
			.drawRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight)
		this._storageWindowsContainer.addChildAt(background, 0);
		this._storageWindowsContainer.x = (Main_Container.WINDOW_WIDTH - this._storageWindowsContainer.width) / 2;
		this._storageWindowsContainer.y = this._gap;
	}

	private createStorageWindow(windowX:number, windowY:number, windowWidth:number, windowHeight:number, numberOfWindow:number):void {
		let storageWindow:Storage_Window;
		storageWindow = new Storage_Window(windowWidth, windowHeight);
		storageWindow.x = windowX;
		storageWindow.y = windowY;
		this._storageWindowsContainer.addChild(storageWindow);

		const data:Record<string, any> = this._level.items[numberOfWindow];						//create text on storage
		const keys:string[] = Object.keys(data);
		let textX:number = 10;
		let textY:number = 10;
		let textColor:number;
		let buttonWidth:number = 50
		let buttonHeight:number = 19
		let textWidth:number =  windowWidth - buttonWidth - this._gap*3;
		keys.forEach(key => {
			if (key === "type") {
				textColor = 0xaa4400;
			} else {
				textColor = 0x000000;
			}
			let textForStorageWindow:Text_Window = new Text_Window(data[key], textColor, textWidth);
			textForStorageWindow.x = textX;
			textForStorageWindow.y = textY;
			textY += 22;

			storageWindow.addChild(textForStorageWindow);
			if (key === "login" || key === "password") {										//create buttons
				let button:Button = new Button(
					"copy",
					() => {this.copyCode(data[key] as string);},
					buttonWidth,
					buttonHeight);
				storageWindow.addChild(button);
				button.x = windowWidth - button.width - this._gap;
				button.y = textY - this._gap * 1.8;
			}
		});
	}

	private copyCode(copyText:string):void {
		navigator.clipboard.writeText(copyText).then(() => {
			console.log("copyText: " + copyText);
		})
		.catch(error => {
			console.error(`Текст не скопирован ${error}`);
		})
	}
}
