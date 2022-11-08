exports.run = async(message, args) => {
    const Discord = require('discord.js');
    const cardName = args.join(' ');
    const characterCards = require('../cards/characterCards.json');

    //Looks for cardname within charactercards
    for(let i = 0; i < characterCards.length; i++){
        let card = characterCards[i];
        if(card.name === cardName){
            const cardString = new Discord.MessageEmbed().
                setTitle(card.name).
                setImage(card.image).
                addFields(
                    {name: 'Stats', value: 'Attack: ' + card.attack + '\nHealth: ' + card.health, inline: true},
                    {name: 'Cost', value: card.cost, inline: true},
                    {name: 'Faction', value: card.faction, inline: true},
                ).
                setFooter('"' + card.footer + '"').
                setDescription('*' + card.description + '*').
                setColor(card.color);
            message.channel.send(cardString);
            if(card.type === 'Stand User'){
                if(card.stand.mode === undefined){
                    const standString = new Discord.MessageEmbed().
                        setTitle(card.stand.name).
                        setImage(card.stand.image).
                        addFields(
                            {name: 'Stats', value: 'Attack: ' + card.stand.attack + '\nHealth: ' + card.stand.health, inline: true},
                            {name: 'Cost', value: card.stand.cost, inline: true},
                        ).
                        setDescription('*' + card.stand.description + '*').
                        setColor(card.color);
                        message.channel.send(standString);
                } else {
                    for(let i = 0; i < card.stand.mode.length; i++){
                        const standString = new Discord.MessageEmbed().
                            setTitle(card.stand.mode[i].name).
                            setImage(card.stand.mode[i].image).
                            addFields(
                                {name: 'Stats', value: 'Attack: ' + card.stand.mode[i].attack + '\nHealth: ' + card.stand.mode[i].health, inline: true},
                                {name: 'Cost', value: card.stand.mode[i].cost, inline: true},
                            ).
                            setDescription('*' + card.stand.mode[i].description + '*').
                            setColor(card.color);
                        message.channel.send(standString);
                    }
                }
            }
            if(card.equipment !== undefined){
                for(let i = 0; i < card.equipment.length; i++){
                    const equipmentString = new Discord.MessageEmbed().
                        setTitle(card.equipment[i].name).
                        setImage(card.equipment[i].image).
                        addFields(
                            {name: 'Stats', value: 'Attack: ' + card.equipment[i].attack + '\nHealth: ' + card.equipment[i].health, inline: true},
                            {name: 'Cost', value: card.equipment[i].cost, inline: true},
                        ).
                        setDescription('*' + card.equipment[i].description + '*').
                        setColor(card.color);
                    message.channel.send(equipmentString);
                }
            }
            if(card.generatedCharacters !== undefined){
                for(let i = 0; i < card.generatedCharacters.length; i++){
                    const generatedString = new Discord.MessageEmbed().
                        setTitle(card.generatedCharacters[i].name).
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
            if(card.generatedCards !== undefined){
                for(let i = 0; i < card.generatedCards.length; i++){
                    const generatedString = new Discord.MessageEmbed().
                        setTitle(card.generatedCards[i].name).
                        setImage(card.generatedCards[i].image).
                        setDescription('*' + card.generatedCards[i].description + '*').
                        setColor(card.generatedCards[i].color);
                    message.channel.send(generatedString);
                }
            }

            return;
        }
    }
};