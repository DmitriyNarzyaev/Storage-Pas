import Container = PIXI.Container;

export default class Storage_Window extends Container {

    constructor(storageWindowWidth:number, storageWindowHeight:number) {
        super();

        let storageWindow:PIXI.Graphics = new PIXI.Graphics;
        storageWindow
            .beginFill(0xddd6df)
            .lineStyle(2, 0x997a8d, 1, 0)
            .drawRect(0, 0, storageWindowWidth, storageWindowHeight);
        this.addChild(storageWindow);
    }
}
