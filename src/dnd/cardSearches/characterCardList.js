exports.run = async(message) => {
    const Discord = require('discord.js');
    const characterCards = require('../cards/characterCards.json');

    //Looks for all card names, cost, attack, and health and stores them inside an embed
    let cardNames = [];
    let cardCosts = [];
    let cardStats = [];
    for(let i = 0; i < characterCards.length; i++){
        cardNames.push(characterCards[i].name);
        cardCosts.push(characterCards[i].cost);
        cardStats.push(characterCards[i].attack + '/' + characterCards[i].health);
    }
    const cardString = new Discord.MessageEmbed().
        setTitle('Character Cards').
        addFields(
            {name: 'Card Names', value: cardNames.join('\n'), inline: true},
            {name: 'Cost', value: cardCosts.join('\n'), inline: true},
            {name: 'Stats', value: cardStats.join('\n'), inline: true},
        ).
        setColor('#ff0000');
    message.channel.send(cardString);
}