exports.run = async(currentPlayer, cardIndex) => {
    //Move all cards after the card index to the left
    if(currentPlayer.field[cardIndex - 1] === null){
        cardIndex -= 1;
    }

    for(let i = cardIndex; i < currentPlayer.field.length; i++){
        if(currentPlayer.field[i + 1] !== null && currentPlayer.field[i + 1] !== undefined){
            currentPlayer.field[i] = currentPlayer.field[i + 1];
            currentPlayer.field[i + 1] = null;
            continue;
        }

        if(currentPlayer.field[i + 2] !== null && currentPlayer.field[i + 2] !== undefined){
            currentPlayer.field[i] = currentPlayer.field[i + 2];
            currentPlayer.field[i + 2] = null;
        }
    }

}