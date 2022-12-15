exports.run = async(client, turnLog, args, player, player2) => {

    const locationCards = require('../cards/locationCards.json');
    
    [locationCommand, ...cardName] = args.split(" ");
    cardName = cardName.join(" ");

    //Check if the card exists in the player's hand
    let cardIndex = player.hand.findIndex(card => card?.name === cardName);

    if(cardIndex === -1){
        client.users.cache.get(player.id).send("That card is not in your hand!");
        return;
    }

    //Check if the card is a location card
    let isLocationCard = false;
    let card = null;
    for(let i = 0; i < locationCards.length; i++){
        if(locationCards[i]?.name === cardName){
            card = player.hand[cardIndex];
            isLocationCard = true;
        }
    }

    if(!isLocationCard){
        client.users.cache.get(player.id).send("That card is not a location card!");
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
    switch(card.name){
        case "Space":
            break;
    }
}