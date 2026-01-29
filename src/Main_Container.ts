import Container = PIXI.Container;
import {Graphics} from "pixi.js";
import Storage_Window from "./Storage_Window";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = window.innerWidth;
	public static readonly WINDOW_HEIGHT:number = window.innerHeight;
	public static JSON_LOADER:XMLHttpRequest;
	private _storageWindow:Storage_Window;
	private _level:ILevel;

	constructor() {
		super();
		this.jsonLoader();
	}

	private jsonLoader():void {
		Main_Container.JSON_LOADER = new XMLHttpRequest();
		Main_Container.JSON_LOADER.responseType = "json";

		Main_Container.JSON_LOADER.open("GET", "base.json", true);
		Main_Container.JSON_LOADER.onreadystatechange = () => {
				this._level = Main_Container.JSON_LOADER.response;
				this.createBackground();
		};
		Main_Container.JSON_LOADER.send();
	}

	private createBackground():void {
		let backgroundX:number = 10;
		let backgroundY:number = 10;
		let backgroundWidth:number = Main_Container.WINDOW_WIDTH - backgroundX * 2;
		let backgroundHeight:number = Main_Container.WINDOW_HEIGHT - backgroundY * 2;

		let background:PIXI.Graphics = new PIXI.Graphics;
		background
			.beginFill(0xbdb6bf)
			.lineStyle(2, 0x997a8d, 1, 0)
			.drawRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight)
		this.addChild(background);

		let gap:number = 10;
		let storageWindowsX:number = backgroundX + gap;
		let storageWindowsY:number = backgroundY + gap;
		let storageWindowsWidth:number = 300;
		let storageWindowsHeight:number = 140;

		for (let iterator:number = 0; iterator < this._level.items.length; iterator++) {
			this.createStorageWindows(storageWindowsX, storageWindowsY, storageWindowsWidth, storageWindowsHeight);
			console.log(storageWindowsX);
			storageWindowsX += storageWindowsWidth + gap;
			if (storageWindowsX >= backgroundWidth - storageWindowsWidth) {
				storageWindowsY += storageWindowsHeight + gap;
				storageWindowsX = backgroundX + gap;
			}
		}
	}

	private createStorageWindows(windowX:number, windowY:number, windowWidth:number, windowHeight:number):void {
		this._storageWindow = new Storage_Window(windowWidth, windowHeight);
		this._storageWindow.x = windowX;
		this._storageWindow.y = windowY;
		this.addChild(this._storageWindow);

	}
}
