
let snake;
let scaleBy = 100;
let apple;
let w;
let h;
let fadeCheckbox, skeletonCheckbox, speedSlider, spacingSlider, resetButton;
let fade = false, skeleton = false, spacing = 0;

function setup() {
  w = 6;
  h = 6;
  scaleBy = min(100, windowWidth / w / 1.5);
  var c = createCanvas(scaleBy * w, scaleBy * h);
  c.parent('canvas-container');
  frameRate(20);
  createControls();
  snake = new Snake(5, 5);
  ai = new AI(snake);
  ai.calculatePath();
  newApple();
}

function createControls() {
  resetButton = createButton(" Reset");
  resetButton.mousePressed(reset);
  fadeCheckbox = createCheckbox(" Fade");
  skeletonCheckbox = createCheckbox(" Skeleton");
  var speedLable = createP("Speed: ");
  speedSlider = createSlider(1, 60, 5);
  var spacingLable = createP("Spacing: ");
  spacingSlider = createSlider(0, scaleBy - 1, 0);
  resetButton.parent('controls');
  speedLable.parent('controls');
  speedSlider.parent('controls');
  spacingLable.parent('controls');
  spacingSlider.parent('controls');
  fadeCheckbox.parent('controls');
  skeletonCheckbox.parent('controls');
}

function reset() {
  snake = new Snake();
  ai.reset(snake);
  ai.calculatePath();
  newApple();
  loop();
}

function newApple() {
  let x = floor(random(w));
  let y = floor(random(h));
  apple = createVector(x, y);
}

function draw() {
  fade = fadeCheckbox.checked();
  skeleton = skeletonCheckbox.checked();
  spacing = spacingSlider.value();
  frameRate(speedSlider.value());

  background(220);
  if (snake.eat(apple)) {
    if (snake.body.length + 1 == w * h) {
      ai.makeMove();
      snake.update();
      snake.show();
      noLoop();
      return;
    }
    newApple();
  }
  ai.makeMove();
  snake.update();
  snake.show();

  if (snake.endGame()) {
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect((apple.x * scaleBy) + (spacing / 2), (apple.y * scaleBy) + (spacing / 2), scaleBy - spacing, scaleBy - spacing);
}
