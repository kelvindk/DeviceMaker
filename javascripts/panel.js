// Panel
var canvasPanel;
var contextPanel;

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

	e.parentNode.innerHTML += "<i>"+e.id+"</i>";
	switch(e.id) {
	case "nRF51822":
		componentQueue.push(new Component("nRF51822", 200, 100, 140, 140, layoutScale));
		break;
	case "Atmega328p":
		componentQueue.push(new Component("Atmega328p", 200, 100, 140, 140, layoutScale));
		break;
	case "MPU9250":
		componentQueue.push(new Component("MPU9250", 200, 340, 100, 100, layoutScale));
		break;
	}
	c = componentQueue[componentQueue.length-1];

	document.getElementById('componentListDiv').style.display = "none";

	redraw();

}

function menuBottonClick(e) {
	if(e.id == "close") {
		document.getElementById('componentListDiv').style.display = "none";
		return;
	}
	else if(e.id == "addComponent") {
		document.getElementById('componentListDiv').style.display = "inline";
	}
	else if(e.id == "deleteComponent") {
		e.parentNode.innerHTML += "<i>"+c.name+"</i>";

	}
}