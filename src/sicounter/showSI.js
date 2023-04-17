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
    message.channel.send({embeds: [embed]});
}