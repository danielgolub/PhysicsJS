/**
 * Vector definition
 */

/**
 * Vector function abstract definition
 * @param {float} dx   	force on X
 * @param {float} dy   	force on Y
 * @param {float} time 	force work time
 */
function Vector(dx, dy, time)
{
	this.dx = dx;
	this.dy = dy;
	this.time = time;
}

/**
 * Get vector sygma
 * @return {int} sygma result (Pythagoras)
 */
Vector.prototype.sigma = function()
{
	return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
}

/**
 * Get Vector direction
 * @return {int} direction
 */
Vector.prototype.direction = function()
{
	var sigma = this.prototype.sigma();
	if(sigma > 0)
		return 1;
	else if(sigma < 0)
		return -1;
	else
		return 0;
}