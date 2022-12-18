exports.run = async(client, turnLog, player, cardIndex, equipment) => {
    //Insert card into subfield
    player.subField[cardIndex] = equipment;

    turnLog.text += "\n" + player.field[cardIndex].name + " has equipped " + equipment.name + "!";
    client.users.cache.get(player.id).send(player.field[cardIndex].name + " has equipped " + equipment.name + "!");
}