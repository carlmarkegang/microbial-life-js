var x = [20,30,40,50];
var y = [20,30,40,50];
var segLength = 40;

function setup() {
  createCanvas(500, 500);
  background(color(0, 0, 0));
  noSmooth();
  textSize(10);
}

function draw() {

  background(color(207, 218, 175));
  strokeWeight(9);
  stroke(255, 100)


  dragSegment(0, mouseX, mouseY);
  for(var i=0; i<x.length-1; i++) {
    dragSegment(i+1, x[i], y[i]);
  }

}

function dragSegment(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = atan2(dy, dx);  
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  segment(x[i], y[i], angle);
}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}