(function(ns){

	var Shirts = function(stage,container,pointsParticle) {
		this.initialize(stage,container,pointsParticle);
	}
	var p = Shirts.prototype = new Utils.PoolObject();
	p.stage;
	p.container;
	p.shirt;
	p.shirts;
	p.bitmapAnimation;
	p.i;
	p.speedY = 5;
	p.maxShirts = 100;
	p.gridPositions;
	p.magnet = false;
	p.pointsValues = [20,15,12,10];
	p.hitWidth = 42;
	p.hitHeight = 37;
	p.pointsParticle;


	p.initialize = function(stage,container,pointsParticle) {
		this.stage = stage;
		this.container = container;
		this.pointsParticle = pointsParticle;
		this.shirts = [];
		this.gridPositions = [];
		var totPositions = Math.floor((SuperPai.Main.STAGE_WIDTH-23)/60);
		for (var i = 0; i < totPositions; i++) {
			this.gridPositions[i] = Math.round(23 + i*60);
		};
	}
	
	p.setupSprites = function(images)
	{
		var spriteSheet = new SpriteSheet({
		    // image to use
		    images: [images], 
		    // width, height & registration point of each sprite
		    frames: {width: 48, height: 53, regX: 24, regY: 26}, 
		    animations: {    
		        shirt0: [0],
		        shirt1: [1],
		        shirt2: [2],
		        shirt3: [3]
		    }
		});
		this.bitmapAnimation = new BitmapAnimation(spriteSheet);
		this.createPool(this.maxShirts,this.createShirt);
	}
	p.addShirts = function()
	{
		if(this.shirts.length < this.maxShirts)
		{
			var posGrid = this.gridPositions.slice(0);
			Utils.shuffleArray(posGrid);
			var tot = 5;
			for (var i = 0; i < tot; i++) {
				this.setupShirts(posGrid[i]);
			};
		}

		return posGrid[tot];
	}
	p.setupShirts = function(posX)
	{
		this.shirt = this.getObject();
		var rdm = Math.round(Math.random()*3);
		this.shirt.bitmapAnimation.gotoAndStop('shirt'+rdm);
		this.shirt.pointValue = this.pointsValues[rdm];
		this.shirt.bitmapAnimation.y = -30 - Math.random() * 50;
		this.shirt.bitmapAnimation.x = posX;
		this.shirt.hitWidth = this.hitWidth;
		this.shirt.hitHeight = this.hitHeight;
		this.shirt.moveX = 0;
		this.shirt.moveY = 0;
		this.shirt.eixoX = this.shirt.bitmapAnimation.x;
		this.shirts.push(this.shirt);
		this.container.addChild(this.shirt.bitmapAnimation);
	}
	p.tick = function() 
	{
		var paralaxX = 0//Math.round((this.stage.mouseX-(Main.STAGE_WIDTH/2))/Main.STAGE_WIDTH * 2 * -6);
		for (this.i = this.shirts.length - 1; this.i >= 0; this.i--) {
			this.shirt = this.shirts[this.i];
			
			if(!this.magnet)
			{
				this.shirt.bitmapAnimation.y += this.speedY;
				this.shirt.bitmapAnimation.x = this.shirt.eixoX + paralaxX;
			}else
			{
				this.follow(this.shirt);
			}
				
			if(this.shirt.bitmapAnimation.y > SuperPai.Main.STAGE_HEIGHT+30)
			{
				this.removeShirt(this.i,this.shirt);
			}
		}
	}


	p.follow = function (shirt) {
		var turnRate = 3;
		var missileSpeed = 5 + this.speedY;
			//get distance between follower and target
		var distanceX = this.stage.mouseX - shirt.bitmapAnimation.x;
		var distanceY = this.stage.mouseY - shirt.bitmapAnimation.y;
		
		//get total distance as one number
		var distanceTotal = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
		
		//calculate how much to move
		var moveDistanceX = turnRate * distanceX / distanceTotal;
		var moveDistanceY = turnRate * distanceY / distanceTotal;
		
		//increase current speed
		shirt.moveX += moveDistanceX;
		shirt.moveY += moveDistanceY;
			
		//get total move distance
		var totalmove = Math.sqrt(shirt.moveX * shirt.moveX + shirt.moveY * shirt.moveY);
		
		//apply easing
		shirt.moveX = missileSpeed*shirt.moveX/totalmove;
		shirt.moveY = missileSpeed*shirt.moveY/totalmove;
		
		//move follower
		shirt.bitmapAnimation.x += shirt.moveX;
		shirt.bitmapAnimation.y += shirt.moveY;
		shirt.eixoX = shirt.bitmapAnimation.x;
	
	}
	p.collectShirt = function(i,shirt)
	{
	
		this.pointsParticle.addPoint(shirt.bitmapAnimation.x,shirt.bitmapAnimation.y,shirt.pointValue);
		this.removeShirt(i,shirt);
	}

	p.removeShirt = function(i,shirt)
	{
		this.returnObject(shirt);
		this.container.removeChild(shirt.bitmapAnimation);
		this.shirts.splice(i,1);
	}

	p.createShirt = function() 
	{
		this.shirt = {};
		this.shirt.bitmapAnimation = this.bitmapAnimation.clone();
		return this.shirt;
	}

	p.getShirtsOnScreen = function()
	{
		return this.shirts;
	}
	p.powerMagnet = function()
	{
		this.magnet = true;
	}
	p.offPowerMagnet = function()
	{
		this.magnet = false;
	}
	ns.Shirts = Shirts;

}(SuperPai || (SuperPai = {})));
var SuperPai;