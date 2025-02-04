exports.run = async(message) => {
    //User
    const tempUser = message.author.id;

    //Check if user exists
    const userData = require('../data/players.json');
    for(let i = 0; i < userData.length; i++){
        if(userData[i].id === tempUser){
            user = userData[i];
            break;
        }
        if(i === userData.length - 1){
            message.channel.send("You are not in the database! Please use the bb!register command to add yourself to the database.");
            return;
        }
    }

    //Remove 1 to SI
    user.supremeInspirations--;

    //Create embed
    const Discord = require('discord.js');
    const embed = new Discord.EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(message.author.username)
        .addFields(
            {name : 'Supreme Inspirations:', value: user.supremeInspirations.toString()},
        )
        .setTimestamp();
    
    //Send embed
    message.channel.send("Done! You now have " + user.supremeInspirations + " Supreme Inspirations.");
    message.channel.send({embeds: [embed]});

    //Save user
    const fs = require('fs');
    fs.writeFile('./src/sicounter/players.json', JSON.stringify(require('../data/players.json'), null, '\t'), (err) => {
        if(err) console.log(err);
    });
}