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

    //Ask for card name
    message.channel.send("What is the name of the card you want to remove from the deck **" + deck.name + "**?");
    const cardName = await message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 10000}).then(collected => {
        return collected.first().content;
    }).catch(() => {
        message.channel.send("You did not enter a card name in time!");
        return;
    });

    //Check if card exists
    let card = null;
    let cardIndex = null;
    for(let i = 0; i < deck.cards.length; i++){
        if(deck.cards[i] === cardName){
            card = deck.cards[i];
            cardIndex = i;
            break;
        }
        if(i === deck.cards.length - 1){
            message.channel.send("That card is not in the deck!");
            return;
        }
    }

    //Remove card from deck
    deck.cards.splice(cardIndex, 1);

    //Update user data
    userData[userIndex] = user;
    const fs = require('fs');
    fs.writeFile('./src/dnd/userData.json', JSON.stringify(userData), err => {
        if(err) console.log(err);
    }
    );

    message.channel.send("Card **" + card + "** has been removed from deck **" + deck.name + "**!");
};