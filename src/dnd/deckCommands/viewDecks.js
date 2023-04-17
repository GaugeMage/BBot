exports.run = async(message) => {
    //User
    const tempUser = message.author.id;

    let user = null;

    //Check if user exists
    const userData = require('.../data/userData.json');
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

    //Lists all deck names in an embed
    const Discord = require('discord.js');
    const embed = new Discord.EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Decks')
        .addFields(
            {name : 'Deck Names:', value: user.decks.map(deck => deck.name).toString(), inline: true},
        )
        .setTimestamp();
    
    //Send embed
    message.channel.send({embeds: [embed]});
};