(function(ns){

	var Clouds = function(stage,container) {
		this.initialize(stage,container);
	}
	var p = Clouds.prototype = new Utils.PoolObject();
	p.stage;
	p.container;
	p.bitmapAnimation;
	p.cloud;
	p.clouds;
	p.maxClouds = 20;
	p.i;
	p.speedY = 2;
	p.numberAdd = 1;

	p.initialize = function(stage,container) 
	{
		this.stage = stage;
		this.container = container;
		this.clouds = [];
	}
	p.setupSprites = function(images)
	{
		var spriteSheet = new SpriteSheet({
		    // image to use
		    images: [images], 
		    // width, height & registration point of each sprite
		    frames: {width: 120, height: 29, regX: 60, regY: 15}, 
		    animations: {    
		        cloud0: [0, 0, "cloud0"],
		        cloud1: [1, 1, "cloud1"]
		    }
		});
		this.bitmapAnimation = new BitmapAnimation(spriteSheet);
		this.createPool(this.maxClouds,this.createCloud);
		this.setupCloud(100,100);
		this.setupCloud(300,200);
		this.setupCloud(600,100);
		this.setupCloud(700,50);
	}
	
	p.setupCloud = function(x,y)
	{
		this.cloud = this.getObject();
		var rdm = Math.round(Math.random()*1);
		this.cloud.bitmapAnimation.gotoAndPlay('cloud'+rdm);
		this.cloud.bitmapAnimation.y = y;
		this.cloud.bitmapAnimation.x = x;
		this.cloud.eixoX = this.cloud.bitmapAnimation.x;
		this.clouds.push(this.cloud);
		this.container.addChild(this.cloud.bitmapAnimation);
	}
	p.tick = function() 
	{		
		var paralaxX = 0//Math.round((this.stage.mouseX-(Main.STAGE_WIDTH/2))/Main.STAGE_WIDTH * 2 * -10);
		for (this.i = this.clouds.length - 1; this.i >= 0; this.i--) {
			this.cloud = this.clouds[this.i];
			this.cloud.bitmapAnimation.y += this.speedY;
			//this.cloud.bitmapAnimation.x = this.cloud.eixoX + paralaxX;
			if(this.cloud.bitmapAnimation.y > SuperPai.Main.STAGE_HEIGHT+30){
				this.removeCloud(this.i,this.cloud);
			}
		}
	}
	p.addClouds = function(){
		if(this.clouds.length < this.maxClouds)
		{
			for (var i = 0; i < this.numberAdd; i++) {
				this.setupCloud(Math.random() * SuperPai.Main.STAGE_WIDTH - 100,-30 - Math.random() * 100);
			}
		}
	}
	p.createCloud = function() 
	{
		this.cloud = {};
		this.cloud.bitmapAnimation = this.bitmapAnimation.clone();
		return this.cloud;
	}
	p.removeCloud = function(i,cloud)
	{
		this.returnObject(cloud);
		this.container.removeChild(cloud.bitmapAnimation);
		this.clouds.splice(i,1);
	}
	ns.Clouds = Clouds;

}(SuperPai || (SuperPai = {})));
var SuperPai;