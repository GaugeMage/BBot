exports.run = async(client, turnLog, args, player, player2) => {

    const spellCards = require('../cards/spellCards.json');
    [summonCommand, ...cardName] = args.split(" ");
    cardName = cardName.join(" ");

    //Check if the card exists in the player's hand
    let cardIndex = player.hand.findIndex(card => card.name === cardName);

    if(cardIndex === -1){
        client.users.cache.get(player.id).send("That card is not in your hand!");
        return;
    }

    //Check if the card is a spell card
    let isSpellCard = false;
    let card = null;
    for(let i = 0; i < spellCards.length; i++){
        if(spellCards[i].name === cardName){
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

    client.users.cache.get(player.id).send("You have cast " + card.name + "!");
    turnLog.text += "\n" + player.name + " has cast " + card.name + "!";

    //Special effects for cards
    const chooseAllyTarget = require('./chooseAllyTarget.js');
    const chooseEnemyTarget = require('./chooseEnemyTarget.js');
    const damageField = require('../cardActions/damageField.js');

    switch(card.name){
        case "Stand Strike":
            let standIndex = -1;
            do {
                standIndex = await chooseAllyTarget.run(client, player);
                //Check if the player did not choose a stand
                if(player.field[standIndex].type !== "Stand"){
                    client.users.cache.get(player.id).send("That card is not a stand! Try again");
                }
            } while(player.field[standIndex].type !== "Stand");

            
            let enemyIndex = null;
            do {
                enemyIndex = await chooseEnemyTarget.run(client, player, player2);
            
                //Check if card at enemy index is a location card
                if(player2.field[enemyIndex].type === "Location"){
                    await client.users.cache.get(player.id).send("You can't damage a location card! Try again");
                }
            } while(player2.field[enemyIndex].type === "Location");

            //Have the stand strike the enemy
            await damageField.run(client, turnLog, player, player2, enemyIndex, player.field[standIndex].attack);
            break;
    }
}