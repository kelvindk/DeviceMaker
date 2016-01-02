// Panel
var canvasPanel;
var contextPanel;
var isDrawDimension = false;
var dimensionPointArray = new Array();

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

	// console.log("Initialize Panel");
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
		componentQueue.push(new Component("", 0, 0, 100, 40, layoutScale));
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

		canvas.removeEventListener("click", onMouseClickDimension);
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
    		// canvas.addEventListener("dblclick", onMouseDbclickDimension, false);
    		
		}
		else { // Disable draw dimension
			e.className = "menuBotton";
			isDrawDimension = false;

			canvas.removeEventListener("click", onMouseClickDimension);
			canvas.addEventListener("mousedown", onMouseDown, false);
    		canvas.addEventListener("mouseup", onMouseup, false);
		}
		
		break;
	}
}

function onMouseDbclickDimension(e) {
	console.log("onMouseDbclickDimension");
}

function onMouseClickDimension(e) {
	
	//dimensionPointQueue
	// var curPoint = {x: 400, y: 200};

	var mouseX = e.clientX-canvasDiv.offsetLeft;
    var mouseY = e.clientY-canvasDiv.offsetTop;
    var gridX = Math.round(mouseX/gridSize)*gridSize/layoutScale;
    var gridY = Math.round(mouseY/gridSize)*gridSize/layoutScale;

    if(dimensionPointArray.length == 0) {
    	if(isPointInComponentArea(gridX, gridY)) {
    		console.log("Collision init queue");
    		return;
    	}
    	else {
    		dimensionPointArray.push({x: gridX, y: gridY});
    		return;
    	}
    }
    else { 
    	var prePoint = dimensionPointArray[dimensionPointArray.length-1];
    	if(isLineCollisionToComponents(prePoint, gridX, gridY)) {
    		console.log("Collision");
    		return;
    	}
    	else {
    		dimensionPointArray.push({x: gridX, y: gridY});
    		redraw();
    
		    
    	}
    }
	// var prePoint = {x: 300, y: 300};

    
	
}

function drawDimension() {
	if(dimensionPointArray.length == 0)
		return;
	context.lineWidth = 1;
	context.beginPath();
	var headPoint = dimensionPointArray[0];
	context.moveTo(headPoint.x, headPoint.y);
	for(var i=0; i<dimensionPointArray.length; i++) {
		context.lineTo(dimensionPointArray[i].x, dimensionPointArray[i].y);
	}
	context.strokeStyle = "rgba(255, 0, 255, 1)";
	context.stroke();
}

function isLineCollisionToComponents(prePoint, gridX, gridY) {
	

	// Determine line equation: y=ax+b
    if(prePoint.x==gridX) { // Handle the exception for vertical line.
    	var drt = prePoint.y<gridY; // Direction of line.
    	var gridStep = drt?gridSize:gridSize*(-1);
    	for(var i=prePoint.y; drt?i<=gridY:i>=gridY; i=i+gridStep) {
    		var pointX = prePoint.x;
    		var pointY = i;
    		// console.log(gridX+" "+gridY+" "+pointX+" "+pointY);
    		if(isPointInComponentArea(pointX, pointY)) {
    			// console.log("Collision vertical");
    			return true;
    		}
    	}
    }
    else {
    	var a = (prePoint.y-gridY)/(prePoint.x-gridX);
		var b = prePoint.y-(prePoint.x*a);
		var drt = prePoint.x<gridX; // Direction of line.
		var gridStep = drt?1:-1;
		// console.log(gridX+" "+gridY+" a="+a+" b="+b+" drt="+drt);
    	for(var i=prePoint.x; drt?i<=gridX:i>=gridX; i=i+gridStep) {
			var pointX = i;
			var pointY = pointX*a+b;
    		// console.log(gridX+" "+gridY+" "+pointX+" "+pointY);
    		if(isPointInComponentArea(pointX, pointY)) {
    			// console.log("Collision");
    			return true;
    		}
    	}
    }
    return false;
}

function isPointInComponentArea(pointX, pointY) {
	// Check component collision.
	for(var j=0; j<componentQueue.length; j++) {
		// Collision check with current component.
		if(componentQueue[j].isInComponentArea(pointX, pointY)) {
			return true;
		}
	}
	return false;
}

