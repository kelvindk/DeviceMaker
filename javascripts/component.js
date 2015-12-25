
function Component(name, pageX, pageY, dimX, dimY) {
	this.name = name;
	this.color = "rgba(255, 255, 255, 0.8)";
	this.pageX = pageX;
	this.pageY = pageY;
	this.dimX = dimX;
	this.dimY = dimY;
	this.boundaryX = pageX + dimX;
	this.boundaryY = pageY + dimY;
}

Component.prototype.alt = function() {
	alert(this.name+" "+this.pageX+" "+this.pageY+" "+this.labelX()+" "+this.labelY());
}

Component.prototype.labelX = function() {
	return this.pageX+this.dimX/10;
}

Component.prototype.labelY = function() {
	return this.pageY+this.dimY/4;
}

Component.prototype.isComponentClicked = function(pageX, pageY, layoutScale) {
	var clicked = (pageX >= this.pageX*layoutScale)&&(pageY >= this.pageY*layoutScale)&&
		(pageX <= this.boundaryX*layoutScale)&&(pageY <= this.boundaryY*layoutScale) ? true: false;
	// var rtn = pageX+" "+pageY+" "+clicked+" "+this.pageX+" "+this.pageY+" "+this.dimX+" "+this.dimY;
	// alert(rtn);
	return clicked;
}

Component.prototype.isCollision = function(c) {
	
	return false;
}