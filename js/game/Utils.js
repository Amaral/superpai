(function(window){

	var Utils = function(arguments) {
		this.initialize(arguments);
	}
	var p = Utils.prototype;

	p.initialize = function(arguments) {
		// body
	}
	Utils.shuffleArray = function(v){
	    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
	    return v;
	};
	window.Utils = Utils;

}(window));