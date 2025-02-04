exports.run = async(client, turnLog, args, player, player2) => {

    const characterCards = require('../cards/characterCards.json');

    [summonCommand, ...cardName] = args.split(" ");
    cardName = cardName.join(" ");

    //Check if the card exists in the player's hand
    let cardIndex = player.hand.findIndex(card => card?.name === cardName);

    if(cardIndex === -1){
        client.users.cache.get(player.id).send("That card is not in your hand!");
        return;
    }

    //Check if the card is a character card
    let isCharacterCard = false;
    let card = null;
    for(let i = 0; i < characterCards.length; i++){
        if(characterCards[i]?.name === cardName){
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

    //Remove card from hand
    player.hand.splice(cardIndex, 1);

    //Remove gold from player
    player.gold -= card.cost;

    const summonCard = require('../cardActions/actionCards/summonCard.js');
    await summonCard.run(client, turnLog, player, player2, card);
}