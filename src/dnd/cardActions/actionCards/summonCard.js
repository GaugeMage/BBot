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
    const checkCharacterCards = require('../../gameCommands/checkCharacterCards.js');

    //Checks if the card has "Stand Summon: " in its description
    if(card.description.includes("Stand Summon: ")){
        await standSummon.run(client, turnLog, player, player2, card.stand.name);
    }

    switch(card.name){
        case "Buddy McLean":
            player["horsemenSummoned"].buddySummoned = true;
            if(!await checkCharacterCards.run(client, player, player2, 2)){
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
            player["horsemenSummoned"].repugnansSummoned = true;
            if(!await checkCharacterCards.run(client, player, player2, 2)){
                await client.users.cache.get(player.id).send("There are no cards in your opponent's field for you to paradoxify!");
            } else {
                let cardIndex = await chooseEnemyTarget.run(client, player, player2);
                await paradox.run(client, turnLog, player, player2, cardIndex);

                let cardIndex2 = await chooseEnemyTarget.run(client, player, player2);;
                while(cardIndex2 === cardIndex){
                    await client.users.cache.get(player.id).send("You cannot paradoxify the same card twice!");
                    cardIndex2 = await chooseEnemyTarget.run(client, player, player2);
                }
                await paradox.run(client, turnLog, player, player2, cardIndex2);
            }
            break;
        case "Tyler Wolfe":
            player["horsemenSummoned"].tylerSummoned = true;
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
        case "Rook":
            player["horsemenSummoned"].rookSummoned = true;
            break;
        case "Catastrophe":
            player["horsemenSummoned"].catastropheSummoned = true;
            break;
        case "Tommy":
            //If all of the 5 Horsemen have been summoned this game, I gain +5/+5 and all cards on the field, in your hand, and in your deck gain +5/+5.
            if(player["horsemenSummoned"].buddySummoned && player["horsemenSummoned"].repugnansSummoned && player["horsemenSummoned"].tylerSummoned && player["horsemenSummoned"].rookSummoned && player["horsemenSummoned"].catastropheSummoned){
                card.attack += 5;
                card.health += 5;
                for(let i = 0; i < player.field.length; i++){
                    if(player.field[i] !== null){
                        player.field[i].attack += 5;
                        player.field[i].health += 5;
                    }
                }
                for(let i = 0; i < player.hand.length; i++){
                    if(player.hand[i]?.attack !== undefined && player.hand[i]?.health !== undefined){
                        player.hand[i].attack += 5;
                        player.hand[i].health += 5;
                    }
                }
                for(let i = 0; i < player.deck.cards.length; i++){
                    if(player.deck.cards[i]?.attack !== undefined && player.deck.cards[i]?.health !== undefined){
                        player.deck.cards[i].attack += 5;
                        player.deck.cards[i].health += 5;
                    }
                }
                await client.users.cache.get(player.id).send("All 5 Horsemen have been summoned this game! All cards on the field, in your hand, and in your deck gain +5/+5!");
                await client.users.cache.get(player.id).send("https://tenor.com/view/anime-guiltycrown-ouma-shu-oumashu-gif-19826865");
                turnLog.text += `${player.username} has summoned all 5 Horsemen! All cards on the field, in their hand, and in their deck gain +5/+5!\n`;
                turnLog.text += 'https://tenor.com/view/anime-guiltycrown-ouma-shu-oumashu-gif-19826865\n';
            }
            break;
    }
}