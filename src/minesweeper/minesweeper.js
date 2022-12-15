exports.run = function (message, args) {
    const Discord = require('discord.js');
    const Minesweeper = require('discord.js-minesweeper');

    let rowNumber = 10;
    let columnNumber = 10;
    let mineNumber = 32;

    if(args[0] !== undefined){
        rowNumber = parseInt(args[0]);
        if(isNaN(rowNumber)){
            message.channel.send('Invalid row number');
            return;
        }
    }

    if(args[1] !== undefined){
        columnNumber = parseInt(args[1]);
        if(isNaN(columnNumber)){
            message.channel.send('Invalid column number');
            return;
        }
    }

    if(args[2] !== undefined){
        mineNumber = parseInt(args[2]);
        if(isNaN(mineNumber)){
            message.channel.send('Invalid mine number');
            return;
        }
    }

    const minesweeper = new Minesweeper({
        rows: rowNumber,
        columns: columnNumber,
        mines: mineNumber,
        emote: 'boom',
        returnType: 'emoji',
        revealFirstCell: true,
        spaces: false,
    });

    const minesweeperField = minesweeper.start();
    //Check if minesweeper is more than 2000 characters
    if(minesweeperField.length > 2000){
        message.channel.send('The minesweeper field is too large to be sent');
        return;
    }
    message.channel.send(minesweeperField !== null ? minesweeperField : 'A minesweeper field can not be generated with the given parameters');

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