let triangleSize;
let Core = function (app) {
    this.events = {};
    this.app = app;
    this.stage = this.app.stage;
    this.view = this.app.renderer.view;
    this.resources = PIXI.loader.resources;
    this.scene = new Scene(this.view, {
        bunny: '',
        bunny1: '',
        bunny2: '',
        bunny3: '',
        platform: '',
        ball: '',
        triangles: []
    });
    this.graphics = new Graphics();

    this.on = (event, callback) => {
        this.events[event] = callback;
    }

    this.load = () => {
        var platformWidth = this.view.width * 2;
        var platformHeight = this.view.height / 20;
        var outline = platformHeight / 8; // 6
        triangleSize = this.view.width / 14;//platformHeight - outline;
        var trianglSpeed = this.view.height / 125;
        var ballSpeed = trianglSpeed * 1.25;

        this.scene.objects.platform = this.scene.createPlatform(this.graphics.panelWhiteSpriteGet({
            width: platformWidth,
            height: platformHeight,
            outline: outline
        }));
        this.scene.objects.ball = this.scene.createBall(this.graphics.circleSpriteGet({
            radius: platformHeight,
            outline: outline
        }), this.scene.objects.platform.view, outline);
        this.scene.objects.ball.translateSpeed = ballSpeed;
        console.log('ballSpeed: ' + ballSpeed);

        for (var i = 0; i < this.view.width / triangleSize - 8; i++)
            this.scene.objects.triangles.push(this.scene.createTriangle(this.graphics.triangleSpriteGet(triangleSize, outline * 2), outline));

        this.scene.objects.triangles.forEach((value) => {
            value.translateSpeed = trianglSpeed;
        });

        if (this.events['load'])
            this.events.load();

        this.scene.on('fail', () => {
            // this.scene.request(this.scene);
            if (this.events['gameOver'])
                this.events.gameOver();
        });

        this.scene.on('start', () => {
            if (this.events['gameStart'])
                this.events.gameStart();
        });

        this.scene.on('ready', () => {
            if (this.events['gameReady'])
                this.events.gameReady();
        });

        this.scene.on('continue', () => {
            if (this.events['continue'])
                this.events.continue();
        });
        //this.events['gameStart'] = this.scene.events['gameStart'];

        window.onmousemove = (e) => {
            // this.scene.objects.triangles[0].Move({ x: e.clientX, y: e.clientY });
        };

        window.ontouchmove = (e) => {
            // this.scene.objects.bunny.Move({ x: e.touches[0].pageX, y: e.touches[0].pageY });
        };
        window.onmousedown = (e) => {
            // if(this.scene.state == GameState.STATE_ACTIVE) {
            this.scene.handle();
            // }
        }
        window.ontouchstart = (e) => {
            // if(this.scene.state == GameState.STATE_ACTIVE) {
            this.scene.handle();
            // }
        }

        this.scene.load(GameState.STATE_LOADED);
    }

    this.start = () => {
        this.scene.start();

        if (this.events['start'])
            this.events.start();
    }

    this.play = () => {
        console.log('play!!!');
    }

    this.update = () => {
        if (this.scene.state == GameState.STATE_ACTIVE) {
            this.scene.update();
        }
        else if (this.scene.state == GameState.STATE_STOP) { //1988
            for (var i = 0; i < this.scene.objects.triangles.length; i++)
                if (this.scene.objects.triangles[i].view.alpha > 0) {
                    this.scene.objects.triangles[i].view.y -= this.scene.objects.triangles[i].translateSpeed;
                    this.scene.objects.triangles[i].view.alpha -= 0.025;
                }
        }
    }

    this.pause = () => {
        if(this.scene.state == GameState.STATE_ACTIVE) {
            this.scene.state = GameState.STATE_PAUSE;

            if (this.events['pause'])
                this.events.pause();
        }
    }

    // this.continue = () => {
    //     if (this.events['continue'])
    //         this.events.continue();
    //
    //     if(this.scene.state == GameState.STATE_PAUSE)
    //         this.scene.state == GameState.STATE_ACTIVE;
    // }

    this.addToStage = () => {
        this.scene.addToStage(this.stage);
    }
}

active = true;

let GameState = {
    STATE_LOADED: {
        handle: function(context){
            console.log('handle STATE_LOADED');
            // this.request(context);
        },
        request: function(context) {
            console.log('request STATE_LOADED');
            context.state = GameState.STATE_IDLE;
            if(context.events['ready'])
                context.events.ready();
        }
    },
    STATE_IDLE: {
        handle: function(context){
            console.log('handle STATE_IDLE');
            this.request(context);
        },
        request: function(context){
            console.log('request STATE_IDLE');
            context.state = GameState.STATE_ACTIVE;
            if(context.events['start'])
                context.events.start();
        }
    },
    STATE_ACTIVE: {
        handle: function(context){
            console.log('handle STATE_ACTIVE');
            context.objects.ball.ChangeTranslateDirection();
        },
        request: function(context){
            console.log('request STATE_ACTIVE');
            context.pool.DeactivateDefault();
            context.state = GameState.STATE_STOP;
        }
    },
    STATE_STOP: {
        handle: function(context){
            console.log('handle STATE_STOP');
            // context.start();
            // this.request(context);
        },
        request: function(context){
            console.log('request STATE_STOP');
            context.start();
            context.state = GameState.STATE_IDLE;
            if(context.events['ready'])
                context.events.ready();
        }
    },
    STATE_PAUSE: {
        handle: function(context){
            console.log('handle STATE_PAUSE');
            this.request(context);
            // context.start();
            // this.request(context);
        },
        request: function(context){
            console.log('request STATE_PAUSE');
            // context.start();
            context.state = GameState.STATE_ACTIVE;
            if(context.events['continue'])
                context.events.continue();
        }
    }
}

let pools = 0;

let Scene = function (view, objects) {
    this.objects        = objects;
    this.container      = new PIXI.Container();
    this.view           = view;
    this.events         = {};
    this.canvas;
    this.engine;
    this.runner;
    this.state;

    this.pool;
    this.trianglesPoolFirst;
    this.trianglesPoolSecond;

    this.on = (event, callback) => {
        this.events[event] = callback;
    }

    this.handle = () => {
        this.state.handle(this);
    }
    this.request = () => {
        this.state.request(this);
    }

    this.load = (state) => {
        this.state = state;

        this.engine = Matter.Engine.create({renderer: app.renderer});
        this.runner = Matter.Runner.create();
        Matter.Runner.run(this.runner, this.engine);
        this.engine.world.gravity = {x: 0, y: 1};
        this.engine.world.gravity.scale = 0.0001;

        this.objects.triangles.forEach((value) => {
            value.createPhysics();
            value.screenView = this.view;
        });
        this.objects.ball.createPhysics();
        Matter.World.add(this.engine.world, this.objects.ball.body);
        this.objects.triangles.forEach((value)=>{
            Matter.World.add(this.engine.world, value.body);
        });

        var that = this;
        Matter.Events.on(this.engine, 'collisionStart', function (event) {
            if(that.state == GameState.STATE_ACTIVE && that.events['fail']){
                console.log(event.pairs[0].bodyA + event.pairs[0].bodyB);
                that.events.fail();
            }
        });

        this.pool = new Pool();
        this.pool.generatePoints(this.view.width, this.view.height, this.objects.triangles[0].view.width, this.objects.triangles[0].view.height);

        this.objects.triangles.forEach((value) => {
            this.pool.AddObjectInPool(value);
        });
    }

    this.start = () => {
        pools = 0;

        this.objects.ball.limit = {left: 0, right: this.view.width};
        this.objects.ball.Move({
            x: -this.objects.ball.outline,
            y: -this.objects.platform.height / 2 - this.objects.ball.radius + this.objects.ball.outline
        });
        this.objects.platform.Move({x: this.view.width / 2, y: this.view.height * 2 / 3}, 0); // 3/4

        this.pool.GeneratePos();
        this.pool.Activate();
    }

    this.createBunny    = sprite => { return new Bunny(sprite, this.container);}
    this.createPlatform = sprite => { return new Platform(sprite, this.container);}
    this.createBall     = (sprite, container, outline) => { return new Ball(sprite, container, outline);}
    this.createTriangle = (sprite, outline) => {return new Triangle(sprite, this.container, outline);}
    this.addToStage     = stage => { stage.addChild(this.container);}
    this.update         = () => {
        if(this.objects.platform.view.rotation > 0.65){
            this.objects.platform.rotationSpeed *= -1;
        }else if(this.objects.platform.view.rotation < -0.65){
            this.objects.platform.rotationSpeed *= -1;
        }

        this.objects.platform.Rotate();
        this.objects.ball.Translate();

        for (var i = 0; i < this.objects.triangles.length; i++){
            if(this.objects.triangles[i].isActive == true)
                this.objects.triangles[i].Translate();
        }

        this.objects.ball.Update();

        // console.log('pools: ' + pools);
    }
}

let Platform = function (sprite, container) {
    this.view           = sprite;
    this.view.anchor.x  = 0.5;
    this.view.anchor.y  = 0.5;
    this.rotationSpeed  = 0.01;
    this.height = this.view.height;

    container.addChild(this.view);

    this.Move = (pos, angle) => {
        this.view.x = pos.x;
        this.view.y = pos.y;
        this.view.rotation = angle;
    }

    this.Rotate = () => {
        this.view.rotation += this.rotationSpeed;
    }
}

let Ball = function (sprite, container, outline) {
    this.view               = sprite;
    this.view.anchor.x      = 0.5;
    this.view.anchor.y      = 0.5;
    this.translateSpeed     ;//= 8;
    this.radius             = this.view.height / 2;
    this.limit              = {left: '', right: ''};
    this.container          = container;
    this.body;
    this.outline            = outline;

    container.addChild(this.view);

    this.Move = (pos) => {
        this.view.x = pos.x;
        this.view.y = pos.y;
    }
    this.Translate = () => {
        this.view.x += this.translateSpeed;
        if(this.view.worldTransform.tx > this.limit.right + 110){
            this.TeleportLeft();
        }
        else if(this.view.worldTransform.tx < this.limit.left - 110){
            this.TeleportRight();
        }
    }
    this.ChangeTranslateDirection = () => {
        this.translateSpeed *= -1;
    }
    this.TeleportLeft = () => {
        var position    = new PIXI.Point(-this.limit.right/2-100,0);
        var from        = this.container;
        var point       = new PIXI.Point(0,0);

        this.container.toLocal(position, from, point);
        this.view.position.x = point.x;
    }
    this.TeleportRight = () => {
        var position    = new PIXI.Point(this.limit.right/2+100,0);
        var from        = this.container;
        var point       = new PIXI.Point(0,0);

        this.container.toLocal(position, from, point);
        this.view.position.x = point.x;
    }

    this.Update = () => {
        Matter.Body.setPosition(this.body, {x: this.view.worldTransform.tx, y: this.view.worldTransform.ty});
    }

    this.options = {
        // force: {x: 0, y: 0},
        frictionAir: 0.0,
        // friction: 1,
        // inertia: Infinity,
        // isSensor: true,
        // label: this._id,
        // mass: 1,
        // // isModified: true,
        // restitution: 0,
        // gravityScale: 1,
        collisionFilter: {
            // mask: 2//this.category
            // group: 8
            category: 2,
            group: 0,
            mask: 4
        },
        render: {
            fillStyle: '#575375'
        }
    }

    this.createPhysics = () => {
        this.body = Matter.Bodies.circle(this.view.worldTransform.tx, this.view.worldTransform.ty, this.view.width/2, this.options);
    }
}

let Pool = function() {
    this.objects = [];
    this.points = [];


    this.generatePoints = (width, height, itemWidth, itemHeight) => {
        var pointsCountX = width / itemWidth;
        var pointsCountY = height / itemHeight;
        var stepX = itemWidth;
        var stepY = itemHeight;
        for (var i = 0; i < pointsCountX; i++){
            for (var j = 0; j < pointsCountY; j++){
                this.points.push(new Point(stepX * i + stepX/2, - stepY * j - stepY/2));
            }
        }
        // this.points.forEach((point)=>{
        //     console.log(point.x + '; ' + point.y);
        // });
    }

    this.AddObjectInPool = (object) => {
        this.objects.push(object);
        this.UpdatePos(object);
    }

    this.UpdatePos = (object) => {
        var index = this.getRandomInt(0, this.points.length);
        object.on('disable', (object) => {
            object.Move(this.points[index]);
            object.SetActive(true);
        });
    }

    this.GeneratePos = () => {
        var index;

        for (var i = 0; i < this.objects.length; i++){
            index = this.getRandomInt(0, this.points.length);
            this.objects[i].Move(this.points[index]);
        }
    }

    this.getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    this.Activate = () => {
        for (var i = 0; i < this.objects.length; i++){
            this.objects[i].SetActive(true);
        }
    }

    this.Deactivate = () => {
        for (var i = 0; i < this.objects.length; i++){
            this.objects[i].SetActive(false);
        }
    }
    this.DeactivateDefault = () => {
        for (var i = 0; i < this.objects.length; i++){
            this.objects[i].Deactivate();
        }
    }
}

let Point = function (x, y) {
    this.x = x;
    this.y = y;
}

let Triangle = function (sprite, container, outline) {
    this.points = [];
    this.view               = sprite;
    this.view.anchor.x      = 0.5;
    this.view.anchor.y      = 0.5;
    this.translateSpeed;     //= 5;
    this.speed;
    this.container          = container;
    this.screenView;
    this.body;
    this.outline            = outline;
    this.isActive           = false;
    this.events             = {};

    this.reset = () => {

    }

    this.container.addChild(this.view);

    this.on = (event, callback) => {
        this.events[event] = callback;
    }

    this.SetActive = (isActive) => {
        this.isActive = isActive;
        if(isActive == true){
            this.speed = this.getRandomInt(this.translateSpeed / 2, this.translateSpeed);
            this.view.alpha = 0;
        }
        else{
            this.Move({x: this.view.position.x, y : this.view.height - 100});
            if(this.events['disable'])
                this.events.disable(this);
        }
    }
    this.Deactivate = () => {
        this.isActive = false;
    }

    this.Move = (pos) => {
        this.view.x = pos.x;
        this.view.y = pos.y;
        this.UpdatePhysics();
    }

    this.Translate = () => {
        this.view.y += this.speed;
        // if(this.view.y > this.screenView.height + this.view.height){
        //     this.SetActive(false);
        //     // this.Move(this.getNewPos());
        //     // this.SetActive(true);
        // }
        if(this.view.y > this.screenView.height * 3/4){
            this.AlphaTweenHide();
        }
        if(this.view.y > this.view.height/2 && this.view.y < this.screenView.height * 3/4){
            this.AlphaTweenShow();
        }
        this.UpdatePhysics();
    }

    this.AlphaTweenHide = () => {
        // console.log(this.speed);
        if(this.view.alpha - this.speed/100 >= 0)
            this.view.alpha -= this.speed/100;
        else
            this.view.alpha = 0;

        if(this.view.alpha == 0)
            this.SetActive(false);
    }
    this.AlphaTweenShow = () => {
        // console.log(this.speed);
        if(this.view.alpha + this.speed/100 < 1)
            this.view.alpha += this.speed/100;
        else
            this.view.alpha = 1;
    }

    this.getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // this.getNewPos = () => {
    //     return this.points[20];
    // }

    this.UpdatePhysics = () => {
        Matter.Body.setPosition(this.body, this.view.position);
    }

    this.options = {
        // force: {x: 0, y: 0},
        frictionAir: 0.0,
        // friction: 1,
        // inertia: Infinity,
        // isSensor: true,
        // label: this._id,
        // mass: 1,
        // // isModified: true,
        // restitution: 0,
        // gravityScale: 1,
        collisionFilter: {
            category: 4,
            group: 0,
            mask: 2//2
        },
        render: {
            fillStyle: '#575375',
            lineWidth: 0.1,
            strokeStyle: "#cc3838",
            fillStyle: 'transparent'
        },
    }

    this.createPhysics = () => {
        // this.body = Matter.Bodies.circle(this.view.x, this.view.y, this.view.width/2, this.options);
        this.body = Matter.Bodies.polygon(this.view.x, this.view.y, 0, triangleSize, this.options);

        // this.body = Matter.Bodies.fromVertices();
        // this.body = Matter.Bodies.polygon();
        // Matter.Body.setMass(this.body, 1);
        //Matter.Body.update(this.body);
        //Matter.Engine.update();
        console.log(this.body);
        //Matter.Engine.world.gravity.x = 1;
        // Matter.World.addBody(this.body);
    }
}