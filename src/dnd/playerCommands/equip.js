exports.run = async(client, turnLog, args, player, player2) => {

    const equipmentCards = require('../cards/equipmentCards.json');

    [equipCommand, ...cardName] = args.split(" ");
    cardName = cardName.join(" ");

    //Check if the card exists in the player's hand
    let cardIndex = player.hand.findIndex(card => card?.name === cardName);

    if(cardIndex === -1){
        client.users.cache.get(player.id).send("That card is not in your hand!");
        return;
    }

    //Check if the card is an equipment card
    let isEquipmentCard = false;
    let card = null;
    for(let i = 0; i < equipmentCards.length; i++){
        if(equipmentCards[i]?.name === cardName){
            card = player.hand[cardIndex];
            isEquipmentCard = true;
        }
    }
    
    if(!isEquipmentCard){
        client.users.cache.get(player.id).send("That card is not an equipment card!");
        return;
    }

    //Check if the player has enough gold to play the card
    if(player.gold < card.cost){
        client.users.cache.get(player.id).send("You do not have enough gold to play that card!");
        return;
    }
    
    //Check if there is a character card on the field
    let isCharacterCard = false;
    for(let i = 0; i < player.field.length; i++){
        if(player.field[i] !== null){
            isCharacterCard = true;
        }
    }

    if(!isCharacterCard){
        client.users.cache.get(player.id).send("You do not have a character card on the field to equip!");
        return;
    }

    //Check if subfield is full
    if(player.subField[player.subField.length - 1] !== null){
        client.users.cache.get(player.id).send("Your subfield is full!");
        return;
    }

    //Ask user to choose a character card to equip
    const chooseAllyTarget = require('./chooseAllyTarget.js');

    let charIndex = null;
    do {
        charIndex = await chooseAllyTarget.run(client, player);

        //Check if the card is a location card
        if(player.field[charIndex]?.type === "Location"){
            client.users.cache.get(player.id).send("You cannot equip a location card!");
        }
    } while(player.field[charIndex]?.type === "Location");

    //Remove card from hand
    player.hand.splice(cardIndex, 1);

    //Remove gold from player
    player.gold -= card.cost;

    const equipCard = require('../cardActions/actionCards/equipCard.js');
    await equipCard.run(client, turnLog, player, player2, charIndex, card);
}