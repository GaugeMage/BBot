exports.run = async(client, player) => {
    let cardIndex = null;
    while(isNaN(cardIndex) || cardIndex < 1 || player.field[cardIndex - 1] === null){
        await client.users.cache.get(player.id).send("Choose the position of the **allied** card you want to target (1-" + player.field.length + ")");
        cardIndex = await client.users.cache.get(player.id).dmChannel.awaitMessages({filter: m => m.author.id === player.id, max: 1})
        cardIndex = cardIndex.first().content;
        if(isNaN(cardIndex) || cardIndex < 1 || player.field[cardIndex - 1] === null){
            client.users.cache.get(player.id).send("Invalid input! The card will not be targeted.");
        } else {
            return cardIndex - 1;
        }
    }
}