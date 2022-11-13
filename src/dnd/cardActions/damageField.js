exports.run = async(client, turnLog, player, player2, cardIndex, damageAmount) => {
    //If cardIndex is null, damage a random card
    do {
        if(cardIndex === null){
            //Find how many cards are in the field
            let fieldLength = player.field.findIndex(card => card === null);
    
            //If there are no cards in the field, return
            if(fieldLength === 0){
                await client.users.cache.get(player.id).send("No cards in the field!");
                return;
            }
    
            //Choose a random card
            console.log("Field length before: " + fieldLength);
            cardIndex = Math.floor(Math.random() * fieldLength);
        }

        //Check if there is only one card and that card is a location card
        if(player2.field.length === 1 && player2.field[0].type === "Location"){
            await client.users.cache.get(player.id).send("Cannot damage a location card!");
            return;
        }
        
        if(player2.field[cardIndex].type === "Location"){
            cardIndex = null;
        }
    } while(cardIndex === null);

    //Check if the card is a location card
    if(player2.field[cardIndex].type === "Location"){
        await client.users.cache.get(player.id).send("You can't damage a location card!");
        return;
    }

    //Deal damage to the card
    player2.field[cardIndex].health -= damageAmount;
    await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[cardIndex].name + "!");
    turnLog.text += "\nDealt " + damageAmount + " damage to " + player2.field[cardIndex].name + "!";

    //If the card is a stand user, deal damage to the stand (if it exists)
    breakCheck: if(player2.field[cardIndex].type == "Stand User"){
        if(player2.field[cardIndex + 1].type == "Stand"){
            player2.field[cardIndex + 1].health -= damageAmount;
            await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[cardIndex + 1].name + "!");
            turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount + " damage to " + player2.field[cardIndex + 1].name + "!";
            break breakCheck;
        }
        const standIndex = player2.field.findIndex(stand => stand.type == "Stand");
        if(standIndex !== -1){
            player2.field[standIndex].health -= damageAmount;
            await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[standIndex].name + "!");
            turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount + " damage to " + player2.field[standIndex].name + "!";
        }
    }

    //If the card is a stand, deal damage to the stand user (if it exists)
    breakCheck: if(player2.field[cardIndex].type == "Stand"){
        if(player2.field[cardIndex - 1].type == "Stand User"){
            player2.field[cardIndex - 1].health -= damageAmount;
            await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[cardIndex - 1].name + "!");
            turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount + " damage to " + player2.field[cardIndex - 1].name + "!";
            break breakCheck;
        }
        const standUserIndex = player2.field.findIndex(standUser => standUser.type == "Stand User");
        if(standUserIndex !== -1){
            player2.field[standUserIndex].health -= damageAmount;
            await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[standUserIndex].name + "!");
            turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount + " damage to " + player2.field[standUserIndex].name + "!";
        }
    }

    //Check if card is dead
    const checkCardDeath = require('../gameCommands/checkCardDeath.js');
    await checkCardDeath.run(client, turnLog, player, player2, cardIndex);
}