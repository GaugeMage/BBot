exports.run = async(message) => {
    const userData = require('../userData.json');
    const packs = require('../packs/packs.json');

    //Check if user exists
    let user = null;
    for(let i = 0; i < userData.length; i++){
        if(userData[i].id === message.author.id){
            user = userData[i];
            break;
        }
        if(i === userData.length - 1){
            message.channel.send("You are not in the database! Please use the command !registerD&D to add yourself to the database.");
            return;
        }
    }

    //Find how many of each pack the user has
    let packAmounts = [];
    for(let i = 0; i < packs.length; i++){
        let pack = packs[i];
        let packAmount = 0;
        for(let j = 0; j < user.packs.length; j++){
            if(user.packs[j] === pack.name){
                packAmount++;
            }
        }
        packAmounts.push(packAmount);
    }

    //Show the user how many of each pack they have (for the ones which have more than 1) and number them
    let packList = [];
    let packString = '';
    let packNumber = 1;

    message.channel.send("You have the following packs:");
    for(let i = 0; i < packs.length; i++){
        if(packAmounts[i] > 0){
            packList.push([packs[i].name, packAmounts[i]]);
            packString += `${packNumber}. ${packs[i].name} (${packAmounts[i]} Pack${packAmounts[i] > 1 ? 's' : ''})\n`;
            packNumber++;
        }
    }
    if(packString === ''){
        message.channel.send("You don't have any packs!");
        return;
    }
    message.channel.send(packString);

    //Ask the user which pack they want to open
    message.channel.send('Which pack would you like to open? (Select the number option)');
    const filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
        .then(collected => {
            let packNumber = collected.first().content;

            //Check if the pack number is valid
            if(packNumber < 0 || packNumber > packs.length){
                message.channel.send('That is not a valid pack!');
                return;
            }

            //Find the pack the user wants to open
            let packIndex = packs.findIndex(pack => pack.name === packList[packNumber - 1][0])

            let stringBuilder = 'You opened a pack of ' + packList[packNumber - 1][0] + ' and got the following cards:';

            //Open the pack
            let pack = packs[packIndex];
            for(let i = 0; i < pack.packSize; i++){
                let card = pack.cards[Math.floor(Math.random() * pack.cards.length)];
                stringBuilder += `\n${card}`;
                //Check if the user already has the card
                if(user.cards.includes(card)){
                    //If they do, add 10 soul fragments
                    stringBuilder += ' (Duplicate +10 Soul Fragments)';
                    user.soulFragments += 10;
                } else {
                    //If they don't, add the card to their collection
                    user.cards.push(card);
                }
            }

            message.channel.send(stringBuilder);

            user.packs.splice(user.packs.indexOf(pack.name), 1);

            //Save the user data
            const fs = require('fs');
            fs.writeFile('./src/dnd/userData.json', JSON.stringify(userData, null, '\t'), (err) => {
                if(err){
                    console.log(err);
                }
            });
        })
        .catch(collected => {
            message.channel.send('You did not select a pack in time!');
        });
} 