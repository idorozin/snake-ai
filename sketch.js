
let snake;
let scaleBy = 100;
let apple;
let w;
let h;

function setup() {
  w = 6; 
  h = 6;
  scaleBy = min(100, windowWidth / w / 1.5);
  var c = createCanvas(scaleBy * w, scaleBy * h);
  c.parent('canvas-container');
  frameRate(20);
  snake = new Snake();
  ai = new AI(snake);
  ai.calculatePath();
  newApple();
}


function newApple() {
    let x = floor(random(w));
    let y = floor(random(h));
    apple = createVector(x, y);
}

function draw() {
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
  rect(apple.x * scaleBy, apple.y * scaleBy, scaleBy, scaleBy);
}
