// PIXI.CanvasRenderer;

const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, antialias: true, backgroundColor: 0x1D0E26, transparent: false});
const screen = new Screen(app);
const game = new Core(app);
const ui = new UI(app);

console.log(PIXI);
console.log(app.renderer.context);

// app.renderer.context.createLinearGradient(0, 0, 500, 0);
//game.scene.canvas = app.renderer.context.canvas;

// var ctx = app.renderer.context;
//
// var gradient = ctx.createLinearGradient(0, 0, 200, 0);
// gradient.addColorStop(0, 'green');
// gradient.addColorStop(1, 'white');
// ctx.fillStyle = gradient;
// ctx.fillRect(10, 10, 200, 100);

const IMAGES = [
    'bunny',
    'bunny1',
    'bunny2',
    'bunny3',
    'bunny4',
    'bunny5',
    'bunny6',
    'bunny7',
    'bunny8',
    'bunny9',
    'bunny10',
    'texture'
];

game.on('load',() => {
    console.log('loaded');
});

game.on('start', () => {
    console.log('start');
    app.ticker.add(screen.isScreenSizeChange);
    app.ticker.add(game.update);
});

ui.on('load', () => {
    ui.screenMenu.buttons.button1.on('down', ()=>{
        console.log('sound down');
    });
    ui.screenMenu.buttons.button1.on('up', ()=>{
        console.log('sound up');
    });
    // ui.screenGame.buttons.buttonPlay.on('up', ()=>{
    //     game.play();
    //     FBInstant.context.chooseAsync();
    // });
});

ui.on('start', () => {
    app.ticker.add(ui.update);
});

game.on('pause', () => {
    console.log('pause');
});

PIXI.loader.on('progress', (loader) => {
    FBInstant.setLoadingProgress(loader.progress);
});

PIXI.loader.on('complete', () => {
    FBInstant.startGameAsync().then(() => {
        document.body.appendChild(app.view);

        // game.load();
        game.start();
        game.addToStage();

        ui.load();
        ui.start();
        // ui.addToStage();
    });
});

window.onload = function(){
    console.log(FBInstant);
    FBInstant.initializeAsync().then(() => {
        IMAGES.forEach(function (imgName, index) {
            IMAGES[index] = config.resourcesPath + imgName + '.png';
        });
        PIXI.loader.add(IMAGES);
        PIXI.loader.load(game.load);
    });

    FBInstant.onPause(()=>{
        game.pause();
    });
}
















