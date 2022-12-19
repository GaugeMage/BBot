exports.run = async(client, turnLog, player, cardIndex) => {
    //Character cards
    const characterCards = require('../../cards/characterCards.json'); 

    //Check if the card at cardIndex is Ricky Rat
    if(player.field[cardIndex]?.name.includes("Ricky Rat")){
        //Add Rook to the player's hand
        player.hand.push(characterCards[characterCards.findIndex(card => card.name.includes("Rook"))]);
        turnLog.text += "Rook was added to " + player.name + "'s hand!";
        await client.users.cache.get(player.id).send("Rook was added to your hand!");
    }
}