(function(ns){

	var Sol = function(stage,container) {
		this.initialize(stage,container);
	}
	var p = Sol.prototype;
	p.stage;
	p.container;
	p.bitmapAnimation;

	p.initialize = function(stage,container) {
		this.stage = stage;
		this.container = container;
	}

	p.setupSprite = function(image)
	{
		var spriteSheet = new SpriteSheet({
		    // image to use
		    images: [images], 
		    // width, height & registration point of each sprite
		    frames: {width: 166, height: 166, regX: 83, regY: 83}, 
		    animations: {    
		        shine: [0,3,'shine',3]
		    }
		});

		this.bitmapAnimation = new BitmapAnimation(spriteSheet);
		this.bitmapAnimation.gotoAndPlay('shine');
		this.container.addChild(this.bitmapAnimation);
	}
	ns.Sol = Sol;

}(SuperPai || (SuperPai = {})));
var SuperPai;