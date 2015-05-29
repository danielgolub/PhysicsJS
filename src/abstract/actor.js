/**
 * Actor abstract definition
 */

/**
 * Actor of the world (object point)
 * @param {string}	unique		 unique identifier to create visual
 * @param {Mass}	mass		 mass of the actor
 * @param {array} 	forces	 	 array of type Vector
 * @param {array} 	position 	 array of type int [x, y]
 * @param {array} 	acceleration array of type int [x, y]
 * @param {array} 	velocity 	 array of type int [x, y]
 * @throws 			If 			 mass parameter is not of instance type Mass
 */
function Actor(unique, mass, forces, position, acceleration, velocity)
{
	if(!(mass instanceof Mass))
		throw "mass parameter of actor has to be of Mass instance";

	this.mass = mass.convert("kg");
	this.position = position;
	this.forces = forces;

	this.acceleration = acceleration;
	this.velocity = velocity;
	this.position = position;

	this.timer = 0;
	this.unique = unique;

	CreateBody(unique, this.position)
}

/**
 * Run scene, see what happens
 * @param  {function} closure 	what to run when the scene plays
 */
Actor.prototype.run = function(closure, interval)
{
	var _this = this;
	var cycle = window.setInterval(function() {
		var forceX = 0, forceY = 0;

		_this.acceleration[0] = 0;
		_this.acceleration[1] = 0;

		// gravity on acceleration of the actor
		if(typeof(WORLD.gravity) != 'undefined') {
			_this.acceleration[0] += WORLD.gravity.dx;
			_this.acceleration[1] += WORLD.gravity.dy;
		}

		// iterate through all the forces (sum them up)
		var iteration = 0;
		for(iteration = 0;iteration < _this.forces.length; iteration++) {
			if(typeof(_this.forces[iteration].time) != 'undefined' && _this.timer-1000 >= _this.forces[iteration].time)
				continue;

			_this.acceleration[0] += _this.forces[iteration].dx/_this.mass;
			_this.acceleration[1] += _this.forces[iteration].dy/_this.mass;

			forceX += _this.forces[iteration].dx;
			forceY += _this.forces[iteration].dy;
		}

		_this.velocity[0] = 0 + forceX*(_this.timer/1000);
		_this.velocity[1] = 0 + forceY*(_this.timer/1000);

		_this.position[0] += 0*(_this.timer/1000) + 0.5*(_this.acceleration[0]*Math.pow((_this.timer/1000), 2));
		_this.position[1] += 0*(_this.timer/1000) + 0.5*(_this.acceleration[1]*Math.pow((_this.timer/1000), 2));

		if(typeof(WORLD.bounderies) != undefined) {
			var flag = false, forcesExists = false;
			if((_this.position[0] > WORLD.bounderies[0] && _this.position[0] > 0) || (_this.position[0] < WORLD.bounderies[1] && _this.position[0] < 0) || (_this.position[1] > WORLD.bounderies[2] && _this.position[1] > 0) || (_this.position[1] < WORLD.bounderies[3] && _this.position[1] < 0)) {
				flag = true;
				for(iteration = 0;iteration < _this.forces.length; iteration++) {
					if(typeof(_this.forces[iteration].time) != 'undefined' && _this.timer-1000 >= _this.forces[iteration].time)
						continue;
					forcesExists = true;
					_this.forces[iteration].dx = _this.forces[iteration].dx*-1;
					_this.forces[iteration].dy = _this.forces[iteration].dy*-1;
				}
			}
		}

		// track the timing
		_this.timer += interval;

		if(flag === true) {
			if(_this.position[0] > WORLD.bounderies[0] && _this.position[0] > 0)
				_this.position[0] = WORLD.bounderies[0];
			if(_this.position[0] < WORLD.bounderies[1] && _this.position[0] < 0)
				_this.position[0] = WORLD.bounderies[1];
			if(_this.position[1] > WORLD.bounderies[2] && _this.position[1] > 0)
				_this.position[1] = WORLD.bounderies[2];
			if(_this.position[1] < WORLD.bounderies[3] && _this.position[1] < 0)
				_this.position[1] = WORLD.bounderies[3];
			if(forcesExists === false)
				clearInterval(cycle);
		}
		closure();

		MoveBody(_this.unique, _this.position);

	}, interval)
}