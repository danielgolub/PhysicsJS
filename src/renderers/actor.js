/**
 * Render the actor point
 */

var box = document.getElementById("World")

/**
 * Create a body element
 * @param {array} position 	location in box - [x, y]
 */
function CreateBody(identifier, position) {
	var actor = document.createElement("div");
	actor.id = "Actor-"+identifier;
	actor.className = "Actor";
	actor.style.cssText = "width: 10px;height: 10px";
	actor.style.top  = (parseInt(box.style.height.substr(0, box.style.height.length-2) / 2) + position[1])+"px"
	actor.style.left = (parseInt(box.style.width.substr(0, box.style.width.length-2) / 2) + position[0])+"px"
	box.appendChild(actor)
}

function MoveBody(unique, position)
{
	console.log(position)
	var actor = document.getElementById('Actor-'+unique);
	actor.innerHTML = unique+" <br />"+position;
	actor.style.top  = (parseInt(box.style.height.substr(0, box.style.height.length-2) / 2) - position[1])+"px"
	actor.style.left = (parseInt(box.style.width.substr(0, box.style.width.length-2) / 2) + position[0])+"px"
}