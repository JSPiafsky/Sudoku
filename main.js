let gameBoard;
let mousePressX, mousePressY;

let startBoard = ['3', '1', null, null, null, null, null, null, null, '5', null, '2', null, null, '7', null, '1', null, null, null, '7', '1', '9', '5', '2', '6', '3', null, null, null, null, '8', '3', null, null, null, '4', null, '3', '9', null, '6', '7', null, '2', null, null, null, '2', '5', null, null, null, null, '7', '2', '8', '6', '3', '9', '5', null, null, null, '9', null, '4', null, null, '6', null, '7', null, null, null, null, null, null, null, '2', '8'];
let solution = ['3', '1', '9', '8', '6', '2', '4', '7', '5', '5', '6', '2', '3', '4', '7', '8', '1', '9', '8', '4', '7', '1', '9', '5', '2', '6', '3', '2', '5', '6', '7', '8', '3', '1', '9', '4', '4', '8', '3', '9', '1', '6', '7', '5', '2', '9', '7', '1', '2', '5', '4', '3', '8', '6', '7', '2', '8', '6', '3', '9', '5', '4', '1', '1', '9', '5', '4', '2', '8', '6', '3', '7', '6', '3', '4', '5', '7', '1', '9', '2', '8'];

let colorPalette = {
    cell: [255, 255, 255],
    selectedCell: [219, 255, 255],
    text: [90, 90, 90],
    nonEditableText: [0, 0, 0],
    dupeCell: [245, 88, 99],
    dupeSelectedCell: [219, 255, 255],

    //Not Implemented:
    bigLine: [0, 0, 0],
    smallLine: [0, 0, 0],
    selectedRow: [240, 250, 250],
    selectedCol: [240, 250, 250],
    selectedMega: [240, 250, 250],
}

function setup() {
    //Instantiate game board object with a Mega Square size of 3
    gameBoard = new Board(3);
    var canvas = createCanvas(600, 600);
    canvas.parent('Sudoku');
    background(220);

    gameBoard.setState(startBoard);
    gameBoard.drawBoard();
}

function draw() {
    gameBoard.update();
}

function mousePressed() {
    let PressedCell = gameBoard.findCellFromPixels({ x: mouseX, y: mouseY });
    if (PressedCell === null) {
        gameBoard.selected.push({ pressed: null });
    } else if (gameBoard.selected[0] != PressedCell) {
        gameBoard.selected.push(PressedCell);
    }
}

function keyPressed() {
    if (!(isNaN(parseInt(key))) && (key !== '0')) {
        gameBoard.editSelectedCell(key);
    } else if (keyCode === 8) {
        gameBoard.editSelectedCell(null);
    }
}
