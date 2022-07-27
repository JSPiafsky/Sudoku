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
                const currentCell = new Cell(this.size, { x: x_position, y: y_position }, [i, j]);
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
            cell.dupe = this.checkIfInvalid(cell.index_x, cell.index_y);
            cell.drawCell();
        }

        // Draw Dividing Lines
        for (const lines of this.lineArray) {
            lines.drawLine();
        }
    }

    checkIfWon () {
        for (const cell of this.cellArray) {
            if (this.checkIfInvalid(cell.index_x, cell.index_y)){
                return false;
            }
        }
        return true;
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

    // Function returns a list of booleans where duplicates values are true and non-dupes are false
    findDupes(cellGroup) {
        return cellGroup.map((x) => {
            return (x === null) ? false : (cellGroup.filter(y => y === x).length > 1);
        });
    }

    checkIfInvalid(x_pos, y_pos, debug = false) {
        // Takes some index and determines wether the mega-cell there contains duplicate numbers
        var checkMegaCell = (index) => {
            return this.findDupes(
                this.getState.megaCell(index).map(x => x.displayNumber)
            );
        }

        var checkRow = (row) => {
            return this.findDupes(
                this.getState.row(row).map(x => x.displayNumber)
            );
        }

        var checkColumn = (col) => {
            return this.findDupes(
                this.getState.column(col).map(x => x.displayNumber)
            );
        }
        if (debug) {
            console.log("megaCell: " + (Math.floor(x_pos / 3) + Math.floor(y_pos / 3)));
            console.log(checkMegaCell((x_pos + y_pos * this.size ** 1/2)));
        }
        //checkMegaCell((x_pos % 3), Math.floor(y_pos / 3))
        // x and y switched because... its complicated: essentially y designates what row its in, but the cell is the xth object of that row and vice versa
        return (checkColumn(x_pos)[y_pos] || checkRow(y_pos)[x_pos]);
    }

    generateBoard(mode) {
        //todo
    }

    solveBoard() {
        //todo
    }

    update() {
        if (!(this.cellArray.map(x => x.displayNumber).includes(null))){
            if (this.checkIfWon()){
                console.log("You Won!");
            }
        }

        // See if the user has inputted anything aka if anything has changed
        if (this.selected.length >= 2) {
            try {
                this.selected[1].pressedToggle();
                let temp = this.selected.reverse().pop();
                temp.pressedToggle();
            } catch (TypeError) {
                null
            } finally {
                
                this.drawBoard();
            }


        }
    }
}