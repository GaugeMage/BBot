exports.run = (message) => {
    const Discord = require('discord.js');
    const packs = require('../packs/packs.json');

    //Looks for all pack names and stores them inside an embed
    let packNames = [];
    for(let i = 0; i < packs.length; i++){
        packNames.push(packs[i]?.name);
    }

    const packString = new Discord.MessageEmbed().
        setTitle('Packs').
        addFields(
            {name: 'Pack Names', value: packNames.join('\n'), inline: true},
        ).
        setColor('#ff0000');
    message.channel.send(packString);
}