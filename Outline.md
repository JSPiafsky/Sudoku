class Game board
    Vars:
        size of mega-cell (int)
        size of board = size of mega-cell ** 4 (int)
        state of solution (class or array)
        current state of board (class or array)
        solved (bool)
    
    Funcs:
        draw board (():void):
            draw current state
            if solved:
                write solved

        check if solved (():bool):
            if current state == solution:
                return true
            else:
                return false

        check if num valid (pos, num : bool):
            for cell in row:
                check
            for cell in col:
                check
            for cell in mega-cell:
                check

            return true

class mega-cell
    Vars: 
        size (int)
        pos (x, y)
        cells (array or class)
    funcs:
        check if valid (():bool):
            int prod
            for cell in this.cells:
                prod += cell.value
            if prod = 1 * 2 * 3 * 4...:
                return true
            else
                return false

        draw (():void):
            draw big square
            for cell in cells:
                cell.draw(i % size, i // size)



Generation Function

Start with full solution, think of as mod group
Convulute with n mod operations that preserve symetry:
operations:
%Megacell shift (any direction)
%addition on all cells
%multiplication, as long as its not a mutliple of %
any func that maps to bijection should work