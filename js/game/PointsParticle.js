(function(ns){

	var PointsParticle = function(stage,container) {
		this.initialize(stage,container);
	}
	var p = PointsParticle.prototype;
	p.stage;
	p.container;
	p.point;
	p.pointsPool = [];
	p.points = [];
	p.i;
	p.bitmapAnimation;
	p.maxPoints = 50;
	p.domElements;
	p.valuePoints = [20,15,12,10];

	p.initialize = function(stage,container) {
		this.stage = stage;
		this.container = container;
		this.domElements = {};
		for (var i = 0; i < this.valuePoints.length; i++)
		{
			this.domElements[this.valuePoints[i]] = i; 
		};
	}
	p.setupSprites = function(images)
	{
		var spriteSheet = new SpriteSheet({
		    // image to use
		    images: [images], 
		    // width, height & registration point of each sprite
		    frames: {width: 25, height: 17, regX: 12, regY: 8}, 
		    animations: {    
		        points10: [0],
		        points12: [1],
		        points15: [2],
		        points20: [3]
		    }
		});

		this.bitmapAnimation = new BitmapAnimation(spriteSheet);
//		this.bitmapAnimation.gotoAndPlay("points");
		this.createPool(this.maxPoints);
	}
	p.addPoint = function(x,y,numPoints)
	{
		var self = this;
		this.point = this.getPoint();
		this.point.bitmapAnimation.gotoAndStop('points'+numPoints);
		this.point.bitmapAnimation.alpha = 1;
		this.point.bitmapAnimation.x = x;
		this.point.bitmapAnimation.y = y;
		this.point.bitmapAnimation.scaleX = this.point.bitmapAnimation.scaleY = 0;
		this.container.addChild(this.point.bitmapAnimation);
		Tween.get(this.point.bitmapAnimation).to({scaleX:1,scaleY:1},300,Ease.backOut).to({scaleX:0,scaleY:0,alpha:0},300,Ease.circInOut).call($.proxy(this.finishedTween,this,this.point));

		SuperPai.DOMElements.hitShirtPainel(this.domElements[numPoints])
	}
	p.finishedTween = function(point){
		this.returnPoint(point);
		this.container.removeChild(point.bitmapAnimation);
	}

	p.createPool = function(number) 
	{
		for (var i = 0; i < number; i++) 
		{
			this.createPoint();
		};
	}
	p.createPoint = function() 
	{
		this.point = {};
		this.point.bitmapAnimation = this.bitmapAnimation.clone();
		this.pointsPool.push(this.point);
	}

	p.getPoint = function()
	{
		if(this.pointsPool.length == 0)
		{
			this.createPoint();
		}
		return this.pointsPool.shift();
	}
	p.returnPoint = function(point) 
	{
		this.pointsPool.push(point);
	}
	ns.PointsParticle = PointsParticle;

}(SuperPai || (SuperPai = {})));
var SuperPai;