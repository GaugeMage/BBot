exports.run = async(message) => {
    const Discord = require('discord.js');
    const locationCards = require('../cards/locationCards.json');

    let cardNames = [];
    let cardCosts = [];
    for(let i = 0; i < locationCards.length; i++){
        cardNames.push(locationCards[i].name);
        cardCosts.push(locationCards[i].cost);
    }

    const cardString = new Discord.MessageEmbed().
        setTitle('Location Cards').
        addFields(
            {name: 'Card Names', value: cardNames.join('\n'), inline: true},
            {name: 'Cost', value: cardCosts.join('\n'), inline: true},
        ).
        setColor('#ff0000');
    message.channel.send(cardString);
}