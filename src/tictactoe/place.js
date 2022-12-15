exports.run = async(message, args, ticTacToeStarted, isX, board) => {
    //Check if game is started
    if(!ticTacToeStarted){
        message.channel.send('You must start a game first!');
        return [ticTacToeStarted, isX, board];
    }

    require('../helpers/checkArgs.js').run(args, message);
    //Check if args are in the format of 1-1b
    if(args[0].length !== 3){
        message.channel.send('Invalid format! Please use the format row-column');
        return [ticTacToeStarted, isX, board];
    } else if(args[0][1] !== '-'){
        message.channel.send('Invalid format! Please use the format row-column');
        return [ticTacToeStarted, isX, board];
    } else if(args[0][0] < 1 || args[0][0] > 3){
        message.channel.send('Invalid format! Please use the format row-column');
        return [ticTacToeStarted, isX, board];
    } else if(args[0][2] < 1 || args[0][2] > 3){
        message.channel.send('Invalid format! Please use the format row-column');
        return [ticTacToeStarted, isX, board];
    }
    //Check if the user is X or O
    const temp = args[0].split('-');
    const row = parseInt(temp[0] - 1);
    const col = parseInt(temp[1] - 1);

    const printBoard = require('./printboard.js');
    const checkGameOver = require('./checkGameOver.js');

    if(!isX){
        //Check if the spot is empty
        if(board[row][col] === '     '){
            board[row][col] = ' X ';
            message.channel.send('You have moved');
            message.channel.send(printBoard.run(board));
        } else {
            message.channel.send('That spot is already taken!');
            return [ticTacToeStarted, isX, board];
        }
    } else {
        //Check if the spot is empty
        if(board[row][col] === '     '){
            board[row][col] = ' O ';
            message.channel.send('You have moved');
            message.channel.send(printBoard.run(board));
        } else {
            message.channel.send('That spot is already taken!');
            return [ticTacToeStarted, isX, board];
        }
    }
    
    ticTacToeStarted = await checkGameOver.run(message, ticTacToeStarted, isX, board);

    //Bot's turn
    if(ticTacToeStarted){
        message.channel.send('My turn!');
        //Check if someone is about to win
        const placer = isX ? ' X ' : ' O ';
        let temp = require('./checkWin.js').run(board, placer);
        console.log("Check Win Result: " + temp);
        if(temp != false){
            if((temp[0] === ' X ' && isX) || (temp[0] === ' O ' && !isX)){
                if(temp[1] === 'row'){
                    board[temp[2]][0] = temp[0];
                    board[temp[2]][1] = temp[0];
                    board[temp[2]][2] = temp[0];
                } else if(temp[1] === 'col'){
                    board[0][temp[2]] = temp[0];
                    board[1][temp[2]] = temp[0];
                    board[2][temp[2]] = temp[0];
                } else if(temp[1] === 'diag'){
                    if(temp[2] === 0){
                        board[0][0] = temp[0];
                        board[1][1] = temp[0];
                        board[2][2] = temp[0];
                    } else {
                        board[0][2] = temp[0];
                        board[1][1] = temp[0];
                        board[2][0] = temp[0];
                    }
                }
            } else {
                //Stop opponent from winning
                if(temp[1] === 'row'){
                    if(board[temp[2]][0] === '     '){
                        board[temp[2]][0] = placer;
                    } else if(board[temp[2]][1] === '     '){
                        board[temp[2]][1] = placer;
                    } else {
                        board[temp[2]][2] = placer;
                    }
                } else if(temp[1] === 'col'){
                    if(board[0][temp[2]] === '     '){
                        board[0][temp[2]] = placer;
                    } else if(board[1][temp[2]] === '     '){
                        board[1][temp[2]] = placer;
                    } else {
                        board[2][temp[2]] = placer;
                    }
                } else if(temp[1] === 'diag'){
                    if(temp[2] === 0){
                        if(board[0][0] === '     '){
                            board[0][0] = placer;
                        } else if(board[1][1] === '     '){
                            board[1][1] = placer;
                        } else {
                            board[2][2] = placer;
                        }
                    } else {
                        if(board[0][2] === '     '){
                            board[0][2] = placer;
                        } else if(board[1][1] === '     '){
                            board[1][1] = placer;
                        } else {
                            board[2][0] = placer;
                        }
                    }
                }
            }
        } else {
            //Check if a corner is taken by opponent
            let isPlaced = false;
            if((board[0][0] === ' X ' && !isX) || (board[0][0] === ' O ' && isX)){
                if(board[2][2] === '     '){
                    board[2][2] = placer;
                    isPlaced = true;
                }
            } else if((board[0][2] === ' X ' && !isX) || (board[0][2] === ' O ' && isX)){
                if(board[2][0] === '     '){
                    board[2][0] = placer;
                    isPlaced = true;
                }
            } else if((board[2][0] === ' X ' && !isX) || (board[2][0] === ' O ' && isX)){
                if(board[0][2] === '     '){
                    board[0][2] = placer;
                    isPlaced = true;
                }
            } else if((board[2][2] === ' X ' && !isX) || (board[2][2] === ' O ' && isX)){
                if(board[0][0] === '     '){
                    board[0][0] = placer;
                    isPlaced = true;
                }
            }

            if(!isPlaced){
                //Check if the center is empty
                if(board[1][1] === '     '){
                    board[1][1] = placer;
                } else {
                    //Check if a corner is empty
                    if(board[0][0] === '     '){
                        board[0][0] = placer;
                    } else if(board[0][2] === '     '){
                        board[0][2] = placer;
                    } else if(board[2][0] === '     '){
                        board[2][0] = placer;
                    } else if(board[2][2] === '     '){
                        board[2][2] = placer;
                    } else {
                        //Check if a side is empty
                        if(board[0][1] === '     '){
                            board[0][1] = placer;
                        } else if(board[1][0] === '     '){
                            board[1][0] = placer;
                        } else if(board[1][2] === '     '){
                            board[1][2] = placer;
                        } else if(board[2][1] === '     '){
                            board[2][1] = placer;
                        }
                    }
                }
            }
        }
        message.channel.send(printBoard.run(board));
        await checkGameOver.run(message, ticTacToeStarted, isX, board);
    }
    return [ticTacToeStarted, isX, board];
};