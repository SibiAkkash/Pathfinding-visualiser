class Cell {
    constructor(i,j) {
        this.i = i;
        this.j = j;
        this.prev = -1;
        this.f = Infinity;
        this.g = Infinity;
        this.wall = false;
        if(random(1) < 0.3) {
            this.wall = true;
        }
    }
    show(r, g, b) {
        fill(r, g, b);
        stroke(0);
        rect(this.i * w, this. j * h, w, h);
    } 
    getNeighbours() {
        let neighboursList = [];
        let i = this.i;
        let j = this.j;
        if(this.i > 0) {
            neighboursList.push(grid[i - 1][j]);
        }
        if(this.j > 0) {
            neighboursList.push(grid[i][j - 1]);
        }
        if(this.i < rows - 1) {
            neighboursList.push(grid[i + 1][j]);
        }
        if(this.j < cols - 1) {
            neighboursList.push(grid[i][j + 1]);
        }
        return neighboursList;
    }

    getNeighboursWithDiagonals() {
        let neighboursList = [];
        let i = this.i;
        let j = this.j;
        if(i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
            ;
        } else {
            neighboursList.push(grid[i][j - 1]);
            neighboursList.push(grid[i][j + 1]);
            neighboursList.push(grid[i - 1][j]);
            neighboursList.push(grid[i + 1][j]);
            neighboursList.push(grid[i - 1][j - 1]);
            neighboursList.push(grid[i - 1][j + 1]);
            neighboursList.push(grid[i + 1][j - 1]);
            neighboursList.push(grid[i + 1][j + 1]);            
        }
        return neighboursList;
    }
}