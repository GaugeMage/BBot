exports.run = async(client, turnLog, player, player2, cardIndex) => {
    //Check if card is dead
    if(player2.field[cardIndex].health <= 0){
        await client.users.cache.get(player.id).send(player2.field[cardIndex].name + " has died!");
        turnLog.text += "\n" + player2.field[cardIndex].name + " has died!";

        //If the card is a stand user, kill the stand (if it exists)
        breakCheck: if(player2.field[cardIndex].type == "Stand User"){
            if(player2.field[cardIndex + 1].type == "Stand"){
                await client.users.cache.get(player.id).send(player2.field[cardIndex + 1].name + "has died!");
                turnLog.text += "\n Due to Stand User and Stand HP linkage:" + player2.field[cardIndex + 1].name + " has died!";
                player2.field[cardIndex + 1] = null;
                break breakCheck;
            }
        }

        //If the card is a stand, kill the stand user (if it exists)
        breakCheck: if(player2.field[cardIndex].type == "Stand"){
            if(player2.field[cardIndex - 1].type == "Stand User"){
                await client.users.cache.get(player.id).send(player2.field[cardIndex - 1].name + " has died!");
                turnLog.text += "\n Due to Stand User and Stand HP linkage:"  + player2.field[cardIndex - 1].name + " has died!";
                player2.field[cardIndex - 1] = null;
                break breakCheck;
            }
        }

        player2.field[cardIndex] = null;
    }
}