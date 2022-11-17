exports.run = async(client, turnLog, args, player, player2) => {
    
    [attackCommand, ...cardIndex] = args.split(" ");
    cardIndex = cardIndex.join(" ");

    //Check if the cardIndex is an integer
    if(!Number.isInteger(parseInt(cardIndex))){
        client.users.cache.get(player.id).send("You must enter a number!");
        return;
    }

    cardIndex = parseInt(cardIndex) - 1;

    //Check if the card exists in the player's field
    if(player.field[cardIndex] === null){
        client.users.cache.get(player.id).send("That card is not in your field!");
        return;
    }

    //Check if the card is a location card
    if(player.field[cardIndex].type === "Location"){
        client.users.cache.get(player.id).send("You can't attack with a location card!");
        return;
    }

    //Check if the card has already attacked this turn
    if(player.field[cardIndex].hasAttacked){
        client.users.cache.get(player.id).send("That card has already attacked this turn!");
        return;
    }

    const damageWorld = require("../cardActions/damageWorld.js");

    let cardIndex2 = cardIndex;

    if(player2.field[cardIndex2].type === "Location"){
        client.users.cache.get(player.id).send("Since the opposing card is a location " + player.field[cardIndex2].name + " will attack the enemy world!");
        await damageWorld.run(client, turnLog, player2, player.field[cardIndex2].attack);
        return;
    }

    const attackField = require("../cardActions/attackField.js");

    await attackField.run(client, turnLog, player, player2, cardIndex, cardIndex2);
}