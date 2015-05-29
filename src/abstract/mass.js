/**
 * Mass object
 * @param {int} 	scalar 	mass size
 * @param {string} 	unit   	the unit measure
 */

function Mass(scalar, unit)
{
	this.scalar = scalar;
	this.unit = unit;
}

/**
 * Convert units
 * @param  {string} unit 
 * @return {int}    scalar in new unit
 */
Mass.prototype.convert = function(unit) {
	if(unit == this.unit)
		return this.scalar;

	if(unit == 'kg' && this.unit == 'g')
		return this.scalar * 0.001;

	if(unit == 'g' && this.unit == 'kg')
		return this.scalar * 1000;
}