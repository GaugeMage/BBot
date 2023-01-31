exports.run = async(message, args) => {
    if(args.length === 0){
        return message.reply('Please provide more args (arguments) lmao. :D');
    }

    const {EmbedBuilder} = require('discord.js');
    const NSFW = require("discord-nsfw");
    const nsfw = new NSFW();
    let image;

    switch(args[0]){
        case '4k':
            image = await nsfw.fourk();
            break;
        case 'anal':
            image = await nsfw.anal();
            break;
        case 'ass':
            image = await nsfw.ass();
            break;
        case 'gonewild':
            image = await nsfw.gonewild();
            break;
        case 'hentai':
            image = await nsfw.hentai();
            break;
        case 'pussy':
            image = await nsfw.pussy();
            break;
        case 'thigh':
            image = await nsfw.thigh();
            break;
        case 'porngif':
            image = await nsfw.pgif();
            break;
        case 'boobs':
            image = await nsfw.boobs();
            break;
        case 'hentaiass':
            image = await nsfw.hentaiass();
            break;
        case 'hentaimidriff':
            image = await nsfw.hmidriff();
            break;
        case 'hentaithigh':
            image = await nsfw.hentaithigh();
            break;
        case 'erokemo':
            image = await nsfw.erokemo();
            break;
        case 'kitsune':
            image = await nsfw.kitsune();
            break;
        case 'lewd':
            image = await nsfw.lewd();
            break;
        // case 'nekofeet':
        //     image = await nsfw.nekofeet();
        //     break;
        // case 'nekopussy':
        //     image = await nsfw.nekopussy();
        //     break;
        // case 'nekotits':
        //     image = await nsfw.nekotits();
        //     break;
        case 'solo':
            image = await nsfw.solo();
            break;
        case 'wallpaper':
            image = await nsfw.wallpaper();
            break;
        default:
            image = "Please provide a valid argument from the list: ```4k, anal, ass, gonewild, hentai, pussy, thigh, porngif, boobs, hentaiass, hentaimidriff, hentaithigh, erokemo, kitsune, lewd, solo, wallpaper```";
            break;
    }

    if(image !== "Please provide a valid argument from the list: ```4k, anal, ass, gonewild, hentai, pussy, thigh, porngif, boobs, hentaiass, hentaimidriff, hentaithigh, erokemo, kitsune, lewd, solo, wallpaper```"){
        message.channel.send({embeds: [new EmbedBuilder().setImage(image)]});
    } else {
        message.channel.send(image);
    }
}