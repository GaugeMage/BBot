exports.run = async(client, turnLog, args, player, player2) => {
    const spellCards = require('../cards/spellCards.json');
    [summonCommand, ...cardName] = args.split(" ");
    cardName = cardName.join(" ");

    //Check if the card exists in the player's hand
    let cardIndex = player.hand.findIndex(card => card?.name === cardName);

    if(cardIndex === -1){
        client.users.cache.get(player.id).send("That card is not in your hand!");
        return;
    }

    //Check if the card is a spell card
    let isSpellCard = false;
    let card = null;
    for(let i = 0; i < spellCards.length; i++){
        if(spellCards[i]?.name === cardName){
            card = player.hand[cardIndex];
            isSpellCard = true;
        }
    }

    if(!isSpellCard){
        client.users.cache.get(player.id).send("That card is not a spell card!");
        return;
    }

    //Check if the player has enough gold to play the card
    if(player.gold < card.cost){
        client.users.cache.get(player.id).send("You do not have enough gold to play that card!");
        return;
    }

    //Remove gold from player
    player.gold -= card.cost;

    //Remove card from hand
    player.hand.splice(cardIndex, 1);

    const castCard = require('../cardActions/actionCards/castCard.js');
    await castCard.run(client, turnLog, player, player2, card);
}