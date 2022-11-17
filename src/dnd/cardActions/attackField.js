exports.run = async(client, turnLog, player, player2, cardIndex1, cardIndex2) => {
    if(player.field[cardIndex1].hasAttacked === false){
        //Have both cards damage each other
        let damageAmount1 = player.field[cardIndex1].attack;
        let damageAmount2 = player2.field[cardIndex2].attack;
        player.field[cardIndex1].health -= damageAmount2;
        player2.field[cardIndex2].health -= damageAmount1;

        await client.users.cache.get(player.id).send(player.field[cardIndex1].name + " has attacked!");
        turnLog.text += "\n" + player.field[cardIndex1].name + " has attacked!";

        //If the card is a stand user, deal damage to the stand (if it exists)
        breakCheck: if(player2.field[cardIndex].type == "Stand User"){
            if(player2.field[cardIndex + 1].type == "Stand"){
                player2.field[cardIndex + 1].health -= damageAmount1;
                await client.users.cache.get(player.id).send("Dealt " + damageAmount1 + " damage to " + player2.field[cardIndex + 1].name + "!");
                turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount1 + " damage to " + player2.field[cardIndex + 1].name + "!";
                break breakCheck;
            }
            const standIndex = player2.field.findIndex(stand => stand.type == "Stand");
            if(standIndex !== -1){
                player2.field[standIndex].health -= damageAmount1;
                await client.users.cache.get(player.id).send("Dealt " + damageAmount1 + " damage to " + player2.field[standIndex].name + "!");
                turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount1 + " damage to " + player2.field[standIndex].name + "!";
            }
        }

        //If the card is a stand, deal damage to the stand user (if it exists)
        breakCheck: if(player2.field[cardIndex].type == "Stand"){
            if(player2.field[cardIndex - 1].type == "Stand User"){
                player2.field[cardIndex - 1].health -= damageAmount1;
                await client.users.cache.get(player.id).send("Dealt " + damageAmount1 + " damage to " + player2.field[cardIndex - 1].name + "!");
                turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount1 + " damage to " + player2.field[cardIndex - 1].name + "!";
                break breakCheck;
            }
            const standUserIndex = player2.field.findIndex(standUser => standUser.type == "Stand User");
            if(standUserIndex !== -1){
                player2.field[standUserIndex].health -= damageAmount1;
                await client.users.cache.get(player.id).send("Dealt " + damageAmount1 + " damage to " + player2.field[standUserIndex].name + "!");
                turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount1 + " damage to " + player2.field[standUserIndex].name + "!";
            }
        }

        //If the card is a stand user, deal damage to the stand (if it exists)
        breakCheck: if(player.field[cardIndex].type == "Stand User"){
            if(player.field[cardIndex + 1].type == "Stand"){
                player.field[cardIndex + 1].health -= damageAmount2;
                await client.users.cache.get(player2.id).send("Dealt " + damageAmount2 + " damage to " + player.field[cardIndex + 1].name + "!");
                turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount2 + " damage to " + player.field[cardIndex + 1].name + "!";
                break breakCheck;
            }
            const standIndex = player.field.findIndex(stand => stand.type == "Stand");
            if(standIndex !== -1){
                player.field[standIndex].health -= damageAmount2;
                await client.users.cache.get(player2.id).send("Dealt " + damageAmount2 + " damage to " + player.field[standIndex].name + "!");
                turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount2 + " damage to " + player.field[standIndex].name + "!";
            }
        }

        //If the card is a stand, deal damage to the stand user (if it exists)
        breakCheck: if(player.field[cardIndex].type == "Stand"){
            if(player.field[cardIndex - 1] == undefined){
                break breakCheck;
            }
            if(player.field[cardIndex - 1].type == "Stand User"){
                player.field[cardIndex - 1].health -= damageAmount2;
                await client.users.cache.get(player2.id).send("Dealt " + damageAmount2 + " damage to " + player.field[cardIndex - 1].name + "!");
                turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount2 + " damage to " + player.field[cardIndex - 1].name + "!";
                break breakCheck;
            }
            const standUserIndex = player.field.findIndex(standUser => standUser.type == "Stand User");
            if(standUserIndex !== -1){
                player.field[standUserIndex].health -= damageAmount2;
                await client.users.cache.get(player2.id).send("Dealt " + damageAmount2 + " damage to " + player.field[standUserIndex].name + "!");
                turnLog.text += "\nDue to Stand User and Stand HP linkage: Dealt " + damageAmount2 + " damage to " + player.field[standUserIndex].name + "!";
            }
        }

        //Sets the card's hasAttacked to true
        player.field[cardIndex1].hasAttacked = true;

        //Check if either card is dead
        const checkCardDeath = require("../gameCommands/checkCardDeath.js");
        await checkCardDeath.run(client, turnLog, player, player2);
    } else {
        await client.users.cache.get(player.id).send("That card has already attacked this turn!");
    }
}