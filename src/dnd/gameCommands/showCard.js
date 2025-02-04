exports.run = async(client, message, args) => {
    const Discord = require('discord.js');
    const cardName = args;
    const characterCards = require('../cards/characterCards.json');
    const equipmentCards = require('../cards/equipmentCards.json');
    const locationCards = require('../cards/locationCards.json');
    const spellCards = require('../cards/spellCards.json');

    //Looks for cardname within charactercards
    for(let i = 0; i < characterCards.length; i++){
        let card = characterCards[i];
        if(card.name === cardName){
            const cardString = new Discord.EmbedBuilder().
                setTitle(card.name).
                setImage(card.image).
                addFields(
                    {name: 'Stats', value: 'Attack: ' + card.attack.toString() + '\nHealth: ' + card.health.toString(), inline: true},
                    {name: 'Cost', value: card.cost.toString(), inline: true},
                    {name: 'Faction', value: card.faction.toString(), inline: true},
                ).
                setFooter({text: '"' + card.footer + '"'}).
                setDescription('*' + card.description + '*').
                setColor(card.color);
            message.channel.send({embeds: [cardString]});
        }
    }

    //Looks for cardname within equipmentcards
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
        }
    }

    //Looks for cardname within locationcards
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
        }
    }

    //Looks for cardname within spellcards
    for(let i = 0; i < spellCards.length; i++){
        let card = spellCards[i];
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
        }
    }
}