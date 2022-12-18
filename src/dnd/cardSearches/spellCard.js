exports.run = async(message, args) => {
    const Discord = require('discord.js');
    const cardName = args.join(' ');
    const spellCards = require('../cards/spellCards.json');

    for(let i = 0; i < spellCards.length; i++){
        let card = spellCards[i];
        if(card.name === cardName){
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
            if(card.generatedCards !== undefined){
                for(let i = 0; i < card.generatedCards.length; i++){
                    const generatedCardString = new Discord.MessageEmbed().
                        setTitle(card.generatedCards[i]?.name).
                        setImage(card.generatedCards[i].image).
                        addFields(
                            {name: 'Cost', value: card.generatedCards[i].cost, inline: true},
                        ).
                        setFooter('"' + card.generatedCards[i].footer + '"').
                        setDescription('*' + card.generatedCards[i].description + '*').
                        setColor(card.color);
                    message.channel.send(generatedCardString);
                }
            }
            return;
        }
    }
};