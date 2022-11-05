exports.run = async(client, message, args, dndGameStarted) => {
    if(dndGameStarted){
        message.channel.send("A game is already in progress!");
        return [dndGameStarted, null, null, null, null];
    }
    require('../helpers/checkArgs.js').run(args, message);
    const userData = require('./userData.json');
    
    let player1 = message.author.id;
    let player2 = args[0];

    let player1Exists = false;
    let player2Exists = false;

    //Check if both players exist

    for(let i = 0; i < userData.length; i++){
        if(userData[i].id === player1){
            player1Exists = true;
            user1 = userData[i];
        }
        if(userData[i].id === player2){
            player2Exists = true;
            user2 = userData[i];
        }
    }

    if(!player1Exists || !player2Exists){
        message.channel.send("One or both of the players are not in the database! Please use the command !registerD&D to add yourself to the database.");
        return [dndGameStarted, null, null, null, null];
    }


    if(player2[0] === '<' && player2[player2.length - 1] === '>'){
        player2 = player2.substring(2, player2.length - 1);
    }

    client.users.cache.get(player1).send("Pick what deck you would like to use: (If you don't know what decks you have, use the bb!decks command)");

    //Wait for player 1 to pick a deck
    let player1Deck = await client.users.cache.get(player1).dmChannel.awaitMessages(m => m.author.id === player1, {max: 1, time: 30000, errors: ['time']})
        .then(collected => {
            return collected.first().content;
        })
        .catch(collected => {
            message.channel.send("You didn't pick a deck in time!");
            return [dndGameStarted, null, null, null, null];
        });

    //Check if player 1 picked a deck that exists
    for(let i = 0; i < user1.decks.length; i++){
        if(user1.decks[i].name === player1Deck){
            player1Deck = user1.decks[i];
            break;
        }
        if(i === user1.decks.length - 1){
            message.channel.send("You do not have a deck with that name!");
            return [dndGameStarted, null, null, null, null];
        }
    }

    client.users.cache.get(player2).send("Pick what deck you would like to use: (If you don't know what decks you have, use the bb!decks command)");

    //Wait for player 2 to pick a deck
    let player2Deck = await client.users.cache.get(player2).dmChannel.awaitMessages(m => m.author.id === player2, {max: 1, time: 30000, errors: ['time']})
        .then(collected => {
            return collected.first().content;
        })
        .catch(collected => {
            message.channel.send("You didn't pick a deck in time!");
            return [dndGameStarted, null, null, null, null];
        });

    //Check if player 2 picked a deck that exists
    for(let i = 0; i < user2.decks.length; i++){
        if(user2.decks[i].name === player2Deck){
            player2Deck = user2.decks[i];
            break;
        }
        if(i === user2.decks.length - 1){
            message.channel.send("You do not have a deck with that name!");
            return [dndGameStarted, null, null, null, null];
        }
    }

    message.channel.send("Game started! " + user1.name + " vs " + user2.name);
    dndGameStarted = true;

    //Show the field

    return [dndGameStarted, player1, player2, player1Deck, player2Deck]
};