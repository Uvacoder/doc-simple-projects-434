function setup() {
  createCanvas(displayWidth * 0.75, displayHeight * 0.90 * 0.75);
  background(0);
  generate();
  

}

function generate() {
  clear();
  background(0);
  var i = 0;
  while (i < displayWidth * 0.75 * 1.5) {
    strokeWeight(0);
    fill(random(0, 255), random(0, 255), random(0, 255));
    ellipse(random(0, displayWidth * 0.75), random(0, displayHeight * 0.90), random(0, 5));
    i++;
  }
  i = 0;
  while (i < displayWidth * 0.75 / 15) {
    strokeWeight(0);
    fill(random(0, 255), random(0, 255), random(0, 255));
    ellipse(random(0, displayWidth * 0.75), random(0, displayHeight * 0.90), random(10, 20));
    i++;
  }
  i = 0;
  while (i < displayWidth * 0.75 / 85) {
    strokeWeight(0);
    fill(random(0, 255), random(0, 255), random(0, 255));
    ellipse(random(0, displayWidth * 0.75), random(0, displayHeight * 0.90), random(40, 60));
    i++;
  }
}

// save('splatter.jpg')

function draw() {}
