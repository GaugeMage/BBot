exports.run = async(client, turnLog, player, player2, cardIndex1, cardIndex2) => {
    //Stores the card from cardIndex2 into cardIndex1
    if(player.field[cardIndex1]['storedCards'] === undefined){
        player.field[cardIndex1]['storedCards'] = [];
    }
    
    player.field[cardIndex1]['storedCards'].push(Object.assign({}, player2.field[cardIndex2]));

    turnLog.text += "\n" + player.field[cardIndex1].name + " has stored " + player2.field[cardIndex2].name + "!";
    await client.users.cache.get(player.id).send(player.field[cardIndex1].name + " has stored " + player2.field[cardIndex2].name + "!");

    player2.field[cardIndex2] = null;
    //Move all cards after the card index to the left
    const shiftCards = require('../gameCommands/shiftCards.js');
    await shiftCards.run(player2, cardIndex2);
}