exports.run = async(id, resign, chesses, message) => {
    if(chesses[id] === undefined) return;
    var SIDENAMES = {w:'Black', b:'White'};
    var winner;
    if(resign) {
        winner = SIDENAMES[chesses[id].turn()] + ' wins by resignation!';
    } else if(chesses[id].isCheckmate()) {
        winner = SIDENAMES[chesses[id].turn()] + ' wins by checkmate!';
    } else if(chesses[id].isStalemate()) {
        winner = 'Draw by stalemate!';
    } else if(chesses[id].isThreefoldRepetition()) {
        winner = 'Draw by threefold repetition!';
    } else if(chesses[id].isInsufficientMaterial()) {
        winner = 'Draw by insufficient material!';
    } else if(chesses[id].isDraw()) {
        winner = 'Draw!';
    }
    message.channel.send('Game over: ' + winner + '\n' + chesses[id].pgn({newline_char: '\n'}));
    message.channel.send('https://media.tenor.com/sVNp04sBHkAAAAAC/lostbelt-kazuradrop.gif');
    delete chesses[id];
}