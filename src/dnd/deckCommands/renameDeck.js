exports.run = async(message, args) => {
    //User
    const tempUser = message.author.id;

    let user = null;

    //Check if user exists
    const userData = require('../userData.json');
    for(let i = 0; i < userData.length; i++){
        if(userData[i].id === tempUser){
            user = userData[i];
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

    //Ask user what to rename deck to
    message.channel.send("What would you like to rename the deck **" + deck.name + "** to?");
    const newDeckName = await message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 10000}).then(collected => {
        return collected.first().content;
    }).catch(() => {
        message.channel.send("You did not enter a deck name in time!");
        return;
    });

    //Check if deck name is already taken
    for(let i = 0; i < user.decks.length; i++){
        if(user.decks[i]?.name === newDeckName){
            message.channel.send("You already have a deck with that name!");
            return;
        }
    }

    //Rename deck
    user.decks[deckIndex].name =newDeckName;

    //Save changes
    const fs = require('fs');
    fs.writeFile('./src/dnd/userData.json', JSON.stringify(userData, null, '\t'), err => {
        if(err) throw err;
    });

    message.channel.send("Deck renamed to **" + newDeckName + "**!");
}