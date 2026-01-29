import Container = PIXI.Container;
import "pixi.js";
import Storage_Window from "./Storage_Window";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = window.innerWidth;
	public static readonly WINDOW_HEIGHT:number = window.innerHeight;
	public static JSON_LOADER:XMLHttpRequest;
	private _storageWindowsContainer:PIXI.Container;
	private _storageWindow:Storage_Window;
	private _level:ILevel;
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
			this._level = Main_Container.JSON_LOADER.response;
			this._storageWindowsContainer = new PIXI.Container;
			this.addChild(this._storageWindowsContainer);
			this.createStorageWindowsGrid();
		};
		Main_Container.JSON_LOADER.send();
	}

	private createStorageWindowsGrid():void {
		let storageWindowsX:number = this._gap;
		let storageWindowsY:number = this._gap;
		let storageWindowsWidth:number = 300;
		let storageWindowsHeight:number = 140;
		let backgroundWidth:number;
		let backgroundHeight:number;
		for (let iterator:number = 0; iterator < this._level.items.length; iterator++) {
			this.createStorageWindows(storageWindowsX, storageWindowsY, storageWindowsWidth, storageWindowsHeight);
			console.log(storageWindowsX);
			storageWindowsX += storageWindowsWidth + this._gap;
			if (storageWindowsX >= Main_Container.WINDOW_WIDTH - storageWindowsWidth) {
				backgroundWidth = storageWindowsX;
				storageWindowsY += storageWindowsHeight + this._gap;
				storageWindowsX = this._gap;
			}
		}
		backgroundHeight = storageWindowsY + storageWindowsHeight + this._gap;
		this.createBackground(backgroundWidth, backgroundHeight);
	}

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

	private createStorageWindows(windowX:number, windowY:number, windowWidth:number, windowHeight:number):void {
		this._storageWindow = new Storage_Window(windowWidth, windowHeight);
		this._storageWindow.x = windowX;
		this._storageWindow.y = windowY;
		this._storageWindowsContainer.addChild(this._storageWindow);
	}
}
