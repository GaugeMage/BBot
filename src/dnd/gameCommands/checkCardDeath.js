exports.run = async(client, turnLog, player, player2) => {
    //Check both players
    let currentPlayer = player;
    for(let i = 0; i < 2; i++){
        if(i === 2){
            currentPlayer = player2;
        }
        //Iterate through player 2 field
        for(let cardIndex = 0; cardIndex < currentPlayer.field.length; cardIndex++){
            console.log("It is this");
            //If the card is null, skip it
            if(currentPlayer.field[cardIndex] === null){
                continue;
            }

            //If card is a location card, skip it
            if(currentPlayer.field[cardIndex].type === "Location"){
                continue;
            }

            //If the card's health is 0 or less, kill it
            if(currentPlayer.field[cardIndex].health <= 0){
                await client.users.cache.get(player.id).send(currentPlayer.field[cardIndex].name + " has died!");
                turnLog.text += "\n" + currentPlayer.field[cardIndex].name + " has died!";

                //If the card is a stand user, kill the stand (if it exists)
                breakCheck: if(currentPlayer.field[cardIndex].type == "Stand User"){
                    if(currentPlayer.field[cardIndex + 1].type == "Stand"){
                        await client.users.cache.get(player.id).send(currentPlayer.field[cardIndex + 1].name + " has died!");
                        turnLog.text += "\nDue to Stand User and Stand HP linkage: " + currentPlayer.field[cardIndex + 1].name + " has died!";
                        currentPlayer.field[cardIndex + 1] = null;
                        break breakCheck;
                    }
                }

                //If the card is a stand, kill the stand user (if it exists)
                breakCheck: if(currentPlayer.field[cardIndex].type == "Stand"){
                    if(currentPlayer.field[cardIndex - 1] == undefined){
                        break breakCheck;
                    }
                    if(currentPlayer.field[cardIndex - 1].type == "Stand User"){
                        await client.users.cache.get(player.id).send(currentPlayer.field[cardIndex - 1].name + " has died!");
                        turnLog.text += "\nDue to Stand User and Stand HP linkage: "  + currentPlayer.field[cardIndex - 1].name + " has died!";
                        currentPlayer.field[cardIndex - 1] = null;
                        break breakCheck;
                    }
                }

                currentPlayer.field[cardIndex] = null;

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
        }
    }
}