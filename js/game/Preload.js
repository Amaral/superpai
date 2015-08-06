(function(ns){

	var Preload = function(onCompleteCallback) {
		this.initialize(onCompleteCallback);
	}
	var p = Preload.prototype;
	p.countLoaded = 0;
	p.perc;
	p.onCompleteCallback;
	p.assets = [
		item = {
			path:'assets/char.png',
			id:'character',
			img: null
		},
		item = {
			path:'assets/clouds.png',
			id:'clouds',
			img: null
		},
		item = {
			path:'assets/shirts.png',
			id:'shirts',
			img: null
		},
		item = {
			path:'assets/points.png',
			id:'points',
			img: null
		},
		item = {
			path:'assets/enemies.png',
			id:'enemies',
			img: null
		},
		item = {
			path:'assets/sol.png',
			id:'sol',
			img: null
		},
		item = {
			path:'assets/itens.png',
			id:'itens',
			img: null
		}
	];

	p.initialize = function(onCompleteCallback) {
		this.onCompleteCallback = onCompleteCallback;
	}
	p.start = function() 
	{
		this.loadImage();
	}
	p.loadImage = function()
	{
		var self = this;
		
		if(this.countLoaded < this.assets.length)
		{
			var img = new Image();
			$(img).load(function()
			{
				self.assets[self.countLoaded].img = this;
				self.countLoaded++;
				self.loadImage();
			});
			img.src = this.assets[this.countLoaded].path;
		}else 
		{	
			this.onCompleteCallback();
		}
	}
	p.imageById = function(id)
	{
		var image;
		for (var i = 0; i < this.assets.length; i++) {
			image = this.assets[i];
			if(image.id == id)
			{
				return image.img;
			}
		};
	}

	ns.Preload = Preload;

}(SuperPai || (SuperPai = {})));
var SuperPai;