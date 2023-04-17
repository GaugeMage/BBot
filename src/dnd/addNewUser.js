exports.run = async(message) => {
    //Checks if user is already in userData.json file
    const userData = require('../data/userData.json');
    for(let i = 0; i < userData.length; i++){
        if(userData[i].id === message.author.id){
            message.channel.send("You are already in the database!");
            return;
        }
    }

    //Adds user to userData.json file
    const newUser = {
        id: message.author.id,
        name: message.author.username,
        decks: [],
        wins: 0,
        losses: 0,
        draws: 0,
        cards: [],
        destinyFragments: 0,
        soulFragments: 0,
        packs: []
    }

    userData.push(newUser);
    const fs = require('fs');
    fs.writeFile('./src/data/userData.json', JSON.stringify(require('../data/userData.json'), null, '\t'), (err) => {if(err) console.log(err);});
    message.channel.send("You have been added to the database!");
}