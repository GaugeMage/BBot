exports.run = async(client, player, player2, cardAmount) => {
    //Checks if player 2 has at least cardAmount of character cards in their field
    let cardCount = 0;
    for(let i = 0; i < player2.field.length; i++){
        if(player2.field[i]?.attack !== undefined){
            cardCount++;
        }
    }

    return cardCount >= cardAmount;
}