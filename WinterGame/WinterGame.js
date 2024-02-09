let flakes = [];

for (let i = 0; i < 250; i++) {
  const flake = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
    alpha: Math.random(),
  };
  flakes.push(flake);
}

function draw() {
  noStroke();
  background(0, 0, 52);

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

  // Design for the icebergs
  fill(255, 255, 255);
  stroke(255, 255, 255);
  strokeWeight(4);

  // First iceberg #1
  beginShape();
  vertex(67, 698);
  bezierVertex(107, 526, 168, 525, 210, 697);
  endShape();

  // Second iceberg #2
  beginShape();
  vertex(409, 694);
  bezierVertex(452, 240, 597, 239, 690, 696);
  endShape();

  // Third iceberg #3
  beginShape();
  vertex(928, 700);
  bezierVertex(992, 213, 1065, 212, 1151, 697);
  endShape();

  // Fourth iceberg #4
  beginShape();
  vertex(1500, 690);
  bezierVertex(//828, 370, 715, 363, 1700, 690);
  //endShape();
}

// Playing Charachter

