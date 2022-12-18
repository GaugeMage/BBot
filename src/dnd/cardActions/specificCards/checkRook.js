exports.run = async(client, turnLog, player, player2, cardIndex) => {
    //Check if card being damaged is Rook
    if(player2.field[cardIndex].name !== "Rook"){
        return false;
    }

    turnLog.text += "\n" + player2.name + "'s Rook has transformed into Ricky Rat!";
    client.users.cache.get(player.id).send("Your Rook has transformed into Ricky Rat!");

    //Change card to Ricky
    player2.field[cardIndex] = player2.field[cardIndex].generatedCharacters[0];
    return true;
}