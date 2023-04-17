exports.run = async(message) => {
    //Checks if user is already in players.json file
    const userData = require('../data/players.json');
    for(let i = 0; i < userData.length; i++){
        if(userData[i].id === message.author.id){
            message.channel.send("You are already in the database!");
            return;
        }
    }

    //Adds user to players.json file
    const newUser = {
        id: message.author.id,
        name: message.author.username,
        supremeInspirations: 0
    }

    userData.push(newUser);
    const fs = require('fs');
    fs.writeFile('./src/sicounter/players.json', JSON.stringify(require('../data/players.json'), null, '\t'), (err) => {if(err) console.log(err);});
    message.channel.send("You have been added to the database!");
}