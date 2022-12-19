exports.run = async(client, turnLog, player, player2, card) => {
    //Check if field is full
    if(player.field[player.field.length - 1] !== null){
        client.users.cache.get(player.id).send("Your field is full!");
        return;
    }

    //Insert card into field
    for(let i = 0; i < player.field.length; i++){
        if(player.field[i] === null){
            player.field[i] = card;
            player.field[i]['hasAttacked'] = true;
            break;
        }
    }

    client.users.cache.get(player.id).send("You have summoned " + card.name + " to your field!");
    turnLog.text += "\n" + player.name + " has summoned " + card.name + " to their field!";

    //Special effects for cards
    const standSummon = require('../standSummon.js');
    const chooseEnemyTarget = require('../../playerCommands/chooseEnemyTarget.js');
    const silenceField = require('../silenceField.js');
    const silenceHand = require('../silenceHand.js');
    const damageField = require('../damageField.js');
    const paradox = require('../paradox.js');
    const summonCard = require('./summonCard.js');
    const damageWorld = require('../damageWorld.js');
    const storeField = require('../storeField.js');

    //Checks if the card has "Stand Summon: " in its description
    if(card.description.includes("Stand Summon: ")){
        await standSummon.run(client, turnLog, player, player2, card.stand.name);
    }

    switch(card.name){
        case "Buddy McLean":
            if(player2.field[1] === null){
                await damageWorld.run(client, turnLog, player2, 5);
            } else {
                //Choose 1st target
                let cardIndex = await chooseEnemyTarget.run(client, player, player2);
                await silenceField.run(client, turnLog, player, player2, cardIndex);

                //Choose 2nd target
                cardIndex = await chooseEnemyTarget.run(client, player, player2);
                await silenceField.run(client, turnLog, player, player2, cardIndex);
            }
            break;
        case "Repugnans Fabula":
            if(player2.field[0] === null){
                await client.users.cache.get(player.id).send("There are no cards in your opponent's field for you to silence!");
            } else {
                let cardIndex = await chooseEnemyTarget.run(client, player, player2);
                await paradox.run(client, turnLog, player, player2, cardIndex);

                if(player2.field[1] === null){
                    await client.users.cache.get(player.id).send("There is not a second card to paradoxify!");
                } else {
                    let cardIndex2 = await chooseEnemyTarget.run(client, player, player2);;
                    while(cardIndex2 === cardIndex){
                        await client.users.cache.get(player.id).send("You cannot paradoxify the same card twice!");
                        cardIndex2 = await chooseEnemyTarget.run(client, player, player2);
                    }
                    await paradox.run(client, turnLog, player, player2, cardIndex2);
                }
            }
            break;
        case "Tyler Wolfe":
            if(player2.field[0] === null){
                await client.users.cache.get(player.id).send("There are no cards in your opponent's field for you to store!");
            } else {
                //Store an enemy who has less than or equal attack to Tyler's attack
                //Check if any enemy has less than or equal attack to Tyler's attack
                let hasLessThanOrEqualAttack = false;
                for(let i = 0; i < player2.field.length; i++){
                    if(player2.field[i] !== null && player2.field[i]?.attack <= card.attack && player2.field[i]?.health > 0){
                        hasLessThanOrEqualAttack = true;
                        break;
                    }
                }
                let cardIndex;
                if(hasLessThanOrEqualAttack){
                    let hasStored = false;
                    do {
                        cardIndex = await chooseEnemyTarget.run(client, player, player2);
                        if(player2.field[cardIndex]?.attack <= card.attack){
                            await storeField.run(client, turnLog, player, player2, player.field.findIndex(tempCard => tempCard.name.includes("Tyler Wolfe")), cardIndex);
                            hasStored = true;
                        } else {
                            await client.users.cache.get(player.id).send("You cannot store a card with more attack than Tyler!");
                        }
                    } while(!hasStored);
                } else {
                    await client.users.cache.get(player.id).send("There are no cards in your opponent's field with less than or equal attack to Tyler!");
                }
            }
            break;
    }
}