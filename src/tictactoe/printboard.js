exports.run = (board) => {
    //Creates an empty tictac toe board
    let temp = "Board: \n";
    for(let i = 0; i < 3; i++){
        temp += board[i][0] + "|" + board[i][1] + "|" + board[i][2] + "\n";
    }
    return temp;
};