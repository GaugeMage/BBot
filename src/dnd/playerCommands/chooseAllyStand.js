exports.run = async(client, player, player2) => {
    const chooseAllyTarget = require('./chooseAllyTarget.js');
    let standIndex = -1;
    do {
        standIndex = await chooseAllyTarget.run(client, player);
        //Check if the player did not choose a stand
        if(player.field[standIndex].type !== "Stand"){
            client.users.cache.get(player.id).send("That card is not a stand! Try again");
        }
    } while(player.field[standIndex].type !== "Stand");

    return standIndex;
}