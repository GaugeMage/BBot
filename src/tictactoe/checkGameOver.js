exports.run = async(message, ticTacToeStarted, isX, board) => {
    //Check if there is a winner
    let botWins = false;
    let playerWins = false;
    for(let i = 0; i < 3; i++){
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2]){
            if(board[i][0] === ' X '){
                if(isX){
                    botWins = true;
                } else {
                    playerWins = true;
                }
                ticTacToeStarted = false;
            } else if(board[i][0] === ' O '){
                if(isX){
                    playerWins = true;
                } else {
                    botWins = true;
                }
                ticTacToeStarted = false;
            }
        }
        if(board[0][i] === board[1][i] && board[1][i] === board[2][i]){
            if(board[0][i] === ' X '){
                if(isX){
                    botWins = true;
                } else {
                    playerWins = true;
                }
                ticTacToeStarted = false;
            } else if(board[0][i] === ' O '){
                if(isX){
                    playerWins = true;
                } else {
                    botWins = true;
                }
                ticTacToeStarted = false;
            }
        }
    }
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2]){
        if(board[0][0] === ' X '){
            if(isX){
                botWins = true;
            } else {
                playerWins = true;
            }
            ticTacToeStarted = false;
        } else if(board[0][0] === ' O '){
            if(isX){
                playerWins = true;
            } else {
                botWins = true;
            }
            ticTacToeStarted = false;
        }
    }
    if(board[0][2] === board[1][1] && board[1][1] === board[2][0]){
        if(board[0][2] === ' X '){
            if(isX){
                botWins = true;
            } else {
                playerWins = true;
            }
            ticTacToeStarted = false;
        } else if(board[0][2] === ' O '){
            if(isX){
                playerWins = true;
            } else {
                botWins = true;
            }
            ticTacToeStarted = false;
        }
    }
    if(botWins){
        message.channel.send('BBot wins! :joy: :joy: :joy: The power of infinity is too much for you mere mortals to handle!');
        return ticTacToeStarted;
    } else if(playerWins){
        message.channel.send('You win! :sob: :sob: :sob: You got really lucky this time, but I will get you next time!');
        return ticTacToeStarted;
    }
    //Check if there is a tie
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] === '     '){
                return ticTacToeStarted;
            }
        }
    }
    message.channel.send('Tie game! :neutral_face: :neutral_face: :neutral_face: I guess you are pretty good after all!');
    ticTacToeStarted = false;

    return ticTacToeStarted;
}