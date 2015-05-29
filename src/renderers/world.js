/**
 * Render the world box
 */

var box = document.createElement("div")
box.id = "World";
box.style.cssText = 'width: '+Math.abs(WORLD.bounderies[0] - WORLD.bounderies[1])+'px;height: '+Math.abs(WORLD.bounderies[2] - WORLD.bounderies[3])+"px";
document.body.appendChild(box)