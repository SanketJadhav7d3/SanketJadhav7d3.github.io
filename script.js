
var canvas = document.getElementById("myCanvas");

var context = canvas.getContext("2d");

var cellSize = 10;

// rows and columns
const rows = 500;
const cols = 500;

//creating a two dimensional array for cells where the index position of 
//the elements is its position on the grid and the value stored defines whether it is alive or not
const create2DArray = () => {
    var cells = new Array(rows);
    for (let i = 0; i < rows; i++) {
        cells[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            cells[i][j] = 0;
        }
    }
    return cells;
}

// fill the canvas
// context.fillStyle = "rgba(0, 0, 0, 0.4)";
// context.fillRect(0, 0, canvas.width, canvas.height);

// method to randomly initialize elements of cells array
const generateRandom = () => {
    var cells = create2DArray();
    for (var i = 0; i < rows / 50; i += 1) {
        for (var j = 0; j < cols / 50; j += 1) {
            var a = Math.floor(Math.random() * 10); 
            if (a < 5) {
                cells[i][j] = 1;
            } 
        }
    }
    return cells;
}

const draw = (cells) => {
    // iterate through cells
    context.fillStyle = "rgba(57, 255, 20, 1)";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (cells[i][j] == 1) {
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                continue;
            }
            context.clearRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}

const neighbourInfo = (i, j, cells) => {
    var info = 0;
    for (var a = i - 1; a < (i + 2); a++) {
        for (var b = j - 1; b < (j + 2); b++) {
            if (a == i && b == j) { continue; }
            if (a < 0 || b < 0) { continue; }
            if (a >= rows || b >= cols) { continue; }
            if (typeof(cells[a][b]) === 'undefined') { continue; }
            info += cells[a][b];
        }
    }
    return info;
}

const update = (cells) => {
    var nextGen = create2DArray();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // underpopulation
            if (cells[i][j] == 1 && neighbourInfo(i, j, cells) < 2) {
                continue;
            }
            // overpopulation
            if (cells[i][j] == 1 && neighbourInfo(i, j, cells) > 3) {
                continue
            }

            // survival
            if (cells[i][j] == 1 && (neighbourInfo(i, j, cells) == 2 || neighbourInfo(i, j, cells) == 3)) {
                nextGen[i][j] = 1;
            }

            // reproducton
            if (cells[i][j] == 0 && neighbourInfo(i, j, cells) == 3) {
                nextGen[i][j] = 1;
            }
        }
    }
    return nextGen;
}

cells = generateRandom();

setInterval(() => {
    draw(cells);
    cells = update(cells);
}, 10);
