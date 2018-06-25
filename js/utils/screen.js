let Screeen = function(app) {
    this.renderer = app.renderer;

    this.options = {
        width:  this.renderer.view.width,
        height: this.renderer.view.height,
    }

    this.viewResizeEvent = new Event('viewResizeEvent');

    this.renderer.view.style.position = "absolute";
    this.renderer.view.style.display = "block";
    this.renderer.autoResize = true;

    this.FitScreen = () => {
        this.options.width = window.innerWidth;
        this.options.height = window.innerHeight;

        this.renderer.resize(this.options.width, this.options.height);
    }

    this.isScreenSizeChange = () => {
        if(this.options.width != window.innerWidth || this.options.height != window.innerHeight){
            document.dispatchEvent(this.viewResizeEvent);
        }
    }

    document.addEventListener('viewResizeEvent', () => { this.FitScreen(); }, false);

    var newStyle = document.createElement("style");
    var style = "* {padding: 0; margin: 0}";
    newStyle.appendChild(document.createTextNode(style));
    document.head.appendChild(newStyle);
}

