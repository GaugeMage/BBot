exports.run = (board) => {
    //Check rows
    for(let i = 0; i < 3; i++){
        //Check which row
        if((board[i][0] === ' X ' && board[i][1] === ' X ' && board[i][2] === '     ') || (board[i][0] === ' X ' && board[i][2] === ' X ' && board[i][1] === '     ') || (board[i][1] === ' X ' && board[i][2] === ' X ' && board[i][0] === '     ')){
            return [' X ', 'row', i];
        } else if((board[i][0] === ' O ' && board[i][1] === ' O ' && board[i][2] === '     ') || (board[i][0] === ' O ' && board[i][2] === ' O ' && board[i][1] === '     ') || (board[i][1] === ' O ' && board[i][2] === ' O ' && board[i][0] === '     ')){
            return [' O ', 'row', i];
        }
    }
    //Check columns
    for(let i = 0; i < 3; i++){
        //Check which column it is
        if((board[0][i] === ' X ' && board[1][i] === ' X ' && board[2][i] === '     ') || (board[0][i] === ' X ' && board[2][i] === ' X ' && board[1][i] === '     ') || (board[1][i] === ' X ' && board[2][i] === ' X ' && board[0][i] === '     ')){
            return [' X ', 'col', i];
        } else if((board[0][i] === ' O ' && board[1][i] === ' O ' && board[2][i] === '     ') || (board[0][i] === ' O ' && board[2][i] === ' O ' && board[1][i] === '     ') || (board[1][i] === ' O ' && board[2][i] === ' O ' && board[0][i] === '     ')){
            return [' O ', 'col', i];
        }
    }
    //Check diagonals
    if((board[0][0] === ' X ' && board[1][1] === ' X ' && board[2][2] === '     ') || (board[1][1] === ' X ' && board[2][2] === ' X ' && board[0][0] === '     ') || (board[0][0] === ' X ' && board[2][2] === ' X ' && board[1][1] === '     ')){
        return [' X ', 'diag', 0];
    } else if((board[0][0] === ' O ' && board[1][1] === ' O ' && board[2][2] === '     ') || (board[1][1] === ' O ' && board[2][2] === ' O ' && board[0][0] === '     ') || (board[0][0] === ' O ' && board[2][2] === ' O ' && board[1][1] === '     ')){
        return [' O ', 'diag', 0];
    } else if((board[0][2] === ' X ' && board[1][1] === ' X ' && board[2][0] === '     ') || (board[1][1] === ' X ' && board[2][0] === ' X ' && board[0][2] === '     ') || (board[0][2] === ' X ' && board[2][0] === ' X ' && board[1][1] === '     ')){
        return [' X ', 'diag', 1];
    } else if((board[0][2] === ' O ' && board[1][1] === ' O ' && board[2][0] === '     ') || (board[1][1] === ' O ' && board[2][0] === ' O ' && board[0][2] === '     ') || (board[0][2] === ' O ' && board[2][0] === ' O ' && board[1][1] === '     ')){
        return [' O ', 'diag', 1];
    }
    return false;
};