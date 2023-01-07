exports.run = async(message) => {
    const Discord = require('discord.js');
    const equipmentCards = require('../cards/equipmentCards.json');

    let cardNames = [];
    let cardCosts = [];
    let cardStats = [];
    for(let i = 0; i < equipmentCards.length; i++){
        cardNames.push(equipmentCards[i]?.name);
        cardCosts.push(equipmentCards[i].cost);
        cardStats.push(equipmentCards[i].attack + '/' + equipmentCards[i].health);
    }

    const cardString = new Discord.EmbedBuilder().
        setTitle('Equipment Cards').
        addFields(
            {name: 'Card Names', value: cardNames.join('\n').toString(), inline: true},
            {name: 'Cost', value: cardCosts.join('\n').toString(), inline: true},
            {name: 'Stats', value: cardStats.join('\n').toString(), inline: true},
        ).
        setColor('#ff0000');
    message.channel.send({embeds: [cardString]});
}