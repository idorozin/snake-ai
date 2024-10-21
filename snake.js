class Snake {
  constructor(x, y) {
    if (x !== undefined && y !== undefined) {
      this.initializeBody(x, y);
    } else {
      // this way we can priotize positions that produce the intresting paths
      let positions = [[3, 3], [3, 3], [3, 3], [3, 3], [5, 3], [5, 5], [5, 1], [3, 1], [5, 2], [3, 5], [3, 4], [2, 5], [2, 4], [2, 3]];
      let rnd = random(positions);  // Select a random position
      this.initializeBody(rnd[0], rnd[1]);
    }
  }

  initializeBody(x, y) {
    this.body = [];
    this.body[0] = createVector(x, y);
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
    let a = 255 / (this.body.length - 1);
    for (let i = 0; i < this.body.length - 1; i++) {
      if (fade) {
        fill(0, 0, 0, (i + 1) * a);
      }
      else {
        fill(0);
      }
      noStroke();
      rect(
        (this.body[i].x * scaleBy) + (spacing / 2),
        (this.body[i].y * scaleBy) + (spacing / 2),
        scaleBy - spacing,
        scaleBy - spacing
      );
    }
    fill(0, 191, 255);
    noStroke();
    rect(
      (this.body[this.body.length - 1].x * scaleBy) + (spacing / 2),
      (this.body[this.body.length - 1].y * scaleBy) + (spacing / 2),
      scaleBy - spacing,
      scaleBy - spacing
    );
    if (skeleton) {
      stroke(0, 255, 0);
      strokeWeight(2);
      for (let i = 1; i < this.body.length; i++) {
        line(
          this.body[i - 1].x * scaleBy + (scaleBy / 2), this.body[i - 1].y * scaleBy + (scaleBy / 2),
          this.body[i].x * scaleBy + (scaleBy / 2), this.body[i].y * scaleBy + (scaleBy / 2),
        );
      }
    }
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
