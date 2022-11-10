exports.run = async(client, message, player) => {
    const drawCard = require('./drawCard.js');
    const showHand = require('./showHand.js');

    let tempPlayer = player;

    //Opening hand should have 4 cards
    for(let i = 0; i < 4; i++){
        tempPlayer = await drawCard.run(client, message, player);
    }

    //Show the player's hand
    client.users.cache.get(player.id).send("Your hand:");
    showHand.run(client, player);

    console.log(tempPlayer);
    return tempPlayer;
}