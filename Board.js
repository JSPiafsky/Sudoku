class Board {
    constructor(size) {
        this.cellArray = [];
        this.lineArray = [];
        this.size = size ** 2;
        this.selected = [{ pressedToggle: () => null }];
        this.createBoard();

    }

    createBoard() {
        let x_position;
        let y_position;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                x_position = i * 600 / this.size;
                y_position = j * 600 / this.size;

                //Create Cells and Push to array
                const currentCell = new Cell(this.size, { x: x_position, y: y_position });
                this.cellArray.push(currentCell);

                //Create horizontal Lines and Push to array
                if ((i === 0) && ((j % Math.sqrt(this.size) === 0)) && (j != 0)) {
                    const currentLine = new Line(0, y_position, this.size ** 4, y_position);
                    this.lineArray.push(currentLine);
                }
            }
            //Create vertical Lines and push to array
            if (((i % Math.sqrt(this.size) === 0)) && (i != 0)) {
                const currentLine = new Line(x_position, 0, x_position, this.size ** 4);
                this.lineArray.push(currentLine);
            }

        }

    }

    drawBoard() {
        textSize(40);
        // Draw Cells
        for (const cell of this.cellArray) {
            cell.drawCell();
        }

        // Draw Dividing Lines
        for (const lines of this.lineArray) {
            lines.drawLine();
        }
    }

    findCellFromPixels(pos) {
        for (const cell of this.cellArray) {
            if ((cell.pos.x < pos.x && pos.x < (cell.pos.x + cell.cellSize)) && (cell.pos.y < pos.y && pos.y < (cell.pos.y + cell.cellSize))) {
                return cell;
            }
        }
        return null;
    }

    findCellFromGameCoordinates(x, y) {
        return this.cellArray[x + this.size * y];
    }

    editSelectedCell(num) {
        if ('id' in this.selected[0]) {
            if (this.selected[0].isEditable) {
                this.selected[0].displayNumber = num;
            }
        }
        this.drawBoard();
    }

    getState = {

        // Currently index based off of a scalar/collapsed coordinates,
        // might be easier to rewrite so that it is based off of 2 coords or polymorphic
        megaCell: (index) => {
            let megaCellSize = Math.sqrt(this.size);
            let pos = (input) => {
                return [Math.floor(input / megaCellSize), input % megaCellSize];
            }

            let state = [];

            for (let i = 0; i < this.size; i++) {
                state.push(this.findCellFromGameCoordinates(...pos(index + i)));
            }

            return state;

        },

        // index currently starts at 0, so rows and cells are labeled 0 - 8 from top left
        row: (index) => {
            let state = [];
            for (let i = index; i < this.cellArray.length; i += this.size) {
                state.push(this.cellArray[i]);
            }
            return state;
        },

        column: (index) => {
            let start = index * this.size;
            return this.cellArray.slice(start, start + this.size);
        }
    }

    setState(state) {
        for (let i = 0; i < this.cellArray.length; i++) {
            if (state[i] != null) {
                this.cellArray[i].isEditable = false;
            }
            this.cellArray[i].displayNumber = state[i];
        }
    }

    checkIfValid(x_pos, y_pos) {
        // Function returns a list of booleans where duplicates values are true and non-dupes are false
        var findDupes = (cellGroup) => {
            return cellGroup.map((x) => {
                return (x === null) ? false : (cellGroup.filter(y => y === x).length > 1)
            });
        }

        var checkMegaCell = (index) => {
            return findDupes(
                this.getState.megaCell(index).map(x => x.displayNumber)
            );
        }

        var checkRow = (row) => {
            return findDupes(
                this.getState.row(row).map(x => x.displayNumber)
            );
        }

        var checkColumn = (col) => {
            return findDupes(
                this.getState.col(col).map(x => x.displayNumber)
            );
        }

        return checkRow(y_pos);
    }

    generateBoard(mode) {
        //todo
    }

    solveBoard() {
        //todo
    }

    update() {
        if (this.selected.length >= 2) {
            try {
                this.selected[1].pressedToggle();
                this.selected.reverse().pop().pressedToggle();
            } catch (TypeError) {
                null
            } finally {
                this.drawBoard();
            }


        }
    }
}