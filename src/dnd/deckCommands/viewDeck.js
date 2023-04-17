exports.run = async(message, args) => {
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

    //Deck Name
    const deckName = args.join(' ');

    //Check if deck exists
    let deck = null;
    for(let i = 0; i < user.decks.length; i++){
        if(user.decks[i]?.name === deckName){
            deck = user.decks[i];
            break;
        }
        if(i === user.decks.length - 1){
            message.channel.send("You do not have a deck with that name!");
            return;
        }
    }

    //Create embed
    const Discord = require('discord.js');
    const embed = new Discord.EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(deck.name)
        .addFields(
            {name : 'Cards:', value: deck.cards.toString(), inline: true},
            {name: 'Deck Size', value: deck.cards.length.toString(), inline: true},
        )
        .setTimestamp();

    //Send embed
    message.channel.send({embeds: [embed]});
};