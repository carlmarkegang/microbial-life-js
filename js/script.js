let being = [];
var points = 0;
let obstacle_array = [];
let background_blocks_array = [];

let resolutionX = 300;
let resolutionY = resolutionX / 1.5;

let offsetX = 0;
let offsetY = 0;

function create_being(x, y, vel_x, vel_y) {
  this.position = new p5.Vector(x, y);
  this.vel_x = vel_x;
  this.vel_y = vel_y;
  this.radius = 2;
  this.speed = 2;
  this.accelerationX = 0;
  this.accelerationY = 0;
  this.randomMovementX = 0;
  this.randomMovementY = 0;
}

function create_obstacle(x, y, radius) {
  this.position = new p5.Vector(x, y);
  this.radius = radius;
}

function create_background_block(x, y, size) {
  this.position = new p5.Vector(x, y);
  this.size = size;
}


for (let i = 0; i < 20; i++) {
  var y = randomInt(0, resolutionY);
  var x = randomInt(0, resolutionX);
  obstacle_array.push(new create_obstacle(x, y, 10));
}

for (let i = 0; i < 100; i++) {
  var y = randomInt(0, resolutionY);
  var x = randomInt(0, resolutionX);
  background_blocks_array.push(new create_background_block(x, y, 1));
  background_blocks_array.push(new create_background_block(0, 0, 1));
}

for (let i = 0; i < 5; i++) {
  being.push(new create_being(randomInt(0, resolutionX), randomInt(0, resolutionY), 0, 0));
}

function setup() {
  createCanvas(resolutionX, resolutionY);
  background(color(0, 0, 0));
  noSmooth();
  textSize(10);
}

function draw() {

  background(color(91, 160, 255));
  stroke(0, 0, 0);
  strokeWeight(0);

  // Background blocks
  fill(color(50, 50, 50));
  for (let i = 0; i < background_blocks_array.length; i++) {
    rect(background_blocks_array[i].position.x, background_blocks_array[i].position.y, background_blocks_array[i].size, background_blocks_array[i].size);
  }

  // Obstacle
  fill(color(239, 100, 14));
  for (let i = 0; i < obstacle_array.length; i++) {
    ellipse(obstacle_array[i].position.x, obstacle_array[i].position.y, obstacle_array[i].radius * 2, obstacle_array[i].radius * 2);
    collisionCheck(obstacle_array[i]);
  }

  // being
  fill(color(247, 15, 116));
  for (let i = 0; i < being.length; i++) {
    beingMovement(being[i]);
    being[i].position.x += being[i].vel_x;
    being[i].position.y += being[i].vel_y;

    ellipse(being[i].position.x, being[i].position.y, being[i].radius * 2, being[i].radius * 2);

    var tailOffsetX_1 = being[i].vel_x;
    var tailOffsetY_1 = being[i].vel_y;
    ellipse(being[i].position.x - tailOffsetX_1, being[i].position.y - tailOffsetY_1, being[i].radius * 2, being[i].radius * 2);

    var tailOffsetX_2 = being[i].vel_x * 2;
    var tailOffsetY_2 = being[i].vel_y * 2;
    ellipse(being[i].position.x - tailOffsetX_2, being[i].position.y - tailOffsetY_2, being[i].radius * 2, being[i].radius * 2);

    var tailOffsetX_3 = being[i].vel_x * 4;
    var tailOffsetY_3 = being[i].vel_y * 4;
    ellipse(being[i].position.x - tailOffsetX_3, being[i].position.y - tailOffsetY_3, being[i].radius * 2, being[i].radius * 2);
  }
}

function collisionCheck(obstacle) {
  for (let i = 0; i < being.length; i++) {
    let d = p5.Vector.dist(being[i].position, obstacle.position);
    if (d < being[i].radius + obstacle.radius) {
      let shift = p5.Vector.sub(being[i].position, obstacle.position);
      shift.setMag(being[i].radius + obstacle.radius - d);
      being[i].position.add(shift);
      being[i].vel_x = 0;
      being[i].vel_y = 0;
      obstacle.radius -= 0.5;
      randomMovement(being[i])
    }
  }
}

function beingMovement(beings) {

  var maxSpeed = beings.speed;

  if (beings.position.x < -10) {
    beings.position.x = resolutionX + 10;
  }

  if (beings.position.x > resolutionX + 10) {
    beings.position.x = -10;
  }

  if (beings.position.y < -10) {
    beings.position.y = resolutionY + 10;
  }

  if (beings.position.y > resolutionY + 10) {
    beings.position.y = -10;
  }

  if (beings.randomMovementX == 1 && beings.vel_x >= -maxSpeed) {
    beings.vel_x -= beings.accelerationX;
  }

  if (beings.randomMovementX == 2 && beings.vel_x <= maxSpeed) {
    beings.vel_x += beings.accelerationX;
  }

  if (beings.randomMovementX == 0) {
    if (beings.vel_x >= 0) {
      beings.vel_x += -beings.accelerationX;
    }

    if (beings.vel_x <= 0) {
      beings.vel_x += beings.accelerationX;
    }
  }

  if (beings.randomMovementY == 1 && beings.vel_y >= -maxSpeed) {
    beings.vel_y -= beings.accelerationY;
  }

  if (beings.randomMovementY == 2 && beings.vel_y <= maxSpeed) {
    beings.vel_y += beings.accelerationY;
  }

  if (beings.randomMovementY == 0) {
    if (beings.vel_y >= 0) {
      beings.vel_y += -beings.accelerationY;
    }

    if (beings.vel_y <= 0) {
      beings.vel_y += beings.accelerationY;
    }
  }

}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomMovement(beings) {
  beings.accelerationX = randomInt(0, 10) / 1000;
  beings.accelerationY = randomInt(0, 10) / 1000;
  if (randomInt(1, 2) == 1) {
    beings.randomMovementX = randomInt(0, 2);
    beings.randomMovementY = randomInt(0, 2);
  } else {
    beings.randomMovementX = 0;
    beings.randomMovementY = 0;
  }
}


setInterval(function () {
  for (let i = 0; i < being.length; i++) {
    randomMovement(being[i]);
  }
}, 2000);

for (let i = 0; i < being.length; i++) {
  randomMovement(being[i]);
}