let Graphics = function() {
    this.buttonWhiteSprite;
    this.buttonGreenSprite;
    this.buttonRedSprite;
    this.panelWhiteSprite;

    this.buttonWhiteCircleSprite;
    this.buttonPlayCircleSprite;

    this.platformSprite;
    this.circleSprite;

    this.triangleTexture;
    this.triangleSprite;

    this.circleSpriteGet = ({radius, outline}) => {
        if(!this.circleSprite || this.circleSprite.width != radius * 2 || this.circleSprite.height != radius * 2) {
            this.graphics = new PIXI.Graphics();
            this.graphics.lineStyle(outline, 0xE9E2C8, outline);
            this.rectGraphics = this.graphics.beginFill(0xFEC415).drawCircle(0, 0, radius).endFill();
            this.iconGreenTexture = this.rectGraphics.generateCanvasTexture();
            this.circleSprite = new PIXI.Sprite(this.iconGreenTexture);
            this.circleSprite.anchor = {x: 0.5, y: 0.5};

            return this.circleSprite;
        }else{
            return this.circleSprite;
        }
    }
    this.triangleSpriteGet = (size, outline) => {
        if(!this.triangleTexture) {
            // this.triangleTexture = new PIXI.Graphics()
            //     .beginFill(0xFC2652)
            //     .lineStyle(outline, 0xE9E2C8, outline)
            //     .drawPolygon([
            //         30, 50,
            //         90, 50,
            //         60, 100,
            //         30, 50
            //     ])
            //     .endFill()
            //     .generateCanvasTexture();

            this.triangleTexture = new PIXI.Graphics()
                // .beginFill(0xE9E2C8)
                // .drawPolygon([
                //     30, 50,
                //     90, 50,
                //     60, 100,
                //     30, 50
                // ])
                // .endFill()
                // .beginFill(0xFC2652)
                // .drawPolygon([
                //     40, 55,
                //      80, 55,
                //     60, 90,
                //     40, 55
                // ])
                // .endFill()
                // .generateCanvasTexture();

                .beginFill(0xE9E2C8)
                .drawPolygon([
                    size, 2 * size - size / 3,
                    size * 3, 2 * size - size / 3,
                    size * 2, 2 * (2 * size - size / 3),
                    size, 2 * size - size / 3
                ])
                .endFill()
                .beginFill(0xFC2652)
                .drawPolygon([
                    size + outline, 2 * size - size / 3 + outline / 2,
                    size * 3 - outline,  2 * size - size / 3 + outline / 2,
                    size * 2, 2 * (2 * size - size / 3) - outline,
                    size + outline, 2 * size - size / 3 + outline / 2
                ])
                .endFill()
                .generateCanvasTexture();
        }

        this.triangleSprite = new PIXI.Sprite(this.triangleTexture);
        this.triangleSprite.anchor = {x: 0.5, y: 0.5};
        return this.triangleSprite;
    }

    this.buttonWhiteSpriteGet = ({width, height, outline}) => {
        if(!this.buttonWhiteSprite || this.buttonWhiteSprite.width != width || this.buttonWhiteSprite.height != height) {
            this.graphics = new PIXI.Graphics();
            this.rectGraphics = this.graphics.beginFill(0xC8F0D1).drawRoundedRect(0, 0, width, height, 8).endFill();
            this.buttonWhiteTexture = this.rectGraphics.generateCanvasTexture();
            this.buttonWhiteSprite = new PIXI.Sprite(this.buttonWhiteTexture);

            return this.buttonWhiteSprite;
        }else{
            return this.buttonWhiteSprite;
        }
    }

    this.buttonGreenSpriteGet = ({width, height, outline}) => {
        this.buttonGreenSprite = this.buttonWhiteSpriteGet({width, height, outline});

        this.graphics = new PIXI.Graphics();
        this.rectGraphics = this.graphics.beginFill(0x8FC79B).drawCircle(0, 0, 20).endFill();
        this.iconGreenTexture = this.rectGraphics.generateCanvasTexture();
        this.iconGreenSprite = new PIXI.Sprite(this.iconGreenTexture);
        this.iconGreenSprite.anchor = {x: 0.5, y: 0.5};

        this.buttonGreenSprite.addChild(this.iconGreenSprite);

        return this.buttonGreenSprite;
    }

    this.buttonRedSpriteGet = ({width, height, outline}) => {
        this.buttonRedSprite = this.buttonWhiteSpriteGet({width, height, outline});

        this.graphics = new PIXI.Graphics();
        this.rectGraphics = this.graphics.beginFill(0x8FC79B).drawRect(0, 0, 25, 25).endFill();
        this.iconGreenTexture = this.rectGraphics.generateCanvasTexture();
        this.iconGreenSprite = new PIXI.Sprite(this.iconGreenTexture);
        this.iconGreenSprite.anchor = {x: 0.5, y: 0.5};

        this.buttonRedSprite.addChild(this.iconGreenSprite);

        return this.buttonRedSprite;
    }

    this.buttonWhiteCircleSpriteGet = ({radius}) => {
        if(!this.buttonWhiteCircleSprite || this.buttonWhiteCircleSprite.width != radius || this.buttonWhiteCircleSprite.height != radius) {
            this.graphics = new PIXI.Graphics();
            this.rectGraphics = this.graphics.beginFill(0xC8F0D1).drawCircle(0, 0, radius).endFill();
            this.buttonWhiteCircleTexture = this.rectGraphics.generateCanvasTexture();
            this.buttonWhiteCircleSprite = new PIXI.Sprite(this.buttonWhiteCircleTexture);

            return this.buttonWhiteCircleSprite;
        }else {
            return this.buttonWhiteCircleSprite;
        }
    }

    this.buttonPlayCircleSpriteGet = ({radius, width, height}) => {
        this.buttonPlayCircleSprite = this.buttonWhiteCircleSpriteGet({radius});

        this.graphics = new PIXI.Graphics();
        this.rectGraphics = this.graphics.beginFill(0x8FC79B).drawRect(0,0,width,height).endFill();
        this.iconGreenTexture = this.rectGraphics.generateCanvasTexture();
        this.iconGreenSprite = new PIXI.Sprite(this.iconGreenTexture);
        this.iconGreenSprite.anchor = {x: 0.5, y: 0.5};

        this.buttonPlayCircleSprite.addChild(this.iconGreenSprite);

        return this.buttonPlayCircleSprite;
    }

    this.panelWhiteSpriteGet = ({width, height, outline}) => {
        if(!this.panelWhiteSprite || this.panelWhiteSprite.width != width || this.panelWhiteSprite.height != height) {
            this.graphics = new PIXI.Graphics();
            this.graphics.lineStyle(outline, 0xE9E2C8, outline);
            this.rectGraphics = this.graphics.beginFill(0x1F63DE).drawRoundedRect(0, 0, width, height, 0).endFill();
            this.panelWhiteTexture= this.rectGraphics.generateCanvasTexture();
            this.panelWhiteSprite = new PIXI.Sprite(this.panelWhiteTexture);

            return this.panelWhiteSprite;
        }else{
            return this.panelWhiteSprite;
        }
    }

    //-------------

    // this.platformSpriteGet = () =>{
    //         if(!this.buttonWhiteSprite || this.buttonWhiteSprite.width != width || this.buttonWhiteSprite.height != height) {
    //             this.graphics = new PIXI.Graphics();
    //             this.rectGraphics = this.graphics.beginFill(0xC8F0D1).drawRoundedRect(0, 0, width, height, 8).endFill();
    //             this.buttonWhiteTexture = this.rectGraphics.generateCanvasTexture();
    //             this.buttonWhiteSprite = new PIXI.Sprite(this.buttonWhiteTexture);
    //
    //             return this.buttonWhiteSprite;
    //         }else{
    //             return this.buttonWhiteSprite;
    //         }
    //
}