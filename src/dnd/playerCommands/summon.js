exports.run = async(client, turnLog, args, player, player2) => {

    const characterCards = require('../cards/characterCards.json');

    [summonCommand, ...cardName] = args.split(" ");
    cardName = cardName.join(" ");

    //Check if the card exists in the player's hand
    let cardIndex = player.hand.findIndex(card => card.name === cardName);

    if(cardIndex === -1){
        client.users.cache.get(player.id).send("That card is not in your hand!");
        return;
    }

    //Check if the card is a character card
    let isCharacterCard = false;
    let card = null;
    for(let i = 0; i < characterCards.length; i++){
        if(characterCards[i].name === cardName){
            card = player.hand[cardIndex];
            isCharacterCard = true;
        }
    }

    if(!isCharacterCard){
        client.users.cache.get(player.id).send("That card is not a character card!");
        return;
    }

    //Check if the player has enough gold to play the card
    if(player.gold < card.cost){
        client.users.cache.get(player.id).send("You do not have enough gold to play that card!");
        return;
    }

    //Check if field is full
    if(player.field[player.field.length - 1] !== null){
        client.users.cache.get(player.id).send("Your field is full!");
        return;
    }

    //Insert card into field
    for(let i = 0; i < player.field.length; i++){
        if(player.field[i] === null){
            player.field[i] = card;
            break;
        }
    }

    //Remove card from hand
    player.hand.splice(cardIndex, 1);

    //Remove gold from player
    player.gold -= card.cost;

    client.users.cache.get(player.id).send("You have summoned " + card.name + " to your field!");
    turnLog.text += "\n" + player.name + " has summoned " + card.name + " to their field!";

    //Special effects for cards
    const standSummon = require('../cardActions/standSummon.js');
    const chooseTarget = require('./chooseTarget.js');
    const silenceField = require('../cardActions/silenceField.js');
    const silenceHand = require('../cardActions/silenceHand.js');
    const damageField = require('../cardActions/damageField.js');
    const paradox = require('../cardActions/paradox.js');
    const summonCard = require('../cardActions/summonCard.js');

    //Checks if the card has "Stand Summon: " in its description
    if(card.description.includes("Stand Summon: ")){
        await standSummon.run(client, turnLog, player, player2, card.stand.name);
    }

    if(card.name === "Buddy McLean"){
        if(player2.field[1] === null){
            player2.worldHP -= 5;
            client.users.cache.get(player.id).send("You have dealt 5 damage to " + player2.name + "'s world!");
            turnLog.text += "\nBuddy McLean has dealt 5 damage to " + player2.name + "'s world!";
        } else {
            //Choose 1st target
            let cardIndex = await chooseTarget.run(client, player, player2);
            await silenceField.run(client, turnLog, player, player2, cardIndex);

            //Choose 2nd target
            cardIndex = await chooseTarget.run(client, player, player2);
            await silenceField.run(client, turnLog, player, player2, cardIndex);
        }
    }

    if(card.name === "Repugnans Fabula"){

    }
}