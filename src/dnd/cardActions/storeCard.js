exports.run = async(client, turnLog, player, player2, charIndex, card) => {
    //Stores the card
    if(player.field[charIndex]['storedCards'] === undefined){
        player.field[charIndex]['storedCards'] = [];
    }

    player.field[charIndex]['storedCards'].push(Object.assign({}, card));

    turnLog.text += "\n" + player.field[charIndex].name + " has stored " + card.name + "!";
}