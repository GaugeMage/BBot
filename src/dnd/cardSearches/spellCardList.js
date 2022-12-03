exports.run = async(message) => {
    const Discord = require('discord.js');
    const spellCards = require('../cards/spellCards.json');

    let cardNames = [];
    let cardCosts = [];
    for(let i = 0; i < spellCards.length; i++){
        cardNames.push(spellCards[i].name);
        cardCosts.push(spellCards[i].cost);
    }

    const cardString = new Discord.MessageEmbed().
        setTitle('Spell Cards').
        addFields(
            {name: 'Card Names', value: cardNames.join('\n'), inline: true},
            {name: 'Cost', value: cardCosts.join('\n'), inline: true},
        ).
        setColor('#ff0000');
    message.channel.send(cardString);
}