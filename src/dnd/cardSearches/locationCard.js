exports.run = async(message, args) => {
    const Discord = require('discord.js');
    const cardName = args.join(' ');
    const locationCards = require('../cards/locationCards.json');

    for(let i = 0; i < locationCards.length; i++){
        let card = locationCards[i];
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
            if(card.generatedCharacters !== undefined){
                for(let i = 0; i < card.generatedCharacters.length; i++){
                    const generatedString = new Discord.MessageEmbed().
                        setTitle(card.generatedCharacters[i]?.name).
                        setImage(card.generatedCharacters[i].image).
                        addFields(
                            {name: 'Stats', value: 'Attack: ' + card.generatedCharacters[i].attack + '\nHealth: ' + card.generatedCharacters[i].health, inline: true},
                            {name: 'Cost', value: card.generatedCharacters[i].cost, inline: true},
                        ).
                        setDescription('*' + card.generatedCharacters[i].description + '*').
                        setColor(card.generatedCharacters[i].color);
                    message.channel.send(generatedString);
                }
            }
            return;
        }
    }
};