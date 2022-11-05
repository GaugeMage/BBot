exports.run = async(message, args) => {
    const Discord = require('discord.js');
    const cardName = args.join(' ');
    const locationCards = require('../cards/locationCards.json');

    for(let i = 0; i < locationCards.length; i++){
        let card = locationCards[i];
        if(card.name === cardName){
            console.log(card.cost);
            const cardString = new Discord.MessageEmbed().
                setTitle(card.name).
                setImage(card.image).
                addFields(
                    {name: 'Cost', value: card.cost, inline: true},
                ).
                setFooter('"' + card.footer + '"').
                setDescription('*' + card.description + '*').
                setColor(card.color);
            message.channel.send(cardString);
            return;
        }
    }
};