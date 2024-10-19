class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.dirX = 0;
    this.dirY = 0;
    this.growing = false;
  }

  setDir(x, y) {
    this.dirX = x;
    this.dirY = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    head.x += this.dirX;
    head.y += this.dirY;

    if (!this.growing) {
      this.body.shift();
    } else {
      this.growing = false;
    }

    this.body.push(head);
  }

  grow() {
    this.growing = true;
    this.len++;
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;

    if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
      return true;
    }

    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === x && part.y === y) {
        return true;
      }
    }

    return false;
  }

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;

    if (x === pos.x && y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    let fade = false;
    let a = 255 / (this.body.length - 1);
    for (let i = 0; i < this.body.length - 1; i++) {
      if(fade){
          fill(0, 0, 0, (i + 1) * a);
      }
      else{
        fill(0);
      }
      noStroke();
      rect(
        this.body[i].x * scaleBy,
        this.body[i].y * scaleBy,
        scaleBy,
        scaleBy
      );
    }
    fill(0, 191, 255);
    noStroke();
    rect(
      this.body[this.body.length - 1].x * scaleBy,
      this.body[this.body.length - 1].y * scaleBy,
      scaleBy,
      scaleBy
    );
  }

  print() {
    let output = `Length: ${this.len} | Body: `;
    for (let i = 0; i < this.body.length; i++) {
      output += `(${this.body[i].x},${this.body[i].y})`;
      if (i < this.body.length - 1) {
        output += " -> ";
      }
    }
    console.log(output);
  }
}
