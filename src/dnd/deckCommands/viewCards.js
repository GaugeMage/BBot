exports.run = async(message) => {
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

    //Lists all cards that the user has in an embed
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Card Collection:')
        .setAuthor(message.author.username, message.author.avatarURL())
        .addFields(
            {name : 'Cards:', value: user.cards.map(card => card), inline: true},
        )
        .setTimestamp();
    
    //Send embed
    message.channel.send(embed);
}