exports.run = (message, args) => {
    //User
    const tempUser = message.author.id;

    let user = null;
    let userIndex = null;

    //Check if user exists
    const userData = require('.../data/userData.json');
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
    
    //Check if deck already exists
    for(let i = 0; i < user.decks.length; i++){
        if(user.decks[i]?.name === deckName){
            message.channel.send("You already have a deck with that name!");
            return;
        }
    }

    //Create deck
    const newDeck = {
        name: deckName,
        cards: [],
        isValid: false,
    }

    //Add deck to user
    userData[userIndex].decks.push(newDeck);

    //Save user
    const fs = require('fs');
    fs.writeFile('./src/data/userData.json', JSON.stringify(require('.../data/userData.json'), null, '\t'), (err) => {
        if(err) console.log(err);
    }
    );

    message.channel.send("Deck created!");
};