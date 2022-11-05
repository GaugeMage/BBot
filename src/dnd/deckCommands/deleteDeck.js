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

    //Deck Name
    const deckName = args.join(' ');

    //Check if deck exists
    let deck = null;
    let deckIndex = null;
    for(let i = 0; i < user.decks.length; i++){
        if(user.decks[i].name === deckName){
            deck = user.decks[i];
            deckIndex = i;
            break;
        }
        if(i === user.decks.length - 1){
            message.channel.send("You do not have a deck with that name!");
            return;
        }
    }

    //Delete deck
    userData[userIndex].decks.splice(deckIndex, 1);

    //Save user
    const fs = require('fs');
    fs.writeFile('./src/dnd/userData.json', JSON.stringify(require('../userData.json'), null, '\t'), (err) => {
        if(err) console.log(err);
    }
    );

    message.channel.send("Deck deleted!");
};