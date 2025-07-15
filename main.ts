

interface Field {
    x: number;
    y: number;
}

interface PossibleMove {
    moveCount: number;
    field: Field;
}

function nextMovesFromCurrentPosition(board: number[][], currentField: Field): PossibleMove[] {
    let nextMoves: PossibleMove[] = [];
    const xMovement: number[] = [-1, 1, 2, 2, 1, -1, -2, -2];
    const yMovement: number[] = [-2, -2, -1, +1, +2, +2, +1, -1];

    let index: number = 0;
    while (index < xMovement.length) {
        const x: number = currentField.x + xMovement[index];
        const y: number = currentField.y + yMovement[index];

        if (0 <= x && 0 <= y && x < board[0].length && y < board.length) {
            if (board[y][x] == 0) {
                nextMoves.push({ "moveCount": 0, "field": { x: x, y: y } as Field });
            }
        }

        index++;
    }

    return nextMoves;
}

function nextKnightMoves(board: number[][], currentField: Field): Field[] {
    let possibleMoves: PossibleMove[] = nextMovesFromCurrentPosition(board, currentField);

    let index: number = 0;
    while (index < possibleMoves.length) {
        const possibleMove: Field = possibleMoves[index].field;
        board[possibleMove.y][possibleMove.x] = 22;
        possibleMoves[index].moveCount = nextMovesFromCurrentPosition(board, possibleMoves[index].field).length;
        board[possibleMove.y][possibleMove.x] = 0;

        index++;
    }

    //sort by moveCount
    possibleMoves = possibleMoves.sort((a, b) => {
        if (a.moveCount == b.moveCount) {
            return 0;
        }

        return a.moveCount > b.moveCount ? 1 : -1;
    });

    return possibleMoves.map(possibleMove => possibleMove.field);
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

        const moves: Field[] = nextKnightMoves(board, tryField);
        let index: number = 0;
        console.table(board);
        while (!found && index < moves.length) {
            found = findKnightPath(board, moves[index], level + 1);
            index++;
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
const rows: number = 11;
const cols: number = 11;

for (let i: number = 0; i < rows; i++) {
    board[i] = [];
    for (let j: number = 0; j < cols; j++) {
        board[i][j] = 0;
    }
}


const found = solveForKnight(board, { x: 3, y: 3 } as Field);
console.table(board);
console.log("Found?", found);


// TEST MOVE CALC
// const field: Field = { x: 0, y: 0 } as Field;
// console.log("Field:", field);
// for (let i: number = 0; i < 8; ++i) {
//     const newField: Field | null = nextMoveKnight(board, field, i);
//     console.log("Move " + i + ":", newField);
// }

