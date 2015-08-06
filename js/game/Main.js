(function(ns){

		Main.stage;
		Main.canvas;
		Main.character;
		Main.enemies;
		Main.clouds;
		Main.shirts;
		Main.sol;
		Main.pointsParticle;
		Main.itens;
		Main.wave;
		//
		Main.shapeBlack;
		Main.graphicsBlack;
		Main.containerChar;
		Main.containerEnemies;
		Main.containerParticles;
		Main.containerCloud;
		Main.containerShirts;
		Main.containerPointsParticle;
		Main.containerSol;
		Main.active = true;
		Main.preload;
		Main.isGameOver = false;
		Main.currentFPS = 60;
		Main.STAGE_WIDTH = 841;
		Main.STAGE_HEIGHT = 462;
		
		//
		
		function Main() {
			throw "Main cannot be instantiated";
		}

			
		Main.start = function()
		{
			SuperPai.DOMElements.setup();
			if(!Modernizr.touch){
				SuperPai.Sounds.init(function(){
				//setTimeout(function(){
					Main.setupUI();
					Main.preload = new SuperPai.Preload(function(){
						Main.setupDisplayList();
						Main.init();
					});
					Main.preload.start();
			//	},2000);
				});
			}else {
				Main.setupUI();
				Main.preload = new SuperPai.Preload(function(){
					Main.setupDisplayList();
					Main.init();
				});
				Main.preload.start();
			}
			

		}
		Main.setupUI = function()
		{
			$(document).on('touchmove',function(e) {e.preventDefault();});
			$(document).on('touchstart',function(e) {e.preventDefault();});
			Main.canvas = document.getElementById('mainCanvas');
			Main.stage = new Stage(Main.canvas);
			Touch.enable(Main.stage);
			Ticker.setFPS(60);
			// $(window).blur(function(e) {
			//     // Do Blur Actions Here
			//     if(active)
			//     {
			//     	active = false;
			//     }
			    
			//     console.log('blur')
			// });
			// $(window).focus(function(e) {
			// 	if(!active)
			//     {
			//     	active = true;
			//     }
			//     console.log('focus')
			// });s
		}
		Main.setupDisplayList = function()
		{
			Main.containerChar = new Container();
			Main.containerParticles = new Container();
			Main.containerCloud = new Container();
			Main.containerShirts = new Container();
			Main.containerPointsParticle = new Container();
			Main.containerEnemies = new Container();
			Main.containerSol = new Container();
			Main.graphicsBlack = new Graphics();
			Main.stage.addChild(Main.containerSol);
			Main.stage.addChild(Main.containerCloud);
			Main.stage.addChild(Main.containerShirts);
			Main.stage.addChild(Main.containerParticles);
			Main.stage.addChild(Main.containerEnemies);
			Main.stage.addChild(Main.containerChar);
			Main.stage.addChild(Main.containerPointsParticle);
			Main.graphicsBlack.beginFill('#000000');
			Main.graphicsBlack.drawCircle(0,0,600);
			Main.shapeBlack = new Shape(Main.graphicsBlack);
			Main.shapeBlack.scaleX = Main.shapeBlack.scaleY = 0;
			Main.shapeBlack.x = Main.STAGE_WIDTH/2;
			Main.shapeBlack.y = Main.STAGE_HEIGHT/2;
			Main.stage.addChild(Main.shapeBlack);
			
		}
		Main.init = function()
		{
			Main.isGameOver = false;
			Main.character = new SuperPai.Char(Main.stage,Main.containerChar,Main.containerParticles);
			Main.character.setupSprites(Main.preload.imageById('character'));
			//
			Main.clouds = new SuperPai.Clouds(Main.stage,Main.containerCloud);
			Main.clouds.setupSprites(Main.preload.imageById('clouds'));
			//
			Main.pointsParticle = new SuperPai.PointsParticle(Main.stage,Main.containerPointsParticle); 		
			Main.pointsParticle.setupSprites(Main.preload.imageById('points'));
			//
			Main.shirts = new SuperPai.Shirts(Main.stage,Main.containerShirts,Main.pointsParticle); 		
			Main.shirts.setupSprites(Main.preload.imageById('shirts'));
			//
			Main.enemies = new SuperPai.Enemies(Main.stage,Main.containerEnemies); 		
			Main.enemies.setupSprites(Main.preload.imageById('enemies'));
			//
			Main.sol = new SuperPai.Sol(Main.stage,Main.containerSol); 		
			Main.sol.setupSprites(Main.preload.imageById('sol'));
			//
			Main.itens = new SuperPai.Itens(Main.stage,Main.containerShirts);
			Main.itens.setupSprites(Main.preload.imageById('itens'));
			//
			Main.wave = new SuperPai.Wave(Main.stage,Main.character,Main.shirts,Main.itens,Main.enemies,Main.clouds);
			Ticker.addListener(Main);

			SuperPai.DOMElements.btnJogar.click(function(){
				Main.intro();
				SuperPai.DOMElements.btnJogar.hide();
				SuperPai.DOMElements.cursor(false);
			});
			SuperPai.DOMElements.btnJogar.on('touchend',function(){
				Main.intro();
				SuperPai.DOMElements.btnJogar.hide();
				SuperPai.DOMElements.cursor(false);
			});
		}
		Main.reset = function()
		{
			delete Main.character;
			delete Main.clouds;
			delete Main.pointsParticle;
			delete Main.shirts;
			delete Main.enemies;
			delete Main.sol;
			delete Main.itens;
			delete Main.wave;
			Main.containerChar.removeAllChildren();
			Main.containerParticles.removeAllChildren();
			Main.containerCloud.removeAllChildren();
			Main.containerShirts.removeAllChildren();
			Main.containerPointsParticle.removeAllChildren();
			Main.containerEnemies.removeAllChildren();
			Main.containerSol.removeAllChildren();
			if(!Modernizr.touch) SoundJS.stop('music');
			SuperPai.DOMElements.cursor(true);
			SuperPai.DOMElements.btnJogar.show();
			Main.init();
		}
		Main.gameOver = function()
		{
			Main.isGameOver = true;
			SuperPai.DOMElements.reset();
			Main.enemies.stopAnimations();
			Tween.get(Main.shapeBlack).to({scaleX:1,scaleY:1},1000,createjs.Ease.backIn).call(function(){
				Main.reset();	
			}).to({alpha:0},500).call(function(){
				Main.shapeBlack.scaleX = Main.shapeBlack.scaleY = 0;
				Main.shapeBlack.alpha = 1;
			});
			//
		}
		Main.intro = function()
		{
			Main.character.intro();
		}
		Main.tick = function() 
		{
			if(!Main.isGameOver)
			{
				Main.character.tick();
				Main.wave.tick();
			}
			Main.stage.update();
		}
		ns.Main = Main;

}(SuperPai || (SuperPai = {})));
var SuperPai;