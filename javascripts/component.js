
function Component(name, pageX, pageY, dimX, dimY, layoutScale) {
	this.name = name;
	this.color = "rgba(255, 255, 255, 0.6)";
	this.pageX = pageX;
	this.pageY = pageY;
	this.dimX = dimX;
	this.dimY = dimY;
	this.boundaryX = pageX + dimX;
	this.boundaryY = pageY + dimY;
	this.layoutScale = layoutScale;
	this.selected = false;
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

Component.prototype.isInComponentArea = function(pageX, pageY) {
	clicked = (pageX > this.pageX*this.layoutScale)&&(pageY > this.pageY*this.layoutScale)&&
		(pageX < this.boundaryX*this.layoutScale)&&(pageY < this.boundaryY*this.layoutScale) ? true: false;
	// var rtn = pageX+" "+pageY+" "+clicked+" "+this.pageX+" "+this.pageY+" "+this.dimX+" "+this.dimY;
	// alert(rtn);
	return clicked;
}

Component.prototype.isCollision = function(c) {
	var gridSize = 20*this.layoutScale;
	if(this.isInComponentArea(c.pageX, c.pageY))
		return true;
	if(this.isInComponentArea(c.pageX+c.dimX, c.pageY))
		return true;
	if(this.isInComponentArea(c.pageX, c.pageY+c.dimY))
		return true;
	if(this.isInComponentArea(c.pageX+c.dimX, c.pageY+c.dimY))
		return true;
	for(i=c.pageX; i<c.pageX+c.dimX; i=i+gridSize) {
		for(j=c.pageY; j<c.pageY+c.dimY; j=j+gridSize) {
			if(this.isInComponentArea(i, j))
				return true;
		}
	}
	return false;
}