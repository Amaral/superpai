(function(ns){

	var DOMElements = function() {
		throw "DOMElements cannot be instantiated";
	}
	/**
	 * Points Display
	 * @property pointsDisplay
	 * @type jquery selector
	 **/
	DOMElements.pointsDisplay;
	/**
	 * Array Shirts Display
	 * @property shirtsCollection
	 * @type Array of jquery selectors;
	 **/
	DOMElements.shirtsCollection;
	DOMElements.canvas;
	DOMElements.btnJogar;

	DOMElements.setup = function()
	{
		DOMElements.pointsDisplay = $('.points');
		DOMElements.canvas = $('.game');
		DOMElements.btnJogar = $('.btnJogar');
		DOMElements.btnJogar.css('top',(SuperPai.Main.STAGE_HEIGHT-DOMElements.btnJogar.height())/2);
		DOMElements.btnJogar.css('left',(SuperPai.Main.STAGE_WIDTH-DOMElements.btnJogar.width())/2);
		DOMElements.shirtsCollection = [];
		var aux = $('.shirtsCatchContainer').find('.shirtsCatch');
		for (var i = 0; i < aux.length; i++) {
			DOMElements.shirtsCollection.push($(aux[i]).data('dummy',{value:0})); 
		};
	}
	DOMElements.cursor = function(val)
	{
		if(val)
		{
			DOMElements.canvas.css('cursor','pointer');
		}else
		{
			DOMElements.canvas.css('cursor','none');
		}
	}
	DOMElements.setPoints = function(points)
	{
		DOMElements.pointsDisplay.html(points);
	}
	DOMElements.setPoints = function(points)
	{
		DOMElements.pointsDisplay.html(points);
	}
	DOMElements.hitShirtPainel = function(id){
		var dom = DOMElements.shirtsCollection[id];
		dom.data('dummy').value = parseInt(dom.css('backgroundSize'));
		if(!TweenMax.isTweening(dom.data('dummy')))
		{
			TweenMax.to(dom.data('dummy'),0.3,{value:100,onUpdate:function(){
				var thevalue = dom.data('dummy').value +'%'
				//dom.css('backgroundPosition',thevalue +' '+thevalue);
				dom.css('backgroundSize',thevalue);
			}});
			TweenMax.to(dom.data('dummy'),0.3,{value:0,onUpdate:function(){
				var thevalue = dom.data('dummy').value +'%'
				//dom.css('backgroundPosition',thevalue +' '+thevalue);
				dom.css('backgroundSize',thevalue);
			},delay:0.3});
		}
	} 
	DOMElements.reset = function(){
		DOMElements.setPoints(0);
	}
	
	ns.DOMElements = DOMElements;

}(SuperPai || (SuperPai = {})));
var SuperPai;