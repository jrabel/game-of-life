var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = document.getElementById("boardCanvas").clientWidth;
canvas.height = document.getElementById("boardCanvas").clientHeight;

const cellDim = 10;

const iCellCount = Math.floor(canvas.width / cellDim);
const jCellCount = Math.floor(canvas.height / cellDim);

var mainBoard = initEmptyBoard();
randomizeBoardState(mainBoard);

var playing = true;

function initEmptyBoard() {
    var board = new Array(iCellCount);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(jCellCount).fill(0);
    }
    return board;
}

function randomizeBoardState(board) {
    var slider = document.getElementById("randomDensity");
    var density = slider.value / 100;

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var randomState = Math.random() <= density;
            board[i][j] = randomState;
        }
    }
}

function createBoardDeepCopy(board) {
    var boardCopy = new Array(board.length);
    for (var i = 0; i < boardCopy.length; i++) {
        boardCopy[i] = board[i].slice();
    }
    return boardCopy;
}

function getLivingNeighborCount(i, j, board) {
    var livingNeighborCount = 0;
    // NW
    if (i > 0) {
        if (j > 0)
            livingNeighborCount += board[i - 1][j - 1];
        // N
        livingNeighborCount += board[i - 1][j];
        // NE
        if (j < (board[i].length - 1))
            livingNeighborCount += board[i - 1][j + 1];
    }

    // W
    if (j > 0)
        livingNeighborCount += board[i][j - 1];
    // E
    if (j < (board[i].length - 1))
        livingNeighborCount += board[i][j + 1];

    if (i < (board.length - 1)) {
        // SW
        if (j > 0)
            livingNeighborCount += board[i + 1][j - 1];
        // S
        livingNeighborCount += board[i + 1][j];
        // SE
        if (j < (board[i].length - 1))
            livingNeighborCount += board[i + 1][j + 1];
    }

    return livingNeighborCount;
}

function updateBoard(board) {
    var updatedBoard = createBoardDeepCopy(board);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var livingNeighborCount = getLivingNeighborCount(i, j, board);
            if (board[i][j]) {
                if (!((livingNeighborCount == 2) || (livingNeighborCount == 3))) updatedBoard[i][j] = 0;
            }
            else {
                if (livingNeighborCount == 3) updatedBoard[i][j] = 1;
            }
        }
    }
    return updatedBoard;
}

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

function drawBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var x = i * cellDim;
            var y = j * cellDim;
            ctx.beginPath();
            ctx.rect(x, y, cellDim, cellDim);

            var fillColor;
            if (board[i][j]) fillColor = '#000000';
            else fillColor = '#FFFFFF';

            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (playing)
        mainBoard = updateBoard(mainBoard);
    drawBoard(mainBoard);
}

function playButtonClicked() {
    playing = true;
}

function pauseButtonClicked() {
    playing = false;
}

function randomizeStateButtonClicked() {
    playing = false
    randomizeBoardState(mainBoard);
}

setInterval(draw, 100);