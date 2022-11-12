exports.run = async(client, player, player2, cardIndex, damageAmount) => {
    //If cardIndex is null, damage a random card
    if(cardIndex === null){
        //Find how many cards are in the field
        let fieldLength = 0;
        for(let i = 0; i < player2.field.length; i++){
            if(player2.field[i] === null){
                fieldLength = i;
                break;
            }
        }

        //If there are no cards in the field, return
        if(fieldLength === 0){
            await client.users.cache.get(player.id).send("No cards in the field!");
            return;
        }

        //Choose a random card
        cardIndex = Math.floor(Math.random() * fieldLength);
    }

    //Deal damage to the card
    player2.field[cardIndex].health -= damageAmount;
    await client.users.cache.get(player.id).send("Dealt " + damageAmount + " damage to " + player2.field[cardIndex].name + "!");
}