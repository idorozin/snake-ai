class AI {
  constructor(snake) {
    this.snake = snake;
    this.step = 0;
    this.path = [];
  }

  findHamiltonianCycle(startX, startY, endX, endY) {
    //dfs
    const paths = [];
    const stack = [[startX, startY, [], new Set([[startX, startY].toString()])]];
    const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    const targetLength = w * h - 1;  // Using global w and h

    while (stack.length > 0) {
        const [x, y, currentPath, visited] = stack.pop();
        
        if (x === endX && y === endY) {
            paths.push(currentPath);
            if (currentPath.length === targetLength) {
                return [currentPath];  // Found a complete Hamiltonian cycle
            }
            continue;
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            const coordKey = [newX, newY].toString();
            
            if (newY >= 0 && newY < h && 
                newX >= 0 && newX < w && 
                !visited.has(coordKey)) {
                
                const newVisited = new Set(visited);
                newVisited.add(coordKey);
                const newPath = [...currentPath, [dx, dy]];
                stack.push([newX, newY, newPath, newVisited]);
            }
        }
    }

    if (paths.length > 0) {
        const longestLength = Math.max(...paths.map(path => path.length));
        return paths.filter(path => path.length === longestLength);
    }
    return paths;
}


  calculatePath() {
    let paths = this.findHamiltonianCycle(this.snake.body[0].x, this.snake.body[0].y, this.snake.body[0].x -1, this.snake.body[0].y);
    this.path = paths[0];
    this.path = [...this.path, [1, 0]];
  }


  // Execute the next move in the path
  makeMove() {
    if (this.path) {
      this.snake.setDir(this.path[this.step % (this.path.length)][0], this.path[this.step % (this.path.length)][1] );
      this.step++;
    } else {
      console.warn("Path step exceeded or no valid path set.");
    }
  }
}
