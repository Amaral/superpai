(function(ns){

	var PoolObject = function() {

	}
	var p = PoolObject.prototype;

	/**
	 * The pool objects Array;
	 * @property pool;
	 * @type array
	 **/
	p.pool;
	/**
	 * function to create objects, returns the object
	 * @property createObject;
	 * @type function
	 **/
	p.createObject;

	p.createPool = function(number,createObject) 
	{
		this.pool = [];
		this.createObject = createObject;
		for (var i = 0; i < number; i++) 
		{
			this.pool.push(this.createObject());
		};
	}
	p.getObject = function()
	{
		if(this.pool.length == 0)
		{
			this.pool.push(this.createObject());
		}
		return this.pool.shift();
	}
	p.returnObject = function(pool) 
	{
		this.pool.push(pool);
	}

	ns.PoolObject = PoolObject;

}(Utils || (Utils = {})));
var Utils;