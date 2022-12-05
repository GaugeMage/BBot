const { MessageAttachment } = require("discord.js");

exports.run = async(id, resign, chesses, message) => {
    if(chesses[id] === undefined) return;
    var SIDENAMES = {w:'Black', b:'White'};
    var winner;
    if(resign) {
        winner = SIDENAMES[chesses[id].turn()] + ' wins by resignation!';
    } else if(chesses[id].isCheckmate()) {
        winner = SIDENAMES[chesses[id].turn()] + ' wins by checkmate!';
        if(SIDENAMES[chesses[id].turn()] === 'White') {
            MessageAttachment.channel.send("*You have won it seems.... this was unexpected... and rather.... UPSETTING. The Cosmos would not have been happy with this response. However, not all was for naught as we were able to regress the archive. Less data for them is a win for me! You have proven yourself capable. Let us continue with this war shall we. I invite you to do the bb!theWar command.*")
        }
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