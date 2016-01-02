// Panel
var canvasPanel;
var contextPanel;
var isDrawDimension = false;
var dimensionPointQueue = new Array();

function initPanelCanvas() {
// Create icon canvasa
    var canvasPanelDiv = document.getElementById('canvasPanelDiv');
	canvasPanel = document.createElement('canvas');
	canvasPanel.setAttribute('width', 300);
	canvasPanel.setAttribute('height', 400);
	canvasPanel.setAttribute('id', 'canvasPanel');
	canvasPanelDiv.appendChild(canvasPanel);
	contextPanel = canvasPanel.getContext("2d");

	// contextPanel.beginPath();
	// contextPanel.rect(0, 0, 260, 200);
	// contextPanel.fillStyle = "rgba(255, 255, 255, 0.8)";
	// contextPanel.fill();
	// contextPanel.closePath();

	console.log("Initialize Panel");
}

function showComponentList(e) {

	// e.parentNode.innerHTML += "<i>"+e.id+"</i>";
	switch(e.id) {
	case "nRF51822":
		componentQueue.push(new Component("nRF51822", 0, 0, 140, 140, layoutScale));
		break;
	case "CC2541":
		componentQueue.push(new Component("CC2541", 0, 0, 140, 140, layoutScale));
		break;
	case "Atmega328p":
		componentQueue.push(new Component("Atmega328p", 0, 0, 140, 140, layoutScale));
		break;
	case "MPU9250":
		componentQueue.push(new Component("MPU9250", 0, 0, 100, 100, layoutScale));
		break;
	case "TMP102":
		componentQueue.push(new Component("TMP102", 0, 0, 100, 100, layoutScale));
		break;
	case "INMP441":
		componentQueue.push(new Component("", 0, 0, 20, 100, layoutScale));
		break;
	}
	c = componentQueue[componentQueue.length-1];

	document.getElementById('componentListDiv').style.display = "none";

	setComponentDrag(c);

	redraw();

}

function menuBottonClick(e) {

	switch(e.id) {
	case "close":
		document.getElementById('componentListDiv').style.display = "none";
		break;
	case "addComponent":
		document.getElementById('componentListDiv').style.display = "inline";
		document.getElementById('drawDimension').className = "menuBotton";
		isDrawDimension = false;

		canvas.addEventListener("mousedown", onMouseDown, false);
		canvas.addEventListener("mouseup", onMouseup, false);
		break;
	case "deleteComponent":
		if(c && c.selected) {
			componentQueue.splice(componentQueue.indexOf(c), 1);
			c = null;
			redraw();
		}
		
		break;
	case "drawDimension":
		if(!isDrawDimension) { // Enable draw dimension
			e.className = "menuSelectedBotton";
			isDrawDimension = true;

			canvas.removeEventListener("mousedown", onMouseDown);
    		canvas.removeEventListener("mouseup", onMouseup);

    		canvas.addEventListener("click", onMouseClickDimension, false);
		}
		else { // Disable draw dimension
			e.className = "menuBotton";
			isDrawDimension = false;

			canvas.addEventListener("mousedown", onMouseDown, false);
    		canvas.addEventListener("mouseup", onMouseup, false);
		}
		
		break;
	}
}

function onMouseClickDimension(e) {
	
	//dimensionPointQueue
	var prePoint = {x: 200, y: 200};
	var curPoint = {x: 400, y: 200};

	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(prePoint.x, prePoint.y);
	context.lineTo(curPoint.x, curPoint.y);
	context.closePath();
	context.stroke();
	var mouseX = e.clientX-canvasDiv.offsetLeft;
    var mouseY = e.clientY-canvasDiv.offsetTop;

	isLineCollisionToComponents(prePoint, curPoint, mouseX, mouseY);
}

function isLineCollisionToComponents(prePoint, curPoint, mouseX, mouseY) {
	// Determine line equation: y=ax+b
    if(prePoint.x==curPoint.x) { // Handle the exception for vertical line.
    	var pointX = prePoint.x;
    	var pointY = mouseY;
    }
    else {
    	var a = (prePoint.y-curPoint.y)/(prePoint.x-curPoint.x);
		var b = prePoint.y-(prePoint.x*a);
		// var c =
		var pointX = mouseX;
		var pointY = pointX*a+b;
    }
    console.log(mouseX+" "+mouseY+" "+pointX+" "+pointY);
}

