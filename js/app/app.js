PIXI.CanvasRenderer;

const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, antialias: true, backgroundColor: 0x1D0E26, transparent: false});
const screen = new Screeen(app);
const game = new Core(app);
// const ui = new UI(app);

//------------------------------------------------
// import preact from 'preact';
const { Component, h, render, createElement } = window.preact;
const {element} = window.preact;
console.log(element);
console.log(window.preact);

let buttonPlay;
let textScore;
let textTapToStart;
let textHightScore;
let textScoreGameOver;
let textGameTitle;

class ButtonPlayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playState: 'paused',
            className: '',
            animationName: 'hideButton',
            top: '',
            text: 'Play!',
            animationEndedCallback: function () {
            }
        }
        buttonPlay = this;
    }

    render() {
        this.buttonPlay = createElement('button', {
            id: 'buttonPlay',
            // className: this.state.className,
            style: {
                top: this.state.top,
                // animationName: this.state.animationName,
                animationPlayState: this.state.playState,
                onAnimationEnd: this.state.animationEndedCallback,
            }
        }, this.state.text);

        this.buttonPlay.attributes.disabled = false;

        this.buttonPlay.attributes.onAnimationEnd = () => {}
        this.buttonPlay.attributes.onclick = () => {
            game.scene.request();
            this.setState({playState: 'running', animationName: 'hideButton', top: '110%'});
            // console.log('!!~!@#@!#!');
        }
        this.buttonPlay.attributes.touchmove = (e) => {e.preventDefault();}
        this.buttonPlay.attributes.ontouchmove = (e) => {e.preventDefault();}
        this.buttonPlay.attributes.ondragstart = (e) => {e.preventDefault();}

        return this.buttonPlay;
    }

    setState(state) {
        this.state = state;
        this.forceUpdate()
    }
}
class TextScoreComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myScoreText: '',
            playState: 'paused',
            // animationEndedCallback: function () {
            // }
        }
        textScore = this;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log('changed');
        this.setState({myScoreText: event.currentTarget.value});
    }

    render() {
        this.textScore = createElement('p',
            {
                id: 'textScore',
                style: {
                    animationPlayState: this.state.playState,
                    onAnimationEnd: this.state.animationEndedCallback
                }
            },
            this.state.myScoreText);

        this.textScore.attributes.onAnimationIteration/*onAnimationEnd */ = () => {
            this.setState({myScoreText: this.state.myScoreText, playState: 'paused'});
        }

        this.textScore.attributes.disabled = false;

        this.textScore.attributes.touched = (e) => {e.preventDefault();}
        this.textScore.attributes.ontouchstart = (e) => {e.preventDefault();}
        this.textScore.attributes.touchmove = (e) => {e.preventDefault();}
        this.textScore.attributes.ontouchmove = (e) => {e.preventDefault();}
        this.textScore.attributes.ondragstart = (e) => {e.preventDefault();}

        return this.textScore;
    }

    setState(state) {
        this.state = state;
        this.forceUpdate()
    }
}
class TextTapToStartComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            myText: 'Tap to start!',
            playState: 'paused',
            top: '',
            animationEndedCallback: function () {}
        }
        textTapToStart = this;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log('changed');
        this.setState({myScoreText: event.currentTarget.value});
    }

    render() {
        this.textTapToStart = createElement('center',
            {
                id: 'textTapToStart',
                style: {
                    top: this.state.top,
                    // animationPlayState: this.state.playState,
                    // onAnimationEnd: this.state.animationEndedCallback
                }
            },
            this.state.myText);

        // this.textScore.attributes.onAnimationIteration/*onAnimationEnd */ = () => {
        //     this.setState({myScoreText: this.state.myScoreText, playState: 'paused'});
        // }

        this.textTapToStart.attributes.disabled = false;

        // this.textScore.attributes.touched = (e) => {e.preventDefault();}
        this.textTapToStart.attributes.ontouchstart = (e) => {e.preventDefault();}
        this.textTapToStart.attributes.touchmove = (e) => {e.preventDefault();}
        this.textTapToStart.attributes.ontouchmove = (e) => {e.preventDefault();}
        this.textTapToStart.attributes.ondragstart = (e) => {e.preventDefault();}

        return this.textTapToStart;
    }

    setState(state) {
        this.state = state;
        this.forceUpdate()
    }
}
class TextHightScoreComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            top: '',
        }
        textHightScore = this;
    }

    render() {
        this.textHightScore = createElement('center',
            {
                id: 'textHightScore',
                style: {
                    top: this.state.top,
                }
            },
            this.state.text);

        this.textHightScore.attributes.disabled = false;

        // this.textScore.attributes.touched = (e) => {e.preventDefault();}
        this.textHightScore.attributes.ontouchstart = (e) => {e.preventDefault();}
        this.textHightScore.attributes.touchmove = (e) => {e.preventDefault();}
        this.textHightScore.attributes.ontouchmove = (e) => {e.preventDefault();}
        this.textHightScore.attributes.ondragstart = (e) => {e.preventDefault();}

        return this.textHightScore;
    }

    setState(state) {
        this.state = state;
        this.forceUpdate()
    }
}
class TextScoreGameOverComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            top: '',
        }
        textScoreGameOver = this;
    }

    render() {
        this.textScoreGameOver = createElement('center',
            {
                id: 'textScoreGameOver',
                style: {
                    top: this.state.top,
                }
            },
            this.state.text);

        this.textScoreGameOver.attributes.disabled = false;

        // this.textScore.attributes.touched = (e) => {e.preventDefault();}
        this.textScoreGameOver.attributes.ontouchstart = (e) => {e.preventDefault();}
        this.textScoreGameOver.attributes.touchmove = (e) => {e.preventDefault();}
        this.textScoreGameOver.attributes.ontouchmove = (e) => {e.preventDefault();}
        this.textScoreGameOver.attributes.ondragstart = (e) => {e.preventDefault();}

        return this.textScoreGameOver;
    }

    setState(state) {
        this.state = state;
        this.forceUpdate()
    }
}
class TextGameTitleComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            top: '',
        }
        textGameTitle = this;
    }

    render() {
        this.textGameTitle = createElement('center',
            {
                id: 'textGameTitle',
                style: {
                    top: this.state.top,
                }
            },
            this.state.text);

        this.textGameTitle.attributes.disabled = false;

        // this.textScore.attributes.touched = (e) => {e.preventDefault();}
        this.textGameTitle.attributes.ontouchstart = (e) => {e.preventDefault();}
        this.textGameTitle.attributes.touchmove = (e) => {e.preventDefault();}
        this.textGameTitle.attributes.ontouchmove = (e) => {e.preventDefault();}
        this.textGameTitle.attributes.ondragstart = (e) => {e.preventDefault();}

        return this.textGameTitle;
    }

    setState(state) {
        this.state = state;
        this.forceUpdate()
    }
}

function RenderComponent(component) {
    render(h(component), document.body);
}

let score = 0;
let hightScore;

function ResetScore(){
    score = 0;
}

function HightScoreTextShow() {
    if(hightScore > score) {
        textScoreGameOver.setState({text: 'Score: ' + score, top: '25%'});
        textHightScore.setState({text: 'Best: ' + hightScore, top:'35%'});
    }
    else {
        textScoreGameOver.setState({text: 'New Best: ' + score, top: '30%'});
        textHightScore.setState({text: '', top:'20%'});
        hightScore = score;
        SaveHightScore(score);
    }
}

function HightScoreTextHide() {
    textHightScore.setState({text: '', top:'20%'});
}

function LoadHightScore() {
    return 3;
}
function SaveHightScore(score) {
    hightScore = score;
}

function CreateAndRunScoreText(){
    if(!textScore)
        RenderComponent(TextScoreComponent);
}

function CreateTapToStartText(){
    if(!textTapToStart)
        RenderComponent(TextTapToStartComponent);
    textTapToStart.setState({myText: 'Tap to start!', top:'30%'});
}

function CreateHightScoreText(){
    if(!textHightScore)
        RenderComponent(TextHightScoreComponent);
}

function CreateScoreGameOverText(){
    if(!textScoreGameOver)
        RenderComponent(TextScoreGameOverComponent);
}

function CreatePlayButton() {
    if(!buttonPlay)
        RenderComponent(ButtonPlayComponent);
}

function CreateGameTitleText() {
    if(!textGameTitle)
        RenderComponent(TextGameTitleComponent);
}

//------------------------------------------------

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
    hightScore = LoadHightScore();
});

game.on('start', () => {
    console.log('start');
    app.ticker.add(screen.isScreenSizeChange);
    app.ticker.add(game.update);

    CreateGameTitleText();
    CreateHightScoreText();
    CreateScoreGameOverText();
    textGameTitle.setState({text:'Skill Line'});
    // CreatePanelGameOver();
});

// ui.on('load', () => {
//     // ui.screenMenu.buttons.button1.on('down', ()=>{
//     //     console.log('sound down');
//     // });
//     // ui.screenMenu.buttons.button1.on('up', ()=>{
//     //     console.log('sound up');
//     // });
//     // ui.screenGame.buttons.buttonPlay.on('up', ()=>{
//     //     game.play();
//     //     FBInstant.context.chooseAsync();
//     // });
// });

// ui.on('start', () => {
//     app.ticker.add(ui.update);
// });

function Pause(){
    // game.scene.state = GameState.STATE_PAUSE;
    game.pause();
}

game.on('pause', () => {
    console.log('pause');
    textTapToStart.setState({myText:'Tap to continue', top:'30%'});
});

game.on('continue', () => {
    console.log('continue');
    textTapToStart.setState({myText:'', top:'30%'});
});

game.on('gameOver', () => {
    game.scene.request(game.scene);
    buttonPlay.setState({playState: 'running', top: '85%', text: 'Play Again!'});
    textScore.setState({myScoreText:''});
    clearInterval(myInterval);

    HightScoreTextShow();

    SaveLeaderboard();
    GetLeaderboard();
    ShowAds();
})

game.on('gameReady', () => {
    ResetScore();
    CreateTapToStartText();
    textGameTitle.setState({text: ''});
    textTapToStart.setState({myText:'Tap to start!', top: '30%'});
    textScoreGameOver.setState({text: ''});
    HightScoreTextHide();

    LoadAds();
});
let myInterval;
game.on('gameStart', () => {
    CreateAndRunScoreText();
    textScore.setState({myScoreText: score});
    textTapToStart.setState({myText:'', top: '30%'});

    textScore.setState({myScoreText: '0', playState: 'paused'});
    myInterval = setInterval(() => {
        if(game.scene.state == GameState.STATE_ACTIVE) {
            score += 1;
            textScore.setState({
                myScoreText: score, playState: 'paused'
            });
        }
    }, 1000);
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

        // ui.load();
        // ui.start();
        // ui.addToStage();

        // createButton();
        CreatePlayButton();
    });
});

function SaveLeaderboard() {
    // console.log('SaveLeaderboard');
    // FBInstant
    //     .getLeaderboardAsync('Leaders'/* + FBInstant.context.getID()*/)
    //     .then(leaderboard => {
    //         console.log(leaderboard.getName());
    //         return leaderboard.setScoreAsync(hightScore, '{race: "elf", level: 3}');
    //     })
    //     .then(() => console.log('Score saved'))
    //     .catch(error => console.error(error));
}

function GetLeaderboard() {
    // console.log('GetLeaderboard');
    // FBInstant
    //     .getLeaderboardAsync('Leaders'/* + FBInstant.context.getID()*/)
    //     .then(leaderboard => leaderboard.getEntriesAsync(10, 0))
    //     .then(entries => {
    //         for (var i = 0; i < entries.length; i++) {
    //             console.log(
    //                 entries[i].getRank() + '. ' +
    //                 entries[i].getPlayer().getName() + ': ' +
    //                 entries[i].getScore()
    //             );
    //         }
    //     }).catch(error => console.error(error));
}

function UpdateLeaderboard() {
    // FBInstant.updateAsync({
    //     action: 'LEADERBOARD',
    //     name: 'Leaders'/* + FBInstant.context.getID()*/
    // }).
    // then(() => console.log('Update Posted')).
    // catch(error => console.error(error));
}

var preloadedInterstitial;

function LoadAds() {
    // preloadedInterstitial = null;
    //
    // FBInstant.getInterstitialAdAsync(
    //     '2183219578572662_2183244248570195'/*'123123123123_123123123123'*/, // Your Ad Placement Id
    // ).then(function(interstitial) {
    //     // Load the Ad asynchronously
    //     preloadedInterstitial = interstitial;
    //     return preloadedInterstitial.loadAsync();
    // }).then(function() {
    //     console.log('Interstitial preloaded')
    // }).catch(function(err){
    //     console.error('Interstitial failed to preload: ' + err.message);
    // });
}

function ShowAds() {
    // preloadedInterstitial.showAsync()
    //     .then(function () {
    //         // Perform post-ad success operation
    //         console.log('Interstitial ad finished successfully');
    //     })
    //     .catch(function (e) {
    //         console.error(e.message);
    //     });
}
















