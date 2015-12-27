
// Icon
var canvasIcon;
var contextIcon;
var iconQueue = new Array();
var iconImages = {};
var iconLoaded = false;

function initIconCanvas() {
// Create icon canvas
    var canvasIconDiv = document.getElementById('canvasIconDiv');
	canvasIcon = document.createElement('canvas');
	canvasIcon.setAttribute('width', 300);
	canvasIcon.setAttribute('height', 50);
	canvasIcon.setAttribute('id', 'canvasIcon');
	canvasIconDiv.appendChild(canvasIcon);
	contextIcon = canvasIcon.getContext("2d");

    // Load icons.
 	iconQueue.push("./icons/save.png");
 	iconQueue.push("./icons/export.png");
 	iconQueue.push("./icons/import.png");
 	iconQueue.push("./icons/auto.png");
 	loadImages(iconQueue, drawIcons);
}

// Draw all icons on the canvas.
function drawIcons() {
	// context.beginPath();
 //    context.moveTo(800, 0);
 //    context.lineTo(1200, 0);
 //    context.lineTo(1200, 70);
 //    context.lineTo(800, 70);
 //    context.closePath();
 //    context.fillStyle = "rgba(200, 200, 200, 1)";
 //    context.fill();

 	if(iconLoaded) {
 		for( i=0; i<iconQueue.length; i++) {
 			contextIcon.drawImage(iconImages[i], i*50, 0, 50, 50);
 		}
 	}
}

function loadImages(sources, drawIcons) {
    var loadedImages = 0;
    for(i=0; i<sources.length; i++) {
      iconImages[i] = new Image();
      iconImages[i].onload = function() {
        if(++loadedImages >= sources.length) {
          iconLoaded = true;
          drawIcons();
        }
      };
      iconImages[i].src = sources[i];
    }
}