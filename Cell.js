//Simple Generator Used to create consecutive ids for elements
function* infinite() {
    let index = -1;
    while (true) {
        yield index++;
    }
}


class Cell {

    static idGen = infinite();

    constructor(size, pos, index_pos) {
        this.id = Cell.idGen.next().value;
        this.displayNumber = null;
        this.size = size;
        this.cellSize = 600 / this.size;
        this.selected = false;
        this.isEditable = true;
        this.dupe = false;
        

        this.color = colorPalette.cell;
        this.textColor = colorPalette.text;
        [this.index_x, this.index_y] = index_pos;
        this.pos = pos;
        this.rowSelected = false;
        this.colSelected = false;
        this.megaCellSelected = false;

    }

    pressedToggle() {
        // If this cell is not selected and function is called, it is selected otherwise, it is unselected
        this.selected = this.selected ? false : true;
    }

    checkState() {
        if (this.selected && this.isEditable) {
            this.color = colorPalette.selectedCell;
        } else if (this.dupe) {
            this.color = colorPalette.dupeCell;
        } else {
            this.color = colorPalette.cell;
        }
    }

    drawCell() {
        this.checkState();
        fill(...this.color);
        square(this.pos.x, this.pos.y, this.cellSize);
        //Try to draw number on square, if number object is null draw nothing
        try {
            fill(...this.textColor);
            // Generalize this so it makes sense
            text(this.displayNumber, this.pos.x + this.cellSize ** 1 / 2 - 10, this.pos.y + this.cellSize ** 1 / 2 + 15);
        } catch (TypeError) {
            //console.log(this.number);
        }
    }

    valueEntered() {
        if (this.value() === '1') {
            console.log('works');
        }

    }
}