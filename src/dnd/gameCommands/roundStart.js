exports.run = async(client, turnLog, player) => {

    //Finds the null
    let fieldLength = player.field.findIndex(card => card === null);
    //Checks every card in the player's field
    for(let i = 0; i < fieldLength; i++){
        let card = player.field[i];
        //If the card is a location card, it will be removed from the field
        if(card.name == "Speedwagon Foundation HQ"){
            player.gold += 2;
            client.users.cache.get(player.id).send("You have gained 2 gold from " + card.name + "!");
            turnLog.text += "\n" + player.name + " has gained 2 gold from " + card.name + "!";
        }
    }
}