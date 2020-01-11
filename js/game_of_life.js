var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const cellDim = 10;

const iCellCount = Math.floor(canvas.width / cellDim);
const jCellCount = Math.floor(canvas.height / cellDim);

var mainBoard = initEmptyBoard();
setInitialBoardState(mainBoard);

function initEmptyBoard() {
    var board = new Array(iCellCount);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(jCellCount).fill(0);
    }
    return board;
}

function setInitialBoardState(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var randomState = Math.round(Math.random());
            board[i][j] = randomState;
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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
    drawBoard(mainBoard);
    console.log(mainBoard);
}

setInterval(draw, 100);