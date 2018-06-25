let UI;
UI = function (app) {
    this.events = {};
    this.app = app;
    this.stage = this.app.stage;
    this.view = this.app.renderer.view;
    this.resources = PIXI.loader.resources;
    this.graphics = new Graphics();

    this.screenMenu = new Screeen({buttonPlay: '', buttonSound: '', buttonPlay:''}, {panelUp:'', panelMiddle:''}, this.stage);

    this.on = (event, callback) => {
        this.events[event] = callback;
    }

    this.outline = 2;
    this.width = this.view.width / 4 * 0.9;
    this.height = 80 * 0.9;

    this.load = () => {
        if (this.events['load'])
            this.events.load();
    }

    this.start = () => {
        if (this.events['start'])
            this.events.start();
    }

    this.addToStage = () => {
        this.screenMenu.addToStage(this.stage);
        // this.screenGame.addToStage(this.stage);
    }

    this.update = () => {
        this.screenMenu.update();
        // this.screenGame.update();
    }
};