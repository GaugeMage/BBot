exports.run = async(message) => {
    //Creates an empty tictac toe board
    //The rules of tictactoe
    message.channel.send("Welcome to TicTacToe! Depending on a coinflip you may be 'X' or 'O'. X always goes first! To place your piece, use the bb!place command to place your piece at (1-1, 1-2, 1-3, 2-1, 2-2, 2-3, 3-1, 3-2, or 3-3'. The first number is the row and the last number is the column. For example if I want to place a piece in the 1st row and 2nd column it would be bb!place 1-2.")
    ticTacToeStarted = true;
    let board = [];
    for(let i = 0; i < 3; i++){
        board.push([]);
        for(let j = 0; j < 3; j++){
            board[i].push('     ');
        }
    }

    const printBoard = require('./printboard.js');
    message.channel.send(printBoard.run(board));

    let isX = false;

    //Determines who goes first.
    let turn = Math.floor(Math.random() * 2);
    if(turn === 0){
        message.channel.send('Coin landed on head so you go first! Therefore you are X. Use the bb!place command to place your piece at (1-1, 1-2, 1-3, 2-1, 2-2, 2-3, 3-1, 3-2, or 3-3');
        isX = false;
    } else {
        message.channel.send('I go first! Therefore I am X');
        isX = true;
        //Does first move:
        board[1][1] = ' X ';
        message.channel.send('I have moved');
        message.channel.send(printBoard.run(board));
    }

    return [ticTacToeStarted, isX, board];
};