exports.run = async(message, args) => {
    const Discord = require('discord.js');
    const cardName = args.join(' ');
    const locationCards = require('../cards/locationCards.json');

    for(let i = 0; i < locationCards.length; i++){
        let card = locationCards[i];
        if(card.name === cardName){
            const cardString = new Discord.EmbedBuilder().
                setTitle(card.name).
                setImage(card.image).
                addFields(
                    {name: 'Cost', value: card.cost.toString(), inline: true},
                ).
                setFooter({text: '"' + card.footer + '"'}).
                setDescription('*' + card.description + '*').
                setColor(card.color);
            message.channel.send({embeds: [cardString]});
            if(card.generatedCards !== undefined){
                for(let i = 0; i < card.generatedCards.length; i++){
                    const generatedCardString = new Discord.EmbedBuilder().
                        setTitle(card.generatedCards[i]?.name).
                        setImage(card.generatedCards[i].image).
                        addFields(
                            {name: 'Cost', value: card.generatedCards[i].cost.toString(), inline: true},
                        ).
                        setFooter({text: '"' + card.generatedCards[i].footer + '"'}).
                        setDescription('*' + card.generatedCards[i].description + '*').
                        setColor(card.color);
                    message.channel.send({embeds: [generatedCardString]});
                }
            }
            if(card.generatedCharacters !== undefined){
                for(let i = 0; i < card.generatedCharacters.length; i++){
                    const generatedString = new Discord.EmbedBuilder().
                        setTitle(card.generatedCharacters[i]?.name).
                        setImage(card.generatedCharacters[i].image).
                        addFields(
                            {name: 'Stats', value: 'Attack: ' + card.generatedCharacters[i].attack.toString() + '\nHealth: ' + card.generatedCharacters[i].health.toString(), inline: true},
                            {name: 'Cost', value: card.generatedCharacters[i].cost.toString(), inline: true},
                        ).
                        setDescription('*' + card.generatedCharacters[i].description + '*').
                        setColor(card.generatedCharacters[i].color);
                    message.channel.send({embeds: [generatedString]});
                }
            }
            return;
        }
    }
};