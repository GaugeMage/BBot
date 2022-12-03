exports.run = function (message, args) {
    const Discord = require('discord.js');
    const Minesweeper = require('discord.js-minesweeper');
    const minesweeper = new Minesweeper({
        rows: 10,
        columns: 10,
        mines: 32,
        emote: 'boom',
        returnType: 'emoji',
        revealFirstCell: true,
        spaces: false,
    });

    message.channel.send(minesweeper.start());

    // const embed = new Discord.MessageEmbed()
    //     .setTitle('Minesweeper')
    //     .setColor(0x00AE86)
    //     .addFields({
    //         //Shows how many mines are in the game
    //         name: 'Total Mines:',
    //         value: minesweeper.mines,
    //         inline: false
    //     })
    //     .setDescription(minesweeper.start());
    // message.channel.send(embed);
};