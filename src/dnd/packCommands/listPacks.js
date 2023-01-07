exports.run = async(message) => {
    const Discord = require('discord.js');
    const packs = require('../packs/packs.json');
    const {Pagination} = require('discordjs-button-embed-pagination');

    //Looks for all pack names and stores them inside an embed
    let packNames = [];
    for(let i = 0; i < packs.length; i++){
        packNames.push(packs[i]?.name);
    }

    let pages = [];

    //Print every pack
    for(let i = 0; i < packs.length; i++){
        let pack = packs[i];
        let packEmbed = new Discord.EmbedBuilder().
            setTitle(pack.name).
            addFields(
                {name: 'Pack Description:', value: pack.description.toString(), inline: true},
                {name: 'Pack Cards:', value: pack.cards.join('\n').toString(), inline: true},
                {name: 'Pack Cost:', value: pack.cost.toString(), inline: true},
            ).
            setImage(pack.image).
            setColor('#ff0000');
        pages.push(packEmbed);
    }

    await new Pagination(message.channel, pages, "page").paginate();
}