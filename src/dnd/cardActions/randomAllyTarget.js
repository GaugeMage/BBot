exports.run = async(client, player) => {
    let cardIndex = null;
    while(cardIndex === null){
        //Find how many cards are in the field
        let fieldLength = player.field.findIndex(card => card === null);
        if(cardIndex === null){
            //If there are no cards in the field, return
            if(fieldLength === 0){
                await client.users.cache.get(player.id).send("No cards in the field!");
                return;
            }
            //Choose a random card
            cardIndex = Math.floor(Math.random() * fieldLength);
        }

        //Check if there is only one card and that card is a location card
        if(fieldLength === 1 && player.field[0].type === "Location"){
            await client.users.cache.get(player.id).send("Cannot damage a location card!");
            return;
        }
        
        if(player.field[cardIndex].type === "Location"){
            cardIndex = null;
        }
    }
}