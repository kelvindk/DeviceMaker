

var canvas;
var context;
var canvasWidth = 1000;
var canvasHeight = 800;
var backgroundColor = "#333333";
var gridColor = "#ffffff";
var c;

var layoutScale = 1;
var componentFontSize = 20*layoutScale;


/*
	Initialize the canvas, drawing the grid of layout.
*/
function initCanvas()
{
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

    c = new Component("BLE", 300, 100, 100, 100);

    redraw();

}


// Redraw current state.
function redraw()
{
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	drawGrid();
	drawComponent(c);

}


// Draw background grid.
function drawGrid()
{
	context.beginPath();
	context.lineWidth = 0.1;
    for (var i = 0; i <= canvasHeight; i=i+20*layoutScale) {
    	context.moveTo(i, 0);
    	context.lineTo(i, canvasHeight);
    	context.moveTo(0, i);
    	context.lineTo(canvasHeight, i);
    }
    context.closePath();

	context.strokeStyle = gridColor;
	context.stroke();
}

function drawComponent(component)
{
  	context.beginPath();
	context.rect(component.pageX*layoutScale, component.pageY*layoutScale, 
		component.dimX*layoutScale, component.dimY*layoutScale);
	context.fillStyle = 'white';
	context.fill();
	context.closePath();
	context.stroke();

	context.font = componentFontSize+"pt Calibri";
  	context.fillStyle = 'gray';
  	context.fillText(component.name, component.labelX()*layoutScale, component.labelY()*layoutScale);
}

function onClick(e) {
	
	redraw();
    context.font = '20pt Calibri';
  	context.fillStyle = 'gray';
  	context.fillText(e.pageX+"  "+e.pageY, 850, 300);
}

