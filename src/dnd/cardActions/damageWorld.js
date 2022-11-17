exports.run = async(client, turnLog, player, damageAmount) => {
    player.worldHP -= damageAmount;
    await client.users.cache.get(player.id).send(player.name + "'s world took "+ damageAmount + " damage!");
    turnLog.text += "\n" + player.name + "'s world took " + damageAmount + " damage!";

    if(player.worldHP <= 0){
        await client.users.cache.get(player.id).send(player.name + "'s world has been destroyed!");
        turnLog.text += "\n" + player.name + "'s world has been destroyed!";
    }
}