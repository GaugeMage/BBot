exports.run = (board, placer) => {

    const nonPlacer = placer === ' X ' ? ' O ' : ' X ';

    //Check rows
    for(let i = 0; i < 3; i++){
        //Check which row
        if((board[i][0] === placer && board[i][1] === placer && board[i][2] === '     ') || (board[i][0] === placer && board[i][2] === placer && board[i][1] === '     ') || (board[i][1] === placer && board[i][2] === placer && board[i][0] === '     ')){
            return [placer, 'row', i];
        } else if((board[i][0] === nonPlacer && board[i][1] === nonPlacer && board[i][2] === '     ') || (board[i][0] === nonPlacer && board[i][2] === nonPlacer && board[i][1] === '     ') || (board[i][1] === nonPlacer && board[i][2] === nonPlacer && board[i][0] === '     ')){
            return [nonPlacer, 'row', i];
        }
    }
    //Check columns
    for(let i = 0; i < 3; i++){
        //Check which column it is
        if((board[0][i] === placer && board[1][i] === placer && board[2][i] === '     ') || (board[0][i] === placer && board[2][i] === placer && board[1][i] === '     ') || (board[1][i] === placer && board[2][i] === placer && board[0][i] === '     ')){
            return [placer, 'col', i];
        } else if((board[0][i] === nonPlacer && board[1][i] === nonPlacer && board[2][i] === '     ') || (board[0][i] === nonPlacer && board[2][i] === nonPlacer && board[1][i] === '     ') || (board[1][i] === nonPlacer && board[2][i] === nonPlacer && board[0][i] === '     ')){
            return [nonPlacer, 'col', i];
        }
    }
    //Check diagonals
    if((board[0][0] === placer && board[1][1] === placer && board[2][2] === '     ') || (board[1][1] === placer && board[2][2] === placer && board[0][0] === '     ') || (board[0][0] === placer && board[2][2] === placer && board[1][1] === '     ')){
        return [placer, 'diag', 0];
    } else if((board[0][0] === nonPlacer && board[1][1] === nonPlacer && board[2][2] === '     ') || (board[1][1] === nonPlacer && board[2][2] === nonPlacer && board[0][0] === '     ') || (board[0][0] === nonPlacer && board[2][2] === nonPlacer && board[1][1] === '     ')){
        return [nonPlacer, 'diag', 0];
    } else if((board[0][2] === placer && board[1][1] === placer && board[2][0] === '     ') || (board[1][1] === placer && board[2][0] === placer && board[0][2] === '     ') || (board[0][2] === placer && board[2][0] === placer && board[1][1] === '     ')){
        return [placer, 'diag', 1];
    } else if((board[0][2] === nonPlacer && board[1][1] === nonPlacer && board[2][0] === '     ') || (board[1][1] === nonPlacer && board[2][0] === nonPlacer && board[0][2] === '     ') || (board[0][2] === nonPlacer && board[2][0] === nonPlacer && board[1][1] === '     ')){
        return [nonPlacer, 'diag', 1];
    }
    return false;
};