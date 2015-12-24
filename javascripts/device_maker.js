 

var canvas;
var context;
var canvasWidth = 1000;
var canvasHeight = 800;
var backgroundColor = "#333333";
var gridColor = "#ffffff";

var layoutScale = 1;
var gridSize = 20*layoutScale;
var layoutBoundaryX = 800;
var layoutBoundaryY = 800;

var c; //selected component
var componentQueue = new Array();; //components, a queue to store all components on the grid.
var componentFixedColor = "rgba(255, 255, 255, 0.8)";
var componentSelectedColor = "rgba(0, 255, 0, 0.45)";
var componentFontSize = 15*layoutScale;



var mouseState = 0; //0:nothing, 1:clicked
var mouseX, mouseY;
var gridX, gridY;

/*
	Initialize the canvas, drawing the grid of layout.
*/
function initCanvas() {
	// Create a canvas
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');

	canvasDiv.appendChild(canvas);
    canvasDiv.addEventListener("click", onClick, false);

	context = canvas.getContext("2d");

	context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    componentQueue.push(new Component("BLE", 200, 100, 100, 100));
    componentQueue.push(new Component("MPU9250", 300, 200, 100, 100));
    c = componentQueue[0];

    redraw();

}


// Redraw current state.
function redraw() {
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	drawGrid();
	for(i=0; i<componentQueue.length; i++) {
		drawComponent(componentQueue[i]);
	}
	
}


// Draw background grid.
function drawGrid() {
	context.beginPath();
	context.lineWidth = 0.1;
    for (var i = 0; i <= canvasHeight; i=i+gridSize) {
    	context.moveTo(i, 0);
    	context.lineTo(i, canvasHeight);
    	context.moveTo(0, i);
    	context.lineTo(canvasHeight, i);
    }
    context.closePath();

	context.strokeStyle = gridColor; 
	context.stroke();
}

// Draw a component on grid.
function drawComponent(component) {
	context.beginPath();
	context.rect(component.pageX*layoutScale, component.pageY*layoutScale, 
		component.dimX*layoutScale, component.dimY*layoutScale);
	context.fillStyle = component.color;
	context.fill();
	context.closePath();
	context.stroke();

	context.font = componentFontSize+"pt Calibri";
  	context.fillStyle = "rgba(50, 50, 50, 1)";
  	context.fillText(component.name, component.labelX()*layoutScale, component.labelY()*layoutScale);
}

var mouseEvent = function(e) {
	mouseX = e.clientX-canvas.offsetLeft;
    mouseY = e.clientY-canvas.offsetTop;
    gridX = Math.round(mouseX/gridSize)*gridSize/layoutScale;
    gridY = Math.round(mouseY/gridSize)*gridSize/layoutScale;
    boundaryX = layoutBoundaryX-(c.dimX*layoutScale);
    boundaryY = layoutBoundaryY-(c.dimY*layoutScale);
    if(mouseX>= boundaryX) {
    	c.pageX = boundaryX/layoutScale;
    }
    else {
       	c.pageX = gridX;
    }
    if(mouseY>= boundaryY) {
    	c.pageY = boundaryY/layoutScale;
	}
    else {
		c.pageY = gridY;
	}
}

function onClick(e) {

	switch(mouseState) {
    case 0:
    	// alert(e.pageX-canvas.offsetLeft+" "+e.pageY-canvas.offsetTop);
        if(c.isComponentClicked(e.pageX-canvas.offsetLeft, e.pageY-canvas.offsetTop, layoutScale)) {
			canvas.addEventListener('mousemove', mouseEvent, false);
		    mouseState = 1;
		    c.color = componentSelectedColor;
			requestAnimFrame(dragComponent);
		}
        break;
    case 1:
    	mouseState = 0;
        break;
    default:
        
	}
	
	redraw();
    context.font = '16pt Calibri';
  	context.fillStyle = 'gray';
  	context.fillText((e.pageX-canvas.offsetLeft)+"  "+(e.pageY-canvas.offsetTop)+" "+mouseState+" "+c.pageX+" "+c.pageY, 800, 300);
  	context.fillText(c.isComponentClicked(e.pageX-canvas.offsetLeft, e.pageY-canvas.offsetTop, layoutScale)+" "+c.boundaryX+" "+c.boundaryY, 800, 350);
}

function dragComponent() {

	if(mouseState == 0) { // Clicked for placing component on layout.
		canvas.removeEventListener('mousemove', mouseEvent);
		c.color = componentFixedColor;
		c.boundaryX = c.pageX + c.dimX;
		c.boundaryY = c.pageY + c.dimY;
		redraw();
		return;
	}
	
	redraw();

	requestAnimFrame(dragComponent);
	context.font = '16pt Calibri';
  	context.fillStyle = 'gray';
  	context.fillText(mouseX+" "+mouseY+" "+Math.round(mouseX/gridSize)*gridSize+" "+Math.round(mouseX/gridSize)*gridSize, 800, 400);
}

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame 
	|| window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();

