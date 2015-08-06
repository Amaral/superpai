(function(ns){

	var Wave = function(stage,character,shirts,items,enemies,clouds) 
	{
		this.initialize(stage,character,shirts,items,enemies,clouds);
	}
	var p = Wave.prototype;
	p.stage;
	p.items;
	p.shirts;
	p.character;
	p.enemies;
	p.clouds;
	p.countTimer = 0;
	p.countWave = 0;
	p.maxVel = 8;
	p.velWave = 0;
	p.countIncreaseSpeed = 0;
	p.speed = 40;
	p.countPowerMagnet = 0;
	p.countPowerInvincible = 0;
	//
	p.isMagnet = false;
	p.isInvincible = false;
	//
	p.collectedShirts = 0;
	p.totalPoints = 0;
	p.collectedItens;


	p.initialize = function(stage,character,shirts,items,enemies,clouds) 
	{
		this.stage = stage;
		this.character = character;
		this.shirts = shirts;
		this.items = items;
		this.enemies = enemies;
		this.clouds = clouds;
		this.collectedItens = [];
	}
	p.addWave = function()
	{
		var posGrid = this.shirts.addShirts();
		this.items.addItem(posGrid);
		this.enemies.addEnemies();
		this.clouds.addClouds();
		this.countWave++;
		this.countIncreaseSpeed++;
		if(this.countIncreaseSpeed > 10)
		{
			this.increaseSpeed();
			this.countIncreaseSpeed = 0;
		}
		
	}
	p.increaseSpeed = function()
	{
		if(!SuperPai.Main.isGameOver)
		{
			if(this.velWave < this.maxVel)
			{
				this.items.speedY++;
				this.shirts.speedY++;
				this.clouds.speedY++;
				this.enemies.speedX++;
				SuperPai.Particles.speedY++;
				this.velWave++;
				this.speed-=3;
			}else 
			{
				console.log('maxSpeed');
			}
		}
	}
	p.collectItems = function()
	{
		var item;
		//
		for (var i = this.items.getItensOnScreen().length - 1; i >= 0; i--) {
			item = this.items.getItensOnScreen()[i];

			if(this.character.checkCollision(item))
			{
				this.collectedItens.push(item.kind);
				this.items.collectItem(i,item);
				if(item.kind == 'fish')
				{
					this.powerUpMagnet();
				}else 
				{

					this.powerUpInvincible();
				}
			}
		}
	}
	p.collectShirts = function()
	{
		var shirt;
		//
		for (var i = this.shirts.getShirtsOnScreen().length - 1; i >= 0; i--) {
			shirt = this.shirts.getShirtsOnScreen()[i];

			if(this.character.checkCollision(shirt))
			{
				this.collectedShirts++;

				if(!Modernizr.touch) SoundJS.play('shirt',SoundJS.INTERRUPT_NONE,0,0,0,0.2);
				this.shirts.collectShirt(i,shirt);
				this.totalPoints += shirt.pointValue;
				SuperPai.DOMElements.setPoints(this.totalPoints);
			}
		};
	}
	p.checkEnemies = function()
	{
		var enemy;
		//

		for (var i = this.enemies.getEnemiesOnScreen().length - 1; i >= 0; i--) {
			enemy = this.enemies.getEnemiesOnScreen()[i];

			if(this.character.checkCollision(enemy))
			{	

				if(this.isInvincible) 
				{
					//console.log('die bird')
					this.enemies.removeEnemy(i,enemy);
				} 
				else 
				{
					SuperPai.Main.gameOver();
					//console.log('die pai');	
				}
			
			}
		};
	}
	p.powerUpMagnet = function()
	{
		this.isMagnet = true;
		this.countPowerMagnet = 0;
		if(!Modernizr.touch) SoundJS.play('fish',SoundJS.INTERRUPT_NONE,0,0,0);
		this.shirts.powerMagnet();
		if(!this.isInvincible)
		{
			this.character.powerMagnet();
		}
		
	}
	p.offPowerUpMagnet = function()
	{
		if(this.isInvincible)
		{
			this.character.powerInvincible();
		}else
		{
			this.character.powerOff();
		}
		
		this.isMagnet = false;
		this.shirts.offPowerMagnet();
		
	}
	p.powerUpInvincible = function()
	{
		this.countPowerInvincible = 0;
		this.isInvincible = true;
		this.character.powerInvincible();
		if(!Modernizr.touch) SoundJS.play('head',SoundJS.INTERRUPT_NONE,0,0,0);
	}
	p.offPowerUpInvincible = function()
	{
		if(this.isMagnet)
		{
			this.character.powerMagnet();
		}else
		{
			this.character.powerOff();
		}
		
		this.isInvincible = false;
	}
	p.tick = function()
	{
		if(this.countTimer > this.speed)
		{
			this.addWave();
			this.countTimer = 0;
		}
		if(this.isMagnet)
		{
			if(this.countPowerMagnet < 300)
			{
				this.countPowerMagnet++;	
			}
			else
			{
				this.offPowerUpMagnet();
			}
		}
		if(this.isInvincible)
		{
			if(this.countPowerInvincible < 300)
			{
				this.countPowerInvincible++;	
			}
			else 
			{
				this.offPowerUpInvincible();
			}
		}
		if(!this.character.initStage) 
		{
			this.collectShirts();
			this.collectItems();
			this.checkEnemies();
			this.shirts.tick();
			this.items.tick();
			this.enemies.tick();
			this.countTimer++;
		}
		if(this.character.startFlying){

			this.clouds.tick();
		}
	}
	
	ns.Wave = Wave;

}(SuperPai || (SuperPai = {})));
var SuperPai;