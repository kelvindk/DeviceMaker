
var auto_display = false;

function onclickIconButton(e) {
  switch(e.id) {
  case "autoButton":
    // alert("icon autoButton");
    if(auto_display==false) {
      auto_display = true;
      document.getElementById('nRF51822_MPU9250_icon').style.display = "inline";
      dimensionPointArray = new Array();
      redraw();
    }
    else {
      auto_display = false;
      document.getElementById('nRF51822_MPU9250_icon').style.display = "none";
    }
    
    break;
  }
  
}

// // Icon
// var canvasIcon;
// var contextIcon;
// var iconQueue = new Array();
// var iconImages = {};
// var iconLoaded = false;

// function initIconCanvas() {
// // Create icon canvas
  
// }

// // Draw all icons on the canvas.
// function drawIcons() {

//  	if(iconLoaded) {
//  		for( i=0; i<iconQueue.length; i++) {
//  			contextIcon.drawImage(iconImages[i], i*50, 0, 50, 50);
//  		}
//  	}
// }

// function loadImages(sources, drawIcons) {
//     var loadedImages = 0;
//     for(i=0; i<sources.length; i++) {
//       iconImages[i] = new Image();
//       iconImages[i].onload = function() {
//         if(++loadedImages >= sources.length) {
//           iconLoaded = true;
//           drawIcons();
//         }
//       };
//       iconImages[i].src = sources[i];
//     }
// }

