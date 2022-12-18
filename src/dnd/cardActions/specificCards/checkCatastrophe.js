exports.run = async(client, turnLog, player, player2, damageAmount) => {
    if(player2.field.some(card => card?.name.includes("Catastrophe"))){
        //50% chance that the damage is dealt to a random ally
        const randomAllyTarget = require('./randomAllyTarget.js');
        if(Math.random() < 0.5){
            cardIndex = await randomAllyTarget.run(client, player);
            client.users.cache.get(player.id).send("Catastrophe is in play! A random ally is targeted instead!");
            turnLog.text += "\nCatastrophe is in play! A random ally is targeted instead!";
            //Check if cardIndex is null
            if(cardIndex === null){
                await client.users.cache.get(player.id).send("No cards in the field!");
                return ;
            }
        }

        const allyDamage = require('./allyDamage.js');
        await allyDamage.run(client, turnLog, player, cardIndex, damageAmount);

        //Check if the card is dead
        await checkCardDeath.run(client, turnLog, player, player);

        return true;
    }

    return false;
}