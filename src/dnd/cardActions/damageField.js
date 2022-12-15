exports.run = async(client, turnLog, player, player2, cardIndex, damageAmount) => {

    const checkCardDeath = require('../gameCommands/checkCardDeath.js');

    //If cardIndex is null, damage a random card
    const randomEnemyTarget = require('./randomEnemyTarget.js');
    if(cardIndex === null){
        cardIndex = await randomEnemyTarget.run(client, player, player2);
    }

    //Check if the card is a location card
    if(player2.field[cardIndex]?.type === "Location"){
        await client.users.cache.get(player.id).send("You can't damage a location card!");
        return;
    }

    //Check if catastophe is in play
    if(player2.field.some(card => card?.name === "Catastrophe")){
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
        
        return;
    }

    //Check if the card has the Archer's Paradox
    if(player2.field[cardIndex]?.name.includes("(P-A)")){
        //If the card has the paradox, double the damage
        damageAmount *= 2;
    }

    //Deal damage to the card
    player2.field[cardIndex].health -= damageAmount;
    await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[cardIndex]?.name + "!");
    turnLog.text += "\nDealt " + damageAmount + " damage to " + player2.field[cardIndex]?.name + "!";

    //If the card is a stand user, deal damage to the stand (if it exists)
    breakCheck: if(player2.field[cardIndex].type == "Stand User"){
        if(player2.field[cardIndex + 1].type == "Stand"){
            player2.field[cardIndex + 1].health -= damageAmount;
            await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[cardIndex + 1]?.name + "!");
            turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount + " damage to " + player2.field[cardIndex + 1]?.name + "!";
            break breakCheck;
        }
        const standIndex = player2.field.findIndex(stand => stand.type == "Stand");
        if(standIndex !== -1){
            player2.field[standIndex].health -= damageAmount;
            await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[standIndex]?.name + "!");
            turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount + " damage to " + player2.field[standIndex]?.name + "!";
        }
    }

    //If the card is a stand, deal damage to the stand user (if it exists)
    breakCheck: if(player2.field[cardIndex].type == "Stand"){
        if(player.field[cardIndex - 1] == undefined){
            break breakCheck;
        }
        if(player2.field[cardIndex - 1].type == "Stand User"){
            player2.field[cardIndex - 1].health -= damageAmount;
            await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[cardIndex - 1]?.name + "!");
            turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount + " damage to " + player2.field[cardIndex - 1]?.name + "!";
            break breakCheck;
        }
        const standUserIndex = player2.field.findIndex(standUser => standUser.type == "Stand User");
        if(standUserIndex !== -1){
            player2.field[standUserIndex].health -= damageAmount;
            await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[standUserIndex]?.name + "!");
            turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount + " damage to " + player2.field[standUserIndex]?.name + "!";
        }
    }

    //Check if card is dead
    await checkCardDeath.run(client, turnLog, player, player2); 
}