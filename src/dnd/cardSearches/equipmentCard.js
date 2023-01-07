exports.run = async(message, args) => {
    const Discord = require('discord.js');
    const cardName = args.join(' ');
    const equipmentCards = require('../cards/equipmentCards.json');

    for(let i = 0; i < equipmentCards.length; i++){
        let card = equipmentCards[i];
        if(card.name === cardName){
            const cardString = new Discord.EmbedBuilder().
                setTitle(card.name).
                setImage(card.image).
                addFields(
                    {name: 'Stats', value: 'Attack: ' + card.attack.toString() + '\nHealth: ' + card.health.toString(), inline: true},
                    {name: 'Cost', value: card.cost.toString(), inline: true},
                ).
                setFooter({text: '"' + card.footer + '"'}).
                setDescription('*' + card.description + '*').
                setColor(card.color);
            message.channel.send({embeds: [cardString]});
            return;
        }
    }
};