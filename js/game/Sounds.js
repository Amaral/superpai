(function(ns){

	Sounds.callBackComplete;
	Sounds.queue;
	Sounds.isComplete = false;

	function Sounds() {
		throw "Sounds cannot be instantiated";
	}

	Sounds.init = function(callBackComplete)
	{
		Sounds.callBackComplete = callBackComplete;
		//SUPERPAI_dia_200k.mp3
		var assetsPath = "assets/sounds/";
		Sounds.queue = new PreloadJS();
		Sounds.queue.installPlugin(SoundJS); // Plug in SoundJS to handle browser-specific paths
		Sounds.queue.onFileError = Sounds.handleFileError;
		Sounds.queue.onProgress = Sounds.handleProgress;
		Sounds.queue.setMaxConnections(1);
		Sounds.queue.loadFile({src:assetsPath+"trilha.mp3|"+assetsPath+"trilha.ogg", id:"music"}, true);
		Sounds.queue.loadFile({src:assetsPath+"shirt.mp3|"+assetsPath+"shirt.ogg", id:"shirt",data:4}, true);
		Sounds.queue.loadFile({src:assetsPath+"startfly.mp3|"+assetsPath+"startfly.ogg", id:"startfly"}, true);
		Sounds.queue.loadFile({src:assetsPath+"head.mp3|"+assetsPath+"head.ogg", id:"head"}, true);
		Sounds.queue.loadFile({src:assetsPath+"gameover.mp3|"+assetsPath+"gameover.ogg", id:"gameover"}, true);
		Sounds.queue.loadFile({src:assetsPath+"fish.mp3|"+assetsPath+"fish.ogg", id:"fish"}, true);
		

	}

	Sounds.stop = function() {
		// if (queue != null) { queue.cancel(); }
		// SoundJS.stop();
	}

	Sounds.handleFileError = function(o) {
		// An error occurred.
		
	}

	Sounds.handleProgress = function(event) {
		// Progress happened.
		if(Sounds.queue.progress.toFixed(2) * 100 == 100){
			if(!Sounds.isComplete){
				Sounds.isComplete  = true;
				Sounds.callBackComplete();
			}
		}
		//displayStatus.innerText = "Loading: " + (queue.progress.toFixed(2) * 100) + "%";
	}



	Sounds.playSound = function(name, loop) {
		// Play the sound using the ID created above.
		return SoundJS.play(name,SoundJS.INTERRUPT_NONE,0,0,-1);
	}
	ns.Sounds = Sounds;

}(SuperPai || (SuperPai = {})));
var SuperPai;