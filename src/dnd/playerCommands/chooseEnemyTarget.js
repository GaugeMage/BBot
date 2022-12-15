exports.run = async(client, player, player2) => {
    let cardIndex = null;
    while(isNaN(cardIndex) || cardIndex < 1 || player2.field[cardIndex - 1] === null){
        await client.users.cache.get(player.id).send("Choose the position of the **enemy** card you want to target (1-" + player2.field.length + ")");
        cardIndex = await client.users.cache.get(player.id).dmChannel.awaitMessages(m => m.author.id === player.id, {max: 1})
        cardIndex = cardIndex.first().content;
        if(isNaN(cardIndex) || cardIndex < 1 || player2.field[cardIndex - 1] === null){
            client.users.cache.get(player.id).send("Invalid input! The card will not be targeted.");
        } else if(player2.field[cardIndex - 1].type === "Location"){
            client.users.cache.get(player.id).send("You cannot target a location card! The card will not be targeted.");
            cardIndex = NaN;
        } else {
            //Check if catastrophe is in play
            if(player2.field.some(card => card.name === "Catastrophe")){
                //50% chance that the damage is dealt to a random ally
                const randomAllyTarget = require('./randomAllyTarget.js');
                if(Math.random() < 0.5){
                    cardIndex = await randomAllyTarget.run(client, player);
                    client.users.get(player.id).send("Catastrophe is in play! A random ally is targeted instead!");
                    turnLog.text += "Catastrophe is in play! A random ally is targeted instead!";
                    //Check if cardIndex is null
                    if(cardIndex === null){
                        await client.users.cache.get(player.id).send("No cards in the field!");
                        return;
                    }
                }
            }
            
            return cardIndex - 1;
        }
    }
}