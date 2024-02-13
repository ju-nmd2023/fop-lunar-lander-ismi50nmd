let flakes = [];
let gameActive = false;
let spaceshipX = 138;
let spaceshipY = 157;
let spaceshipYVelocity = 1;
let spaceshipYAccel = -0.3;
let spaceshipXVelocity = 0;

const iceberg1 = {
  x: 67,
  y: 540,
  width: 90,
  height: 142,
};

let gameOver = false;
let win = false;

function setup() {
  createCanvas(850, 700);

  // Snowflakes
  for (let i = 0; i < 350; i++) {
    const flake = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      alpha: Math.random(),
    };
    flakes.push(flake);
  }
}

function draw() {
  if (gameActive) {
    // Background
    noStroke();
    background(0, 0, 52);

    // Snowflakes
    for (let flake of flakes) {
      fill(255, 255, 255, Math.abs(Math.sin(flake.alpha)) * 200);
      ellipse(flake.x, flake.y, 7.5);

      if (flake.y > 670) {
        flake.y = Math.floor(Math.random() * height);
        flake.x = Math.floor(Math.random() * width);
      } else {
        flake.y = flake.y + 1.5;
      }
    }

    // Move the spaceship forward
    spaceshipX += spaceshipXVelocity;

    // Head of the spaceship
    fill(128, 128, 128);
    ellipse(spaceshipX, spaceshipY, 40, 60);

    // Body of the spaceship
    fill(128, 128, 128);
    ellipse(spaceshipX + 2, spaceshipY + 15, 150, 30);

    // Black line on spaceship
    stroke(0, 0, 0);
    strokeWeight(2);
    beginShape();
    vertex(spaceshipX - 19, spaceshipY + 1);
    bezierVertex(
      spaceshipX - 14,
      spaceshipY - 7,
      spaceshipX + 11,
      spaceshipY - 8,
      spaceshipX + 20,
      spaceshipY + 1
    );
    endShape();

    // Gravity
    spaceshipYVelocity += spaceshipYAccel;
    spaceshipY += spaceshipYVelocity;

    // To make the spaceship stay in the canvas
    spaceshipY = constrain(spaceshipY, 60, height - 60);

    // Design for the iceberg
    fill(255, 255, 255);
    stroke(255, 255, 255);
    strokeWeight(4);

    // First iceberg #1
    beginShape();
    vertex(67, 698);
    bezierVertex(107, 526, 168, 525, 210, 697);
    endShape();

    if (
      spaceshipX >= iceberg1.x &&
      spaceshipX <= iceberg1.x + iceberg1.width &&
      spaceshipY >= iceberg1.y - 2
    ) {
      if (spaceshipYVelocity < 0.7) {
        win = true;
      } else if (spaceshipYVelocity > 1.5) {
        gameOver = true;
      }
      spaceshipYVelocity = 0;
      spaceshipY = iceberg1.y;
    }

    if (gameOver) {
      textSize(55);
      fill(255, 0, 0);
      text("GAME OVER!", width / 2 - 140, height / 2);
    } else if (win) {
      textSize(44);
      fill(0, 255, 0);
      text("YOU WIN!", width / 2 - 130, height / 2);
    }
  } else {
    startScreen();
  }
}

function startScreen() {
  // First line on words
  background(0, 0, 0);
  fill(255, 255, 255);
  textSize(50);
  textStyle(BOLD);
  text("STARSHIP ICEBERG", 120, 220);

  // Second line of words
  fill(255, 0, 0);
  textSize(20);
  text("LAND THE STARSHIP ON THE MOUNTAIN", 170, 250);

  // Start
  fill(255, 255, 0);
  textSize(25);
  text("Press Anywhere To Start!", 220, 440);
}

// All functions
function mousePressed() {
  gameActive = true;
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    spaceshipYVelocity = 8;
  }
}
