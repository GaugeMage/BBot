exports.run = async(message, args) => {
    //User
    const tempUser = message.author.id;

    let user = null;
    let userIndex = null;

    //Check if user exists
    const userData = require('../userData.json');
    for(let i = 0; i < userData.length; i++){
        if(userData[i].id === tempUser){
            user = userData[i];
            userIndex = i;
            break;
        }
        if(i === userData.length - 1){
            message.channel.send("You are not in the database! Please use the command !registerD&D to add yourself to the database.");
            return;
        }
    }

    const deckName = args.join(' ');

    //Check if deck exists
    let deck = null;
    let deckIndex = null;
    for(let i = 0; i < user.decks.length; i++){
        if(user.decks[i]?.name === deckName){
            deck = user.decks[i];
            deckIndex = i;
            break;
        }
        if(i === user.decks.length - 1){
            message.channel.send("You do not have a deck with that name!");
            return;
        }
    }

    //Check if deck is full
    if(deck.cards.length === 15){
        message.channel.send("Deck is full!");
        return;
    }

    message.channel.send("What is the name of the card you want to add to the deck **" + deck.name + "**?");

    //Ask user for card name
    const cardName = await message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 10000}).then(collected => {
        return collected.first().content;
    }).catch(() => {
        message.channel.send("You did not enter a card name in time!");
        return;
    });


    //Check if card exists
    let card = null;
    for(let i = 0; i < user.cards.length; i++){
        if(user.cards[i] === cardName){
            card = user.cards[i];
            break;
        }
        if(i === user.cards.length - 1){
            message.channel.send("You do not have a card with that name!");
            return;
        }
    }

    //Check if card is already in deck
    for(let i = 0; i < deck.cards.length; i++){
        if(deck.cards[i] === cardName){
            message.channel.send("Card is already in deck!");
            return;
        }
        if(i === deck.cards.length - 1){
            break;
        }
    }

    //Add card to deck
    userData[userIndex].decks[deckIndex].cards.push(card);

    if(userData[userIndex].decks[deckIndex].cards.length === 15){
        userData[userIndex].decks[deckIndex].isValid = true;
    }

    //Save user
    const fs = require('fs');
    fs.writeFile('./src/dnd/userData.json', JSON.stringify(require('../userData.json'), null, '\t'), (err) => {
        if(err) console.log(err);
    }
    );

    message.channel.send("Card added to the deck **" + deck.name + "**!");
}