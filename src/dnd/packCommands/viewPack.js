exports.run = async(message, args) => {
    //Shows them the pack they asked for
    const Discord = require('discord.js');
    const packName = args.join(' ');
    const packs = require('../packs/packs.json');

    for(let i = 0; i < packs.length; i++){
        let pack = packs[i];
        if(pack.name === packName){
            const packString = new Discord.MessageEmbed().
                setTitle(pack.name).
                addFields(
                    {name: 'Pack Description:', value: pack.description, inline: true},
                    {name: 'Pack Cards:', value: pack.cards.join('\n'), inline: true},
                    {name: 'Pack Cost:', value: pack.cost, inline: true},
                ).
                setImage(pack.image).
                setColor('#ff0000');
            message.channel.send(packString);
        }
    }
}