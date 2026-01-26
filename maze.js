const mazeContainer = document.getElementById("maze-container");
const rows = 20;
const cols = 20;
let maze = [];
let startCell, targetCell;

// Initialize and generate maze
function generateMaze() {
    maze = [];
    mazeContainer.innerHTML = '';

    // Create grid and randomly assign walls and paths
    for (let row = 0; row < rows; row++) {
        let mazeRow = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Randomly assign walls and paths
            if (Math.random() > 0.7) {
                cell.classList.add('wall');
                mazeRow.push(1); // 1 represents wall
            } else {
                cell.classList.add('path');
                mazeRow.push(0); // 0 represents path
            }
            mazeContainer.appendChild(cell);
        }
        //Ex: mazeRow = [0,0,1,1]
        //Ex: maze  = [[0,0,1,1]] for i=0
        //remember we are not copying the mazeRow into maze, we are giving the reference. Any changes in mazeRow will affect maze
        //Ex: maze will be 2D array [[0,0,1,1,],[1,1,0,1]...]; 
        maze.push(mazeRow);
    }

    // Set random start and target cells
    startCell = [Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)];
    targetCell = [Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)];
    
    setCell(startCell[0], startCell[1], 'start');
    setCell(targetCell[0], targetCell[1], 'target');
}

//set the cell class to give it properties
function setCell(row, col, type) {
    const index = row * cols + col;
    const cell = mazeContainer.children[index];
    cell.classList.remove('path', 'wall', 'start', 'target', 'visited', 'final-path');
    cell.classList.add(type);
}

// Breadth-First Search (BFS) to find the target and animate the solution path
function bfs() {
    const queue = [[startCell[0], startCell[1]]];
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

    visited[startCell[0]][startCell[1]] = true;

    const interval = setInterval(() => {
        if (queue.length === 0) {
            clearInterval(interval);
            alert('No solution found!');
            return;
        }

        const [row, col] = queue.shift();

        if (row === targetCell[0] && col === targetCell[1]) {
            clearInterval(interval);
            animateFinalPath(parent, row, col);
            return;
        }

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (isInBounds(newRow, newCol) && !visited[newRow][newCol] && maze[newRow][newCol] === 0) {
                visited[newRow][newCol] = true;
                parent[newRow][newCol] = [row, col]; // Track the parent for backtracking
                queue.push([newRow, newCol]);
                setCell(newRow, newCol, 'visited');
            }
        }
    }, 70); // Adjust the interval speed for faster/slower animations
}

// Depth-First Search (DFS) to find the target and animate the solution path
function dfs() {
    const stack = [[startCell[0], startCell[1]]];
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

    visited[startCell[0]][startCell[1]] = true;

    const interval = setInterval(() => {
        if (stack.length === 0) {
            clearInterval(interval);
            alert('No solution found!');
            return;
        }

        const [row, col] = stack.pop();

        if (row === targetCell[0] && col === targetCell[1]) {
            clearInterval(interval);
            animateFinalPath(parent, row, col);
            return;
        }

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (isInBounds(newRow, newCol) && !visited[newRow][newCol] && maze[newRow][newCol] === 0) {
                visited[newRow][newCol] = true;
                parent[newRow][newCol] = [row, col]; 
                stack.push([newRow, newCol]);
                setCell(newRow, newCol, 'visited');
            }
        }
    }, 70); 
}


// Animate the final path by backtracking from the target to the start
function animateFinalPath(parent, row, col) {
    const path = [];
    let current = [row, col];

    while (current) {
        path.push(current);
        current = parent[current[0]][current[1]];
    }

    // Reverse the path to go from start to target
    path.reverse();

    let index = 0;
    const interval = setInterval(() => {
        if (index >= path.length) {
            clearInterval(interval);
            alert('Path found!');
            return;
        }

        const [pathRow, pathCol] = path[index];
        setCell(pathRow, pathCol, 'final-path');
        index++;
    }, 100);
}

// Check if the cell is within the maze bounds
function isInBounds(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

//to redirect to sorting page
function sorting() {
    window.location.href = 'index.html';
}  

// Generate initial maze on load
generateMaze();
