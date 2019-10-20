const cols = 40;
const rows = 40;
let grid = new Array(rows);
let w, h;
let visited = [];
let lookingAt = [];
let start, end, current;

function setup() {

    createCanvas(800, 800);
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
    
    start = grid[20][20];
    end = grid[cols - 2][rows - 2];
    start.g = 0;
    start.prev = start;
    current = start;
    lookingAt.push(start);

    //ensure start and end are not walls
    end.wall = start.wall = false;
}

function removeElement(arr, element) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == element) {
            arr.splice(i,1);
        }
    }
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
    }
}

function heuristic(cell, end) {
    return abs(cell.i - end.i) + abs(cell.j - end.j);
}

function gScoreWeighted() {

}


function draw() {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++ ) {
            if(grid[i][j].wall)
                grid[i][j].show(0, 0, 0);
            else
                grid[i][j].show(255, 255, 255);
        }
    }

    for(let i = 0; i < visited.length; i++) {
        visited[i].show(0, 0, 255);
    }

    for(let i = 0; i < lookingAt.length; i++) {
        lookingAt[i].show(255,165,0);
    }

    start.show(0, 255, 0);
    end.show(255, 0, 0);
    
    //console.log('current', current.i, current.j);
    
    if(current === end) {
        console.log('finished');
        shortestPath(start, end);
        console.log('path shown');
        noLoop();
        return;
    }

    visited.push(current);
    removeElement(lookingAt, current);

    let neighbours = current.getNeighboursWithDiagonals();
    for(let i = 0; i < neighbours.length; i++) {
        let neighbour = neighbours[i];
        if(visited.includes(neighbour)) {
            continue;
        }

        let tentativeG = current.g + 1;

        // consider node only if its not a wall and if its not being looked at already
        if(!lookingAt.includes(neighbour) && !neighbour.wall) { 
            lookingAt.push(neighbour);
        }

        if(tentativeG < neighbour.g) {
            neighbour.g = tentativeG; 
            neighbour.prev = current;
            neighbour.f = neighbour.g + heuristic(neighbour, end); // total cost estimate
        }
    }
    
    let minNode = 0;
    let minDist = Infinity;

    if(lookingAt.length == 0){
        // found shortest path tree
        noLoop();
        return;
    } else {
        for(let i = 0; i < lookingAt.length; i++) {
            if(lookingAt[i].f < lookingAt[minNode].f) {
                minNode = i;
                minDist = lookingAt[i].f;
            }
        }
        current = lookingAt[minNode];
    }

    if(minDist == Infinity) {
        console.log('no path to end node !!');
        noLoop();
        return;
    }
}