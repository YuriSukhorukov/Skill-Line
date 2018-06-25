let Screen1 = function (buttons) {
    // this.buttons            = buttons;
    // this.Render             = () => {render(h(myComponent), document.body);}
}

let Button = function (sprite, container){
    this.view               = sprite;
    this.events             = {};
    this.view.anchor.x      = 0.5;
    this.view.anchor.y      = 0.5;
    this.view.interactive   = true;
    this.view.buttonMode    = true;
    this.view.cursor        = 'wait';
    this.pressed            = false;
    this.width              = this.view.width;
    this.height             = this.view.height;



    class ButtonComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                playState: 'paused',
                className: '',
                animationName: 'hideButton',
                top: '',
                animationEndedCallback: function () {
                }
            }
            buttonPlay = this;
        }

        render() {
            this.buttonPlay = createElement('button', {
                id: 'myButton',
                style: {
                    top: this.state.top,
                    // animationName: this.state.animationName,
                    animationPlayState: this.state.playState,
                    onAnimationEnd: this.state.animationEndedCallback,
                }
            }, 'Play!');

            this.buttonPlay.attributes.disabled = false;

            this.buttonPlay.attributes.onAnimationEnd = () => {}

            this.buttonPlay.attributes.onclick = () => {
                game.scene.request();
                this.setState({playState: 'running', animationName: 'hideButton', top: '110%'});
                console.log('!!~!@#@!#!');
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
}