import Container = PIXI.Container;
import "pixi.js";
import Storage_Window from "./Storage_Window";
import Text_Window from "./Text_Window";
import Button from "./Button";
import Storage_Window_Constructor from "./Storage_Window_Constructor";
import Start_Menu from "./Start_Menu";
import Global from "./Global";
import {InteractionEvent, IPoint} from "pixi.js";

export default class Main_Container extends Container {
	public static JSON_LOADER:XMLHttpRequest;
	private _level:ILevel;
	private _startMenuContainer:PIXI.Container;
	private _storageWindowsContainer:PIXI.Container;
	private _constructorContainer:PIXI.Container;
	private _gap:number = 10;
	private _touchDownPoint:IPoint;
	private _textForStartMenu:string ="Password Storage\n\n\nPassword Storage находится в процессе разработки."+
		"\n\nПри заполнении каждого поля конструктора нажимать клавишу Enter.";

	private _textForRestartMenu:string ="Password Storage\n\n\nДанные сохранены. \n"+
		"Загрузите базу данных заново.";

	constructor() {
		super();
		this.createStartMenu(this._textForStartMenu);
	}

	private jsonLoader():void {
		Main_Container.JSON_LOADER = new XMLHttpRequest();
		Main_Container.JSON_LOADER.responseType = "json";
		Main_Container.JSON_LOADER.open("GET", "base.json", true);
		Main_Container.JSON_LOADER.onreadystatechange = () => {
			this.startStorageWindows();
		};
		Main_Container.JSON_LOADER.send();
	}

	private createButton(bX:number, bY:number, bWidth:number, bHeight:number, saveCont:PIXI.Container, callback:any, name:string):void {
		let createButton:Button = new Button(
			name,
			callback,
			bWidth,
			bHeight);
		createButton.x = bX;
		createButton.y = bY;
		saveCont.addChild(createButton);
	}

	private createStartMenu(textForStartMenu:string):void {
		this.removeAll();
		this._startMenuContainer = new PIXI.Container;
		this.addChild(this._startMenuContainer);
		let  startMenu:Start_Menu = new Start_Menu(textForStartMenu);
		this._startMenuContainer.addChild(startMenu);

		let startMenuButtonWidth:number = 80;
		let startMenuButtonHeight:number = 30;
		let startMenuButtonX:number = (Global.WINDOW_WIDTH - startMenuButtonWidth) / 2;
		let startMenuButtonY = (Global.WINDOW_HEIGHT - startMenuButtonHeight) / 1.5;
		this.createButton(																								//BUTTON START MENU
			startMenuButtonX,
			startMenuButtonY,
			startMenuButtonWidth,
			startMenuButtonHeight,
			this._startMenuContainer,
			() => {this.jsonLoader();},
			"START");
	}

	private removeAll():void {
		this.removeChild(this._startMenuContainer);
		this.removeChild(this._storageWindowsContainer);
		this.removeChild(this._constructorContainer);
	}

	private startStorageWindows():void {
		this.removeAll();
		this._storageWindowsContainer = new PIXI.Container;
		this._level = Main_Container.JSON_LOADER.response;
		this.addChild(this._storageWindowsContainer);
		this.createStorageWindowsGrid();
	}

	private createStorageWindowsGrid():void {
		let storageWindowsX:number = this._gap;
		let storageWindowsY:number = this._gap;
		let storageWindowWidth:number = 300;
		let storageWindowHeight:number = 180;
		let backgroundWidth:number = 0;
		let backgroundHeight:number = storageWindowHeight + this._gap*2;
		let bgWidthMax:boolean = false;

		if (this._level != null) {
			for (let iterator:number = 0; iterator < this._level.items.length; iterator++) {
				this.createStorageWindow(storageWindowsX, storageWindowsY, storageWindowWidth, storageWindowHeight, iterator);
				storageWindowsX += storageWindowWidth + this._gap;

				if (storageWindowsX + storageWindowWidth > Global.WINDOW_WIDTH) {
					storageWindowsX = this._gap;
					storageWindowsY += storageWindowHeight + this._gap;
					backgroundHeight += storageWindowHeight + this._gap;
					bgWidthMax = true;
				}
				if (!bgWidthMax) {
					backgroundWidth = storageWindowsX + storageWindowWidth + this._gap;
				}
			}

			let newStorageWindow:Storage_Window = new Storage_Window(storageWindowWidth, storageWindowHeight);
			newStorageWindow.x = storageWindowsX;
			newStorageWindow.y = storageWindowsY;
			this._storageWindowsContainer.addChild(newStorageWindow);

			let windowButtonWidth:number = storageWindowWidth-this._gap*4;
			let windowButtonHeight:number = storageWindowHeight-this._gap*8;
			let windowButtonX:number = this._gap*2;
			let windowButtonY:number = (storageWindowHeight - windowButtonHeight) / 2;

			this.createButton(																							//BUTTON CREATE NEW WINDOW
				windowButtonX,
				windowButtonY,
				windowButtonWidth,
				windowButtonHeight,
				newStorageWindow,
				() => {this.createStorageWindowConstructor();},
				"CREATE NEW")
		}
		this.createBackground(backgroundWidth, backgroundHeight);

		if (this._storageWindowsContainer.height > Global.WINDOW_HEIGHT) {
			this._storageWindowsContainer.interactive = true;
			this._storageWindowsContainer.addListener('pointerdown', this.onDragStart, this);
			this._storageWindowsContainer.addListener('pointerup', this.onDragEnd, this);
			this._storageWindowsContainer.addListener('pointerupoutside', this.onDragEnd, this);
		}
	}

	private onDragStart(event:InteractionEvent):void {
		this._touchDownPoint = this._storageWindowsContainer.toLocal(event.data.global);
		this._storageWindowsContainer.addListener('mousemove', this.onDragMove, this);
		this._storageWindowsContainer.addListener('touchmove', this.onDragMove, this);
	}

	private onDragMove(event:InteractionEvent):void {
		const newPosition:IPoint = this.toLocal(event.data.global);
		this._storageWindowsContainer.y = newPosition.y - this._touchDownPoint.y;
		this.dragLimits();
	}

	private onDragEnd():void {
		this._storageWindowsContainer.removeListener('mousemove', this.onDragMove, this);
		this._storageWindowsContainer.removeListener('touchmove', this.onDragMove, this);
	}

	private dragLimits():void {
		if (this._storageWindowsContainer.y <= Global.WINDOW_HEIGHT -this._storageWindowsContainer.height - this._gap) {
			this._storageWindowsContainer.y = Global.WINDOW_HEIGHT - this._storageWindowsContainer.height - this._gap;
		} else if (this._storageWindowsContainer.y >= this._gap) {
			this._storageWindowsContainer.y = this._gap;
		}
	}

	private createStorageWindowConstructor():void {
		this.removeAll();
		this._constructorContainer = new PIXI.Container;
		this.addChild(this._constructorContainer)
		const windowWidth:number = Global.WINDOW_WIDTH*0.9;
		const windowHeight:number = Global.WINDOW_HEIGHT*0.9;
		let storageWindowConstructor:Storage_Window_Constructor = new Storage_Window_Constructor(
			windowWidth,
			windowHeight,
			Main_Container.JSON_LOADER.response)
		storageWindowConstructor.x = (Global.WINDOW_WIDTH - windowWidth)/2;
		storageWindowConstructor.y = (Global.WINDOW_HEIGHT - windowHeight)/2;
		this._constructorContainer.addChild(storageWindowConstructor);

		let buttonCreateWidth:number = 80;
		let buttonCreateHeight:number = 30;
		let buttonCreateX:number = 120;
		let buttonCreateY:number = 500;

		this.createButton(																								//BUTTON CREATE
			buttonCreateX,
			buttonCreateY,
			buttonCreateWidth,
			buttonCreateHeight,
			this._constructorContainer,
			() => {this.createDatabaseSection();},
			"Create")

		let buttonWidth:number = 25;
		let buttonHeight:number = 25;
		let buttonClosedX:number = storageWindowConstructor.x + windowWidth - buttonWidth - this._gap;
		let buttonClosedY:number = storageWindowConstructor.y + this._gap;
		this.createButton(																								//BUTTON CLOSED
			buttonClosedX,
			buttonClosedY,
			buttonWidth,
			buttonHeight,
			this._constructorContainer,
			() => {this.startStorageWindows();},
			"╳")
	}

	private createDatabaseSection():void {
		let newObj:IBlock = (
			{
				type:Storage_Window_Constructor.dataForTypeRow,
				url:Storage_Window_Constructor.dataForURLRow,
				login:Storage_Window_Constructor.dataForLoginRow,
				password:Storage_Window_Constructor.dataForPasswordRow,
				description:Storage_Window_Constructor.dataForDescriptionRow
			}
		);

		this._level.items.push(newObj);
		let res = JSON.stringify(this._level);
		Main_Container.JSON_LOADER.open("SET", "base.json", true);
		console.log(res);

		let blob = new Blob([res], {type: "json"});
		let link = document.createElement("a");
		link.setAttribute("href", URL.createObjectURL(blob));
		link.setAttribute("download", "base.json");
		link.click();

		this.removeAll();
		this.createStartMenu(this._textForRestartMenu);
	}

	private createBackground(backgroundWidth:number, backgroundHeight:number):void {
		let backgroundX:number = 0;
		let backgroundY:number = 0;
		let background:PIXI.Graphics = new PIXI.Graphics;
		background.beginFill(0xbdb6bf);
		if (background.width > 0) {																			//FIXME
			background.lineStyle(2, 0x997a8d);
		}
		background.drawRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
		this._storageWindowsContainer.addChildAt(background, 0);
		this._storageWindowsContainer.x = (Global.WINDOW_WIDTH - this._storageWindowsContainer.width) / 2;
		this._storageWindowsContainer.y = this._gap;
	}

	private createStorageWindow(windowX:number, windowY:number, windowWidth:number, windowHeight:number, numberOfWindow:number):void {
		let storageWindow:Storage_Window = new Storage_Window(windowWidth, windowHeight);
		storageWindow.x = windowX;
		storageWindow.y = windowY;
		this._storageWindowsContainer.addChild(storageWindow);

		const data:Record<string, any> = this._level.items[numberOfWindow];												//create text on storage
		const keys:string[] = Object.keys(data);
		let textX:number = 10;
		let textY:number = 10;
		let copyButtonWidth:number = 50;
		let copyButtonHeight:number = 19;
		let textColor:number;
		let textWidth:number =  windowWidth - copyButtonWidth - this._gap*3;

		keys.forEach(key => {
			if (key === "type") {
				textColor = 0xaa4400;
			} else {
				textColor = 0x000000;
			}
			if (key === "description") {
				let textForStorageWindow:Text_Window = new Text_Window(data[key], textColor, textWidth, true);
				textForStorageWindow.x = textX;
				textForStorageWindow.y = textY;
				storageWindow.addChild(textForStorageWindow);
			} else {
				let textForStorageWindow:Text_Window = new Text_Window(data[key], textColor, textWidth, false);
				textForStorageWindow.x = textX;
				textForStorageWindow.y = textY;
				storageWindow.addChild(textForStorageWindow);
			}

			textY += 22;
			let copyButtonX:number = windowWidth - copyButtonWidth - this._gap;
			let copyButtonY:number = textY - this._gap * 1.8;

			if (key === "login" || key === "password") {																//BUTTON COPY TEXT TO CLIPBOARD
				this.createButton(
					copyButtonX,
					copyButtonY,
					copyButtonWidth,
					copyButtonHeight,
					storageWindow,
					() => {this.copyCode(data[key] as string);},
					"copy")
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
