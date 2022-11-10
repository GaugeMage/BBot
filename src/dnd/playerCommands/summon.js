exports.run = async(message, args, player, player2, dndGameStarted) => {

    const characterCards = require('../cards/characterCards.json');

    if(!dndGameStarted){
        message.channel.send("There is no game in progress!");
        return;
    }

    const cardName = args;

    //Check if the card exists in the player's hand
    let cardExists = false;
    let cardIndex = 0;
    for(let i = 0; i < player.hand.length; i++){
        if(player.hand[i].name === cardName){
            cardExists = true;
            cardIndex = i;
        }
    }

    if(!cardExists){
        message.channel.send("That card is not in your hand!");
        return;
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
        message.channel.send("That card is not a character card!");
        return;
    }

    //Check if the player has enough gold to play the card
    if(player.gold < card.cost){
        message.channel.send("You do not have enough gold to play that card!");
        return;
    }

    //Check if field is full
    if(player.field[player.field.length - 1] === null){
        message.channel.send("Your field is full!");
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

    message.channel.send("You have summoned " + card.name + " to your field!");

    //Special effects for cards
    const standSummon = require('../cardActions/standSummon.js');
    const silence = require('../cardActions/silence.js');

    if(card.name === "Buddy McLean"){
        //Stand Summon: **American Pie**. When I am played, choose 2 enemy cards on the field to silence. If there are less than 2 cards to silence, deal 5 damage to the enemy world instead
        standSummon.run(client, message, player, player2, "American Pie");
    }   

    return player;
}