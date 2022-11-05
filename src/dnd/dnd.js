exports.run = async(client, message, args, dndGameStarted) => {
    if(dndGameStarted){
        message.channel.send("A game is already in progress!");
        return [dndGameStarted, null, null];
    }
    require('../helpers/checkArgs.js').run(args, message);
    let player1 = message.author.id;
    let player2 = args[0];

    if(player2[0] === '<' && player2[player2.length - 1] === '>'){
        player2 = player2.substring(2, player2.length - 1);
    }

    client.users.cache.get(player1).send("Pick what deck you would like to use: (If you don't know what decks you have, use the bb!decks command)");
    client.users.cache.get(player2).send("Pick what deck you would like to use: (If you don't know what decks you have, use the bb!decks command)");

    return [dndGameStarted, player1, player2]
};