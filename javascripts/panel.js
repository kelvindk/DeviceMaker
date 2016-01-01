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
	// if(e.id == "close") {
		
	// }
	// else if(e.id == "addComponent") {
	// 	document.getElementById('componentListDiv').style.display = "inline";
	// }
	// else if((e.id == "deleteComponent") && (c != undefined) && (c.selected)) {
	// 	// e.parentNode.innerHTML += "<i>"+c.selected+" "+componentQueue.indexOf(c)+"</i>";
		
	// }

	switch(e.id) {
	case "close":
		document.getElementById('componentListDiv').style.display = "none";
		break;
	case "addComponent":
		document.getElementById('componentListDiv').style.display = "inline";
		break;
	case "deleteComponent":
		if(c.selected) {
			componentQueue.splice(componentQueue.indexOf(c), 1);
			c = null;
			redraw();
		}
		
		break;
	case "drawDimension":
		console.log(e.className);
		e.className = "menuSelectedBotton";
		break;
	}
}