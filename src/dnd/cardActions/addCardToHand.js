exports.run = async(client, turnLog, player, card) => {
    card["created"] = true;
    //Insert card into hand
    player.hand.push(Object.assign({}, card));

    turnLog.text += "\n" + player.name + " has added a card into their hand!";
    client.users.cache.get(player.id).send("You have added " + card.name + " into your hand!");
}