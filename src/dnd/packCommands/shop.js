exports.run = async(message) => {
    //Send every pack
    const Discord = require('discord.js');
    const packs = require('../packs/packs.json');
    const {Pagination} = require('discordjs-button-embed-pagination');

    const tempUser = message.author.id;

    let user = null;
    let pages = [];
    // let userIndex = null;

    //Check if user exists
    const userData = require('.../data/userData.json');
    for(let i = 0; i < userData.length; i++){
        if(userData[i].id === tempUser){
            user = userData[i];
            // userIndex = i;
            break;
        }
        if(i === userData.length - 1){
            message.channel.send("You are not in the database! Please use the command !registerD&D to add yourself to the database.");
            return;
        }
    } 

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

    await new Pagination(message.channel, pages, "Page").paginate();

    //Ask user which pack they want to buy
    message.channel.send('Which pack would you like to buy? (Select the number option)');

    //Print a message which numbers each pack
    let packList = '';
    for(let i = 0; i < packs.length; i++){
        packList += `${i + 1}. ${packs[i].name}\n`;
    }
    message.channel.send(packList);

    const filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages({filter: filter, max: 1, time: 30000, errors: ['time']})
        .then(collected => {
            let packNumber = collected.first().content;

            //Check if the pack number is valid
            if(packNumber < 0 || packNumber > packs.length){
                message.channel.send('That is not a valid pack!');
                return;
            }

            //Get the pack name
            let packName = packs[packNumber - 1].name;
            let pack = packs.find(pack => pack.name === packName);
            if(pack){
                //Check if user has enough destiny fragments
                if(user.destinyFragments < pack.cost){
                    message.channel.send("You do not have enough destiny fragments to buy this pack!");
                    return;
                }

                //Remove destiny fragments from user
                user.destinyFragments -= pack.cost;

                //Add the pack to the user's packs
                user.packs.push(pack.name);

                message.channel.send("Purchase Successful");

                //Save the user data
                const fs = require('fs');
                fs.writeFile('./src/data/userData.json', JSON.stringify(userData, null, '\t'), (err) => {
                    if(err){
                        console.log(err);
                    }
                });
            } else{
                message.channel.send('That is not a valid pack!');
            }
        }
    );
}