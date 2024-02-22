let flakes = [];
let gameActive = false;
let endScreen = false;
let spaceshipX = 138;
let spaceshipY = 157;
let spaceshipYVelocity = 1;
let spaceshipYAccel = -0.3;
let spaceshipXVelocity = 0;
let gameOver = false;
let win = false;

const iceberg1 = {
  x: 67,
  y: 540,
  width: 90,
  height: 142,
};

// Background for the game
function setup() {
  createCanvas(700, 680);

  // Snowflakes
  for (let i = 0; i < 700; i++) {
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
    runGame();
  } else {
    startScreen();
  }

  if (endScreen) {
    displayEndScreen();
  }
}

function runGame() {
  // Background
  noStroke();
  background(0, 0, 52);

  // Snowflakes
  for (let flake of flakes) {
    fill(255, 255, 255, Math.abs(Math.sin(flake.alpha)) * 200);
    ellipse(flake.x, flake.y, 3);

    flake.y = (flake.y + 1.9) % height;
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

  // Color for the iceberg
  fill(224, 224, 224);
  noStroke();

  // First iceberg #1
  beginShape();
  vertex(67, 698);
  bezierVertex(107, 526, 168, 525, 210, 697);
  endShape();

  //Background iceberg
  beginShape();
  fill(192, 192, 192);
  vertex(503, 681);
  bezierVertex(613, 189, 681, 194, 761, 682);
  endShape();

  //Second Iceberg)
  fill(224, 224, 224);
  beginShape();
  vertex(376, 698);
  bezierVertex(456, 327, 477, 326, 592, 697);
  endShape();

  // Moon
  noStroke();
  fill(64, 64, 64);
  ellipse(594, 83, 100);
  stroke(32, 32, 32);
  strokeWeight(1);
  ellipse(573, 66, 10);
  ellipse(619, 84, 20);
  ellipse(585, 101, 12);
  ellipse(597, 44, 10);
  ellipse(610, 116, 7);
  ellipse(595, 78, 6);

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

  if (gameOver || win) {
    endScreen = true;
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

  // StartScreen
  fill(255, 255, 0);
  textSize(25);
  text("Press Anywhere To Start!", 220, 440);
}

function mousePressed() {
  if (gameActive) {
    if (endScreen) {
      if (
        mouseX > width / 2 - 60 &&
        mouseX < width / 2 + 60 &&
        mouseY > height / 2 + 30 &&
        mouseY < height / 2 + 70
      ) {
        resetGame();
      }
    }
  } else {
    gameActive = true;
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    spaceshipYVelocity = 8;
  }
}

function displayEndScreen() {
  background(0, 0, 0);

  // WIN and LOSE design
  textSize(70);
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  if (gameOver) {
    fill(255, 0, 0);
    text("GAME OVER", width / 2, height / 2 - 20);
  } else if (win) {
    fill(76, 153, 0);
    text("YOU WIN!", width / 2, height / 2 - 20);
  }

  // Restart button
  textSize(22);
  fill(255);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height / 2 + 50, 150, 50, 5);
  fill(0);
  text("RESTART ↩︎", width / 2, height / 2 + 50);
}

function resetGame() {
  gameOver = false;
  win = false;
  spaceshipX = 138;
  spaceshipY = 157;
  spaceshipYVelocity = 1;
  spaceshipYAccel = -0.3;
  spaceshipXVelocity = 0;

  // Reset the end screen flag
  endScreen = false;
}
