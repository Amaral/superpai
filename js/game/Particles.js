(function(ns){

	var Particles = function(stage,container,color) {
		this.initialize(stage,container,color);
	}
	var p = Particles.prototype = new Utils.PoolObject();

	p.particle;
	p.g;
	p.particles;
	p.shape;
	p.stage;
	p.i = 0;
	p.maxPool = 2;
	p.maxParticles = 100;
	p.container;
	p.paused = false;
	p.color;
	Particles.speedY = 5;
	Particles.speedX = 5;
	p.type = 1;

	p.initialize = function(stage,container,color) 
	{
		Particles.speedY = 5;
		Particles.speedX = 5;
		this.color = color;
		this.stage = stage;
		this.container = container;
		this.g = new Graphics();
		this.g.beginFill(color).rect(-1,-1,2,2).endFill();
		this.particle = {};
		this.particles = [];
		this.createPool(this.maxParticles,this.createParticle);
		
	}
	p.pause = function()
	{
		this.paused = true;
	}
	p.resume = function()
	{
		this.paused = false;
	}
	// p.createPool = function(number) 
	// {
	// 	for (var i = 0; i < number; i++) 
	// 	{
	// 		this.createParticle();
	// 	};
	// }
	p.createParticle = function() 
	{
		this.shape = new Shape(this.g);
		this.particle = {};
		this.particle.shape = this.shape;
		return this.particle;
	}
	p.setupParticle = function(posX,posY)
	{
		this.particle = this.getObject();
		this.particle.shape.alpha = 0;
		this.particle.shape.x = posX  + 15 - Math.random()*30;
		this.particle.shape.y = posY + Math.random()*70;
		this.particle.init = false;
		this.particle.range = 0;
		this.particle.angleSpeed = 3 + Math.random()*5;
		this.particle.rangeSpeed = 0.2 + Math.random()*1;
		this.particle.eixoX = this.particle.shape.x;
		this.particle.eixoY = this.particle.shape.y;
		this.particle.angle = Math.random()*360;
		this.particle.speedY = 5//1 + Math.random() * 5;
		//this.particle.shape.scaleX = this.particle.shape.scaleY = Math.random()*1;
		this.particle.alphaSpeedOut = 0.05 + Math.random() * 0.05;
		this.particles.push(this.particle);
		this.container.addChild(this.particle.shape);
	}

	p.tick = function(posX,posY)
	{
		if(!this.paused){
			if(this.particles.length + this.maxPool < this.maxParticles)
			{
				for(this.i = 0; this.i < this.maxPool; this.i++){
					this.setupParticle(posX,posY);
				}
			}	
		}
		for (this.i = this.particles.length - 1; this.i >= 0; this.i--) 
		{
			this.particle = this.particles[this.i];

			if(this.type == 0)
			{
				this.particle.shape.y += Particles.speedY//this.particle.speedY; 
				this.particle.shape.x = Math.sin( this.particle.angle * Math.PI/180) * this.particle.range + this.particle.eixoX;
				//this.particle.shape.scaleX = Math.cos( this.particle.angle * Math.PI/180) * 2 + 1;
				//this.particle.shape.scaleY = this.particle.shape.scaleX;
				this.particle.range += this.particle.rangeSpeed;

				if(!this.particle.init) 
				{
					this.particle.shape.alpha += 0.05;
					if(this.particle.shape.alpha > 1){
						this.particle.shape.alpha = 1;
						this.particle.init = true;
					}
				}else {
					this.particle.shape.alpha += - this.particle.alphaSpeedOut;
					if(this.particle.shape.alpha < 0){
						this.removeParticle(this.i,this.particle);
					}
				}
				this.particle.angle += this.particle.angleSpeed;
			}
			else if(this.type == 1)
			{

				this.particle.shape.y -= 2//this.particle.speedY; 
				this.particle.shape.x = Math.sin( this.particle.angle * Math.PI/180) * this.particle.range + this.particle.eixoX;
				this.particle.shape.scaleX = Math.cos( this.particle.angle * Math.PI/180) * 2 ;
				this.particle.shape.scaleY = this.particle.shape.scaleX;
				this.particle.range = 30;

				if(!this.particle.init) 
				{
					this.particle.shape.alpha += 0.1;
					if(this.particle.shape.alpha > 1){
						this.particle.shape.alpha = 1;
						this.particle.init = true;
					}
				}else {
					this.particle.shape.alpha += - 0.1;
					if(this.particle.shape.alpha < 0){
						this.removeParticle(this.i,this.particle);
					}
				}
				this.particle.angle += 5//this.particle.angleSpeed;
			}
		};
	}
	p.removeParticle = function(i,particle)
	{
		this.returnObject(particle);
		this.container.removeChild(particle.shape);
		this.particles.splice(i,1);
	}
	ns.Particles = Particles;

}(SuperPai || (SuperPai = {})));
var SuperPai;