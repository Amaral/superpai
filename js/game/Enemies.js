(function(ns){
	
	var Enemies = function(stage,container) {
		this.initialize(stage,container);
	}
	var p = Enemies.prototype = new Utils.PoolObject();
	p.stage;
	p.container;
	p.enemies;
	p.bitmapAnimation;
	p.maxEnemies = 20;
	p.directions = ['left','right'];
	p.speedX = 5;
	p.gridPositions;
	p.enemiesPerWave = 1;
	p.hitWidth = 30;
	p.hitHeight = 10;

	p.initialize = function(stage,container) 
	{
		this.stage = stage;
		this.container = container;
		this.enemies = [];
		this.gridPositions = [];
		var totPositions = Math.round((SuperPai.Main.STAGE_HEIGHT-22)/44);
		for (var i = 0; i < totPositions; i++) {
			this.gridPositions[i] = Math.round(22 + i*44);
		};
	}
	p.setupSprites = function(images)
	{
		var spriteSheet = new SpriteSheet({
		    // image to use
		    images: [images], 
		    // width, height & registration point of each sprite
		    frames: {width: 44, height: 43, regX: 22, regY: 22}, 
		    animations: {    
		        bird_right: [0,3,'bird_right',3],
		        bird_left: [4,7,'bird_left',3]
		    }
		});

		this.bitmapAnimation = new BitmapAnimation(spriteSheet);
		this.createPool(this.maxEnemies,this.createEnemy);
		
	}

	p.addEnemies = function()
	{
		if(this.enemies.length < this.maxEnemies)
		{
			var posGrid = this.gridPositions.slice(0);
			Utils.shuffleArray(posGrid);
			for (var i = 0; i < this.enemiesPerWave; i++) {
				this.setupEnemies(posGrid[i]);
			};	
		}
	}
	p.setupEnemies = function(posY)
	{
		this.enemy = this.getObject();
		this.enemy.bitmapAnimation.y = posY//22 + Math.round(Math.random() * 478);
		this.enemy.ang = 0;
		var rdm = Math.round(Math.random()*1);
		this.enemy.direction = this.directions[rdm];
		if(this.enemy.direction == 'left')
		{
			this.enemy.bitmapAnimation.gotoAndPlay('bird_left');
			this.enemy.bitmapAnimation.x = -22;	
		}else {
			this.enemy.bitmapAnimation.gotoAndPlay('bird_right');
			this.enemy.bitmapAnimation.x = SuperPai.Main.STAGE_WIDTH + 44;
		}
		this.enemy.eixoY = this.enemy.bitmapAnimation.y;
		this.enemy.hitWidth = this.hitWidth;
		this.enemy.hitHeight = this.hitHeight;
		this.enemies.push(this.enemy);
		this.container.addChild(this.enemy.bitmapAnimation);
	}


	p.createEnemy = function() 
	{
		this.enemy = {};
		this.enemy.bitmapAnimation = this.bitmapAnimation.clone();
		return this.enemy;
	}

	
	p.removeEnemy = function(i,enemy)
	{
		this.returnObject(enemy);
		this.container.removeChild(enemy.bitmapAnimation);
		this.enemies.splice(i,1);
	}
	p.tick = function()
	{
		for (var i = this.enemies.length - 1; i >= 0; i--) {
			this.enemy = this.enemies[i];
			if(this.enemy.direction == 'left')
			{
				this.enemy.bitmapAnimation.x += this.speedX;

				if(this.enemy.bitmapAnimation.x - 22 > SuperPai.Main.STAGE_WIDTH)
				{
					this.removeEnemy(i,this.enemy);
				}
			}
			else 
			{
				this.enemy.bitmapAnimation.x -= this.speedX;
				
				if(this.enemy.bitmapAnimation.x + 22 < 0)
				{
					this.removeEnemy(i,this.enemy);
				}
			}
		};
	}
	p.getEnemiesOnScreen = function()
	{
		return this.enemies;
	}
	p.stopAnimations = function()
	{
		for (var i = this.enemies.length - 1; i >= 0; i--) 
		{
			this.enemy = this.enemies[i];
			this.enemy.bitmapAnimation.stop();
		}
	}
	ns.Enemies = Enemies;

}(SuperPai || (SuperPai = {})));
var SuperPai;