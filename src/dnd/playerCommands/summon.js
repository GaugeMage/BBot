exports.run = async(client, message, args, player, player2, dndGameStarted) => {

    const characterCards = require('../cards/characterCards.json');

    if(!dndGameStarted){
        client.users.cache.get(player.id).send("There is no game in progress!");
        return [player, player2]
    }

    [summonCommand, ...cardName] = args.split(" ");
    cardName = cardName.join(" ");

    //Check if the card exists in the player's hand
    let cardExists = false;
    let cardIndex = 0;
    for(let i = 0; i < player.hand.length; i++){
        if(player.hand[i] === cardName){
            cardExists = true;
            cardIndex = i;
            break;
        }
    }

    if(!cardExists){
        client.users.cache.get(player.id).send("That card is not in your hand!");
        return [player, player2];
    }

    //Check if the card is a character card
    let isCharacterCard = false;
    let card = null;
    for(let i = 0; i < characterCards.length; i++){
        if(characterCards[i].name === cardName){
            card = characterCards[i];
            isCharacterCard = true;
        }
    }

    if(!isCharacterCard){
        client.users.cache.get(player.id).send("That card is not a character card!");
        return [player, player2];
    }

    //Check if the player has enough gold to play the card
    if(player.gold < card.cost){
        client.users.cache.get(player.id).send("You do not have enough gold to play that card!");
        return [player, player2];
    }

    //Check if field is full
    if(player.field[player.field.length - 1] !== null){
        client.users.cache.get(player.id).send("Your field is full!");
        return [player, player2];
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

    //Special effects for cards
    const standSummon = require('../cardActions/standSummon.js');
    const silenceField = require('../cardActions/silenceField.js');
    const silenceHand = require('../cardActions/silenceHand.js');
    const dealDamage = require('../cardActions/dealDamage.js');
    const paradox = require('../cardActions/paradox.js');
    const summonCard = require('../cardActions/summonCard.js');

    if(card.name === "Buddy McLean"){
        //Stand Summon: **American Pie**. When I am played, choose 2 enemy cards on the field to silence. If there are less than 2 cards to silence, deal 5 damage to the enemy world instead
        const result = await standSummon.run(client, message, player, player2, "American Pie");
        player = result[0];
        player2 = result[1];
        //This happened
    }

    return [player, player2];
}