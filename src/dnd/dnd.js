const { SystemChannelFlags } = require('discord.js');

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

    
    if(player2[0] === '<' && player2[player2.length - 1] === '>'){
        player2 = player2.substring(2, player2.length - 1);
    }

    //Check if both players exist
    for(let i = 0; i < userData.length; i++){
        if(userData[i].id === player1){
            player1Exists = true;
            player1 = userData[i];
        }
        if(userData[i].id === player2){
            player2Exists = true;
            player2 = userData[i];
        }
    }

    if(!player1Exists || !player2Exists){
        message.channel.send("One or both of the players are not in the database! Please use the command !registerD&D to add yourself to the database.");
        return [dndGameStarted, null, null, null, null];
    }

    await client.users.cache.get(player1.id).send("Pick what deck you would like to use: (If you don't know what decks you have, use the bb!decks command)");
    // message.channel.send("Player 1: Pick what deck you would like to use: (If you don't know what decks you have, use the bb!decks command)");
    //Wait for player 1 to pick a deck
    let player1Deck = await message.author.dmChannel.awaitMessages(m => m.author.id === player1.id, {max: 1, time: 30000, errors: ['time']})
        .then(collected => {
            return collected.first().content;
        })
        .catch(collected => {
            message.channel.send("You did not enter a deck name in time!");
            return null;
        });

    if(player1Deck === null){
        return [dndGameStarted, null, null, null, null];
    }

    //Check if player 1 picked a deck that exists
    for(let i = 0; i < player1.decks.length; i++){
        if(player1.decks[i].name === player1Deck){
            if(player1.decks[i].isValid === false){
                client.users.cache.get(player1.id).send("That deck is not valid!  Please fill this deck with the appropriate amount of cards");
                return [dndGameStarted, null, null, null, null];
            }
            player1Deck = player1.decks[i];
            break;
        }
        if(i === player1.decks.length - 1){
            client.users.cache.get(player1.id).send("You do not have a deck with that name!");
            return [dndGameStarted, null, null, null, null];
        }
    }

    await client.users.cache.get(player1.id).send("Deck successfully chosen!");

    await client.users.cache.get(player2.id).send("Pick what deck you would like to use: (If you don't know what decks you have, use the bb!decks command)");

    //Wait for player 2 to pick a deck
    let player2Deck = await client.users.cache.get(player2.id).dmChannel.awaitMessages(m => m.author.id === player2.id, {max: 1, time: 30000, errors: ['time']})
        .then(collected => {
            return collected.first().content;
        })
        .catch(collected => {
            message.channel.send("You didn't pick a deck in time!");
            return null;
        });
    
    if(player2Deck === null){
        return [dndGameStarted, null, null, null, null];
    }

    //Check if player 2 picked a deck that exists
    for(let i = 0; i < player2.decks.length; i++){
        if(player2.decks[i].name === player2Deck){
            if(player2.decks[i].isValid == false){
                client.users.cache.get(player2.id).send("That deck is not valid! Please fill this deck with the appropriate amount of cards");
                return [dndGameStarted, null, null, null, null];
            }
            player2Deck = player2.decks[i];
            break;
        }
        if(i === player2.decks.length - 1){
            client.users.cache.get(player2.id).send("You do not have a deck with that name!");
            return [dndGameStarted, null, null, null, null];
        }
    }

    await client.users.cache.get(player1.id).send("Deck successfully chosen!");

    message.channel.send("Game started! " + player1.name + " vs " + player2.name);
    dndGameStarted = true;
    let fieldSize = 6;
    //Fill the fields with their respective numbers
    let player1Field = [];
    let player2Field = [];
    let player1SubField = [];
    let player2SubField = [];

    //Check if either player 1 or player 2 has a deck which contains the BB card    
    if(player1Deck.cards.includes("BB") || player2Deck.cards.includes("BB")){
        message.channel.send("One of the players has a BB card in their deck! This means that both player's fields can contain 8 cards.");
        fieldSize = 8;
    }

    for(let i = 0; i < fieldSize; i++){
        player1Field.push(null);
        player2Field.push(null);
        player1SubField.push(null);
        player2SubField.push(null);
    }

    let player1WorldHP = 25;
    let player2WorldHP = 25;
    let player1Gold = 0;
    let player2Gold = 0;
    let player1Hand = [];
    let player2Hand = [];
    let player1HandSize = player1Hand.length;
    let player2HandSize = player1Hand.length;
    let player1DeckSize = player1Deck.cards.length;
    let player2DeckSize = player2Deck.cards.length;

    player1 = {
        name: player1.name,
        id: player1.id,
        deck: player1Deck,
        field: player1Field,
        subField: player1SubField,
        worldHP: player1WorldHP,
        gold: player1Gold,
        hand: player1Hand,
        deckSize: player1DeckSize,
        handSize: player1HandSize,
    }

    player2 = {
        name: player2.name,
        id: player2.id,
        deck: player2Deck,
        field: player2Field,
        subField: player2SubField,
        worldHP: player2WorldHP,
        gold: player2Gold,
        hand: player2Hand,
        deckSize: player2DeckSize,
        handSize: player2HandSize,
    }

    let isPlayer1Turn = true;

    const showField = require('./gameCommands/showField.js');
    const drawCard = require('./gameCommands/drawCard.js');
    const shuffleDeck = require('./gameCommands/shuffleDeck.js');
    const openingHand = require('./gameCommands/openingHand.js');

    //Opening hand
    shuffleDeck.run(player1);
    shuffleDeck.run(player2);

    player1 = openingHand.run(client, message, player1);
    player2 = openingHand.run(client, message, player2);

    //Gameplay loop
    while(player1WorldHP > 0 && player2WorldHP > 0){
        player1.gold += player1.gold + 1;
        player2.gold += player2.gold + 1;
        showField.run(message, player1, player2);
        let playerChosen = player1;
        if(!isPlayer1Turn){
            playerChosen = player2;
        }

        //The player chosen draws a card
        playerChosen = drawCard.run(message, playerChosen);

        message.channel.send("It is " + playerChosen.name + "'s turn! What would you like to do?");
    }



    // return [dndGameStarted, player1, player2, player1Deck, player2Deck]
};