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

    //Check if deck is valid
    if(deck.isValid === false){
        message.channel.send("Deck is not valid!");
        return;
    }

    //Create embed
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(deck.name)
        .setAuthor(message.author.username, message.author.avatarURL())
        .addFields(
            {name : 'Cards:', value: deck.cards, inline: true},
            {name: 'Deck Size', value: deck.cards.length, inline: true},
        )
        .setTimestamp();

    //Send embed
    message.channel.send(embed);

};