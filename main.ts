

interface Field {
    x: number;
    y: number;
}

function nextMoveKnight(board: number[][], currentField: Field, move: number): Field | null {
    const x: number = currentField.x;
    const y: number = currentField.y;

    let newX: number | null = -1;
    let newY: number | null = -1;

    if (move == 0) {
        newX = x - 1;
        newY = y - 2;
    } else if (move == 1) {
        newX = x + 1;
        newY = y - 2;
    } else if (move == 2) {
        newX = x + 2;
        newY = y - 1;
    } else if (move == 3) {
        newX = x + 2;
        newY = y + 1;
    } else if (move == 4) {
        newX = x + 1;
        newY = y + 2;
    } else if (move == 5) {
        newX = x - 1;
        newY = y + 2;
    } else if (move == 6) {
        newX = x - 2;
        newY = y + 1;
    } else if (move == 7) {
        newX = x - 2;
        newY = y - 1;
    }

    if (0 <= newX && 0 <= newY && newX < board[0].length && newY < board.length) {
        return { x: newX, y: newY } as Field;
    }

    return null;
}


//TODO could call this with a callback for the move(it is the only dynamic thing about this
// get move order as a stack, array, list?
function findKnightPath(board: number[][], tryField: Field, level: number): boolean {
    if (level == board[0].length * board.length) {
        board[tryField.y][tryField.x] = level;
        return true;
    } else {
        board[tryField.y][tryField.x] = level;
        let found: boolean = false;
        let move: number = 0;

        // get a list of possible moves, order by number of possible moves from that position on
        // recurse of these moves
        while (!found && move < 8) {
            const newField: Field | null = nextMoveKnight(board, tryField, move);
            if (newField != null && board[newField.y][newField.x] == 0) {
                found = findKnightPath(board, newField, level + 1);
            }
            move++;
        }

        if (!found) {
            board[tryField.y][tryField.x] = 0;
        }

        return found;
    }
}

function solveForKnight(board: number[][], startField: Field): boolean {
    const found: boolean = findKnightPath(board, startField, 1);

    return found;
}

// init board
const board: number[][] = [];
const rows: number = 6;
const cols: number = 6;

for (let i: number = 0; i < rows; i++) {
    board[i] = [];
    for (let j: number = 0; j < cols; j++) {
        board[i][j] = 0;
    }
}


const found = solveForKnight(board, { x: 1, y: 0 } as Field);
console.table(board);
console.log("Found?", found);


// TEST MOVE CALC
// const field: Field = { x: 0, y: 0 } as Field;
// console.log("Field:", field);
// for (let i: number = 0; i < 8; ++i) {
//     const newField: Field | null = nextMoveKnight(board, field, i);
//     console.log("Move " + i + ":", newField);
// }

