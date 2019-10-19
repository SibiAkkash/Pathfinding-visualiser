const cols = 20;
const rows = 20;
let grid = new Array(rows);
let w, h;
let visited = [];
let lookingAt = [];
let start, end, current;

function removeElement(arr, element) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == element) {
            arr.splice(i,1);
        }
    }
}

class Cell {
    constructor(i,j) {
        this.i = i;
        this.j = j;
        this.prev = -1;
        this.dist = Infinity;
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

function setup() {
    createCanvas(400, 400);
    w = width / cols;
    h = height / rows;

    background(0);

    for(let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++ ) {
            grid[i][j] = new Cell(i, j);
        }
    }
    start = grid[3][3];
    end = grid[15][15];
    start.dist = 0;
    start.prev = start;
    current = start;
    lookingAt.push(start);
}

function shortestPath(start, end) {
    let current = end.prev;
    let path = [];
    while(current.prev != current) {
        path.unshift(current);
        current = current.prev;
    }
    for(let i = 0; i < path.length; i++) {
        path[i].show(255,255,51);
        console.log(path[i].i, path[i].j);
    }
}

function draw() {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++ ) {
            grid[i][j].show(255, 255, 255);
        }
    }
    for(let i = 0; i < visited.length; i++) {
        visited[i].show(0, 0, 255);
    }
    for(let i = 0; i < lookingAt.length; i++) {
        lookingAt[i].show(0, 0, 255);
    }
    start.show(0, 255, 0);
    end.show(255, 0, 0);
    
    console.log('current', current.i, current.j);
    if(current === end) {
        console.log('finished');
        shortestPath(start, end);
        noLoop();
    }
    let neighbours = current.getNeighboursWithDiagonals();
    for(let i = 0; i < neighbours.length; i++) {
        neighbour = neighbours[i];
        if(visited.includes(neighbour)) {
            continue;
        }
        if(!lookingAt.includes(neighbour)) {
            lookingAt.push(neighbour);
        }
        let tentativeDist = current.dist + 1;
        if(tentativeDist < neighbours[i].dist) {
            neighbours[i].dist = tentativeDist;
            neighbours[i].prev = current;
        }
    }
    visited.push(current);
    removeElement(lookingAt, current);
    let minNode = -1;
    let minDist = Infinity;
    for(let i = 0; i < lookingAt.length; i++) {
        if(lookingAt[i].dist < minDist) {
            minDist = lookingAt[i].dist;
            minNode = lookingAt[i];
        }
    }
    current = minNode;
    /* console.log('visited ', visited);
    console.log('looking at', lookingAt); */
    //console.log('im here')
    

    if(!lookingAt){
        noLoop();
    }
}