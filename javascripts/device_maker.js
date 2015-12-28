 
// Layout
var canvas;
var context;
var canvasWidth = 1100;
var canvasHeight = 800;
var backgroundColor = "#333333";
var gridColor = "#ffffff";
var layoutScale = 1;
var gridSize = 20*layoutScale;
var layoutBoundaryX = 800;
var layoutBoundaryY = 800;

// Component
var c; //selected component.
var preX, preY; // Previous position of selected component.
var componentQueue = new Array(); //components, a queue to store all components on the grid.
var componentFixedColor = "rgba(255, 255, 255, 0.6)";
var componentSelectedColor = "rgba(0, 255, 0, 0.3)";
var componentCollisionColor = "rgba(255, 0, 0, 0.3)";
var componentFontSize = 15*layoutScale;
var componentCollision = false;

// Mouse
var mouseState = 0; //0:nothing, 1:clicked
var mouseX, mouseY;
var gridX, gridY;
var mouseDownTS;
var mouseLongPressPeriod = 250;
var mouseDownTimeoutVar;

$(document).ready(function() {
	// Standard
	$('.tab-links a').on('click', function(e)  {
		var currentAttrValue = $(this).attr('href');
		// Show/Hide Tabs
		$('.tabs ' + currentAttrValue).show().siblings().hide();

		// Change/remove current tab to active
		$(this).parent('li').addClass('active').siblings().removeClass('active');

		e.preventDefault();
	});
});

/*
	Initialize the canvas, drawing the grid of layout.
*/
function initCanvas() {
	// Create grid canvas
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	context = canvas.getContext("2d");
	context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseup, false);

 	// Load component.
    componentQueue.push(new Component("nRF51822", 200, 100, 140, 140, layoutScale));
    componentQueue.push(new Component("MPU9250", 200, 340, 100, 100, layoutScale));
    c = componentQueue[0];

    redraw();

    console.log("Initialize");

	// Mouse right click event.
 //    canvasDiv.addEventListener('contextmenu', function(ev) {
	//     ev.preventDefault();
	//     // alert('success!');
	//     return false;
	// }, false);
}

// $(canvasIconDiv).hide();
// $(canvasIconDiv).show();
// $(document.getElementById('componentList')).show();

// Redraw current state.
function redraw() {
	// Clean layout.
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	contextPanel.clearRect(0, 0, 300, 400);

	// Draw grid.
	drawGrid();

	// Draw all components.
	drawComponents(c);

	// Draw the info if component is selected.
	if(c.selected || (mouseState == 1)) 
		drawInfo();
}


// Draw background grid.
function drawGrid() {
	context.beginPath();
	context.lineWidth = 0.1;
    for (i = 0; i <= canvasHeight; i=i+gridSize) {
    	context.moveTo(i, 0);
    	context.lineTo(i, canvasHeight);
    	context.moveTo(0, i);
    	context.lineTo(canvasHeight, i);
    }
    context.closePath();

	context.strokeStyle = gridColor; 
	context.stroke();
}

// Draw all component on grid.
function drawComponents(c) {
	for(i=0; i<componentQueue.length; i++) {
		if(componentQueue[i] == c)
			continue;
		drawComponent(componentQueue[i]);
	}

	// Draw the selected component on top layer.
	drawComponent(c);
}

// Draw a component on grid.
function drawComponent(component) {
	context.beginPath();
	context.rect(component.pageX*layoutScale, component.pageY*layoutScale, 
		component.dimX*layoutScale, component.dimY*layoutScale);
	context.fillStyle = component.color;
	context.fill();
	context.closePath();
	if(component.selected ||((mouseState==1)&&(c==component))) {
		context.lineWidth = 1;
		context.strokeStyle = 'red';
	}
	context.stroke();


	context.font = componentFontSize+"pt Calibri";
  	context.fillStyle = "rgba(50, 50, 50, 1)";
  	context.fillText(component.name, component.labelX()*layoutScale, component.labelY()*layoutScale);
}

// Draw info of selected component.
function drawInfo() {
	contextPanel.beginPath();
	contextPanel.rect(0, 0, 300, 200);
	contextPanel.fillStyle = "rgba(255, 255, 255, 0.8)";
	contextPanel.fill();
	contextPanel.closePath();
	// context.stroke();

	contextPanel.font = componentFontSize*1.2+"pt Calibri";
  	contextPanel.fillStyle = "red";
  	contextPanel.fillText(c.name+" info...", 5, 20);

}

function onMouseup(e) {
	if(mouseState != 0)
		return;
	clearTimeout(mouseDownTimeoutVar);

	for(i=0; i<componentQueue.length; i++) {
		if(componentQueue[i].isInComponentArea(e.pageX-canvasDiv.offsetLeft, e.pageY-canvasDiv.offsetTop)) {
			c = componentQueue[i];
			c.selected = true;
			redraw();
			break;
		}
	}

	context.font = '16pt Calibri';
  	context.fillStyle = 'gray';
  	context.fillText(e.which+" "+e.type+" "+e.timeStamp, 800, 750);
}

function mouseDownTimeout() {
	if(mouseState == 1)
		return;

	for(i=0; i<componentQueue.length; i++) {
		if(componentQueue[i].isInComponentArea(mouseX-canvasDiv.offsetLeft, mouseY-canvasDiv.offsetTop)) {
			canvas.addEventListener('mousemove', mouseMoveEvent, false);
		    mouseState = 1;
		    componentQueue[i].color = componentSelectedColor;
			requestAnimFrame(dragComponent);
			c = componentQueue[i];
			preX = c.pageX;
			preY = c.pageY;

			// Enable keyboard event.
			window.addEventListener('keydown',keybaordEvent,false);
			break;
		}
	}
}


// Mouse left click handler.
function onMouseDown(e) {
	if(e.which != 1)
		return;
	
	mouseDownTS = e.timeStamp;
	mouseX = e.pageX;
	mouseY = e.pageY;
	

	switch(mouseState) {
    case 0:
    	mouseDownTimeoutVar = setTimeout(mouseDownTimeout, mouseLongPressPeriod);

        break;
    case 1:
    	if(!componentCollision) {
    		window.removeEventListener('keydown', keybaordEvent);
    		mouseState = 0;
    	}
        break;
    default:
        
	}
	
	c.selected = false;
	redraw();
    context.font = '16pt Calibri';
  	context.fillStyle = 'gray';
  	context.fillText((e.pageX-canvasDiv.offsetLeft)+"  "+(e.pageY-canvasDiv.offsetTop)+" "+c.pageX+" "+c.pageY, 800, 650);
  	context.fillText(e.which+" "+e.type+" "+e.timeStamp, 800, 700);
  	// context.fillText(c.isInComponentArea(e.pageX-canvas.offsetLeft, e.pageY-canvas.offsetTop)+" "+c.boundaryX+" "+c.boundaryY, 800, 350);
}


function keybaordEvent(e) {
	if(e.keyCode == 27) { // ESC
		mouseState = 0;
		c.pageX = preX;
		c.pageY = preY;
		window.removeEventListener('keydown', keybaordEvent);
	}
}

var mouseMoveEvent = function(e) {
	mouseX = e.clientX-canvasDiv.offsetLeft;
    mouseY = e.clientY-canvasDiv.offsetTop;
    gridX = Math.round(mouseX/gridSize)*gridSize/layoutScale;
    gridY = Math.round(mouseY/gridSize)*gridSize/layoutScale;
    boundaryX = layoutBoundaryX-(c.dimX*layoutScale);
    boundaryY = layoutBoundaryY-(c.dimY*layoutScale);


	// Bound the component from the boundary of layout.
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

	// Check component collision.
	for(i=0; i<componentQueue.length; i++) {
		if(componentQueue[i] == c) {
			continue;
		}
		// Collision check with current component.
		if(componentQueue[i].isCollision(c, layoutScale)) {
			c.color = componentCollisionColor;
			componentCollision = true;
			return;
		}
	}
	c.color = componentSelectedColor;
	componentCollision = false;	
}

function dragComponent() {
	

	// Check if user clicked to drop component on layout.
	if(mouseState == 0) { 
		canvas.removeEventListener('mousemove', mouseMoveEvent);
		c.color = componentFixedColor;
		c.boundaryX = c.pageX + c.dimX;
		c.boundaryY = c.pageY + c.dimY;
		redraw();
		return;
	}
	
	redraw();
	// Enable the animation that the selected component follows mouse cursor.
	requestAnimFrame(dragComponent);

	context.font = '16pt Calibri';
  	context.fillStyle = 'gray';
  	context.fillText(componentCollision+" "+Math.round(mouseX/gridSize)*gridSize+" "+Math.round(mouseY/gridSize)*gridSize+" "+c.pageX+" "+c.pageY, 800, 700);
}

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame 
	|| window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();


