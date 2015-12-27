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