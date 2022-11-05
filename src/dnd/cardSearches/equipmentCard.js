exports.run = async(message, args) => {
    const Discord = require('discord.js');
    const cardName = args.join(' ');
    const equipmentCards = require('../cards/equipmentCards.json');

    for(let i = 0; i < equipmentCards.length; i++){
        let card = equipmentCards[i];
        if(card.name === cardName){
            const cardString = new Discord.MessageEmbed().
                setTitle(card.name).
                setImage(card.image).
                addFields(
                    {name: 'Stats', value: 'Attack: ' + card.attack + '\nHealth: ' + card.health, inline: true},
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