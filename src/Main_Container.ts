import Container = PIXI.Container;
import "pixi.js";
import Storage_Window from "./Storage_Window";
import Text_Window from "./Text_Window";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = window.innerWidth;
	public static readonly WINDOW_HEIGHT:number = window.innerHeight;
	public static JSON_LOADER:XMLHttpRequest;
	private _storageWindowsContainer:PIXI.Container;
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
		for (let iterator:number = 0; iterator < this._level.items.length; iterator++) {
			console.log(this._level.items.length)
			this.createStorageWindow(storageWindowsX, storageWindowsY, storageWindowsWidth, storageWindowsHeight, iterator);
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

	private createStorageWindow(windowX:number, windowY:number, windowWidth:number, windowHeight:number, numberOfWindow:number):void {
		let storageWindow:Storage_Window;
		storageWindow = new Storage_Window(windowWidth, windowHeight);
		storageWindow.x = windowX;
		storageWindow.y = windowY;
		this._storageWindowsContainer.addChild(storageWindow);

		const data:Record<string, any> = this._level.items[numberOfWindow];
		const keys:string[] = Object.keys(data);
		let textX:number = 10;
		let textY:number = 10;
		keys.forEach(key => {
			let textForStorageWindow:Text_Window = new Text_Window(data[key]);
			textForStorageWindow.x = textX;
			textForStorageWindow.y = textY;
			textY += 20;
			storageWindow.addChild(textForStorageWindow);
		});
	}
}
