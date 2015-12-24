
function Component(name, pageX, pageY, dimX, dimY) {
	this.name = name;
	this.pageX = pageX;
	this.pageY = pageY;
	this.dimX = dimX;
	this.dimY = dimY;

}

Component.prototype.alt = function()
{
	alert(this.name+" "+this.pageX+" "+this.pageY+" "+this.labelX()+" "+this.labelY());
}

Component.prototype.labelX = function()
{
	return this.pageX+this.dimX/4;
}

Component.prototype.labelY = function()
{
	return this.pageY+this.dimY/2;
}