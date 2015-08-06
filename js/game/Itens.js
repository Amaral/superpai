(function(ns){

	var Itens = function(stage,container) {
		this.initialize(stage,container);
	}
	var p = Itens.prototype;
	p.bitmapAnimation;
	p.stage;
	p.container;
	p.speedY = 5;
	p.item;
	p.items;
	p.itensName = ['fish','head'];
	p.hitWidth = 43;
	p.hitHeight = 36;

	p.initialize = function(stage,container) {
		this.items = [];
		this.stage = stage;
		this.container = container;
	}

	p.setupSprites = function(images)
	{
		var spriteSheet = new SpriteSheet({
		    // image to use
		    images: [images], 
		    // width, height & registration point of each sprite
		    frames: {width: 43, height: 36, regX: 22, regY: 18}, 
		    animations: {    
		        fish: [0,3,'fish',5],
		        head: [4]
		    }
		});
		this.bitmapAnimation = new BitmapAnimation(spriteSheet);
		
	}
	p.addItem = function(posX)
	{
		var percAdd = Math.ceil(Math.random()*14);
		
		if(percAdd == 1)
		{
			this.createItem();
			var rdm = Math.round(Math.random()*1);

			this.item.bitmapAnimation.gotoAndStop(this.itensName[rdm]);

			this.item.kind = this.itensName[rdm];
			this.item.bitmapAnimation.y = -30 - Math.random() * 50;
			this.item.bitmapAnimation.x = posX;
			this.item.eixoX = this.item.bitmapAnimation.x;
			this.item.hitWidth = this.hitWidth;
			this.item.hitHeight = this.hitHeight;
			this.items.push(this.item);
			this.container.addChild(this.item.bitmapAnimation);
		}
	}
	p.createItem = function() 
	{
		this.item = {};
		this.item.bitmapAnimation = this.bitmapAnimation.clone();
	}
	p.tick = function()
	{
		var paralaxX = 0;//Math.round((this.stage.mouseX-480)/980 * 2 * -6);
		for (var i = this.items.length - 1; i >= 0; i--) {
			this.item = this.items[i];
			this.item.bitmapAnimation.y += this.speedY;
			this.item.bitmapAnimation.x = this.item.eixoX + paralaxX;
					
			if(this.item.bitmapAnimation.y > 530)
			{
				this.removeItem(this.i,this.item);
			}
		}
	}
	p.collectItem = function(i,item)
	{
		this.removeItem(i,item);
	}
	p.removeItem = function(i,item)
	{
		this.container.removeChild(item.bitmapAnimation);
		this.items.splice(i,1);
	}
	p.getItensOnScreen = function()
	{
		return this.items;
	}
	ns.Itens = Itens;

}(SuperPai || (SuperPai = {})));
var SuperPai;