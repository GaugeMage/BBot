exports.run = async(client, turnLog, player, player2, cardIndex) => {
    //Check if card is already paradoxified
    if(!player2.field[cardIndex].name.includes("(P)")){
        //Afflicts the card with a random paradox

        //Remove the (P) from the card name
        player2.field[cardIndex].name = player2.field[cardIndex].name.replace(" (P)", "");

        let randomParadox = Math.floor(Math.random() * 3);
        if(randomParadox === 0){
            //Grandfather paradox which does 2 damage over 3 turns
            player2.field[cardIndex].name = player2.field[cardIndex].name + " (P-G-3)";
            await client.users.cache.get(player.id).send("Card: " + player2.field[cardIndex].name + " afflicted with Grandfather Paradox!");
            turnLog.text += "\n" + player2.field[cardIndex].name + " afflicted with Grandfather Paradox!";
        } else if(randomParadox === 1){
            //Archer Paradox which makes all random targeting instead target this card
            player2.field[cardIndex].name = player2.field[cardIndex].name + " (P-A)";
            await client.users.cache.get(player.id).send("Card: " + player2.field[cardIndex].name + " afflicted with Archer Paradox!");
            turnLog.text += "\n" + player2.field[cardIndex].name + " afflicted with Archer Paradox!";
        } else {
            //Barber's paradox which makes a card unable to attack in the next turn
            player2.field[cardIndex].name = player2.field[cardIndex].name + " (P-B)";
            await client.users.cache.get(player.id).send("Card: " + player2.field[cardIndex].name + " afflicted with Barber's Paradox!");
            turnLog.text += "\n" + player2.field[cardIndex].name + " afflicted with Barber's Paradox!";
        }

        //Check if paradox is in player 1's field
        let paradoxIndex = player.field.findIndex(card => card.name === "Paradox");

        //If paradox is in player 1's field, afflict the card with another different paradox
        if(paradoxIndex !== -1){
            let randomParadox2 = null
            do {
                randomParadox2 = Math.floor(Math.random() * 3);
            } while(randomParadox2 === randomParadox);

            if(randomParadox2 === 0){
                //Grandfather paradox which does 2 damage over 3 turns
                player2.field[cardIndex].name = player2.field[cardIndex].name + " (P-G-3)";
                await client.users.cache.get(player.id).send("Card: " + player2.field[cardIndex].name + " afflicted with Grandfather Paradox!");
                turnLog.text += "\n" + player2.field[cardIndex].name + " afflicted with Grandfather Paradox!";
            } else if(randomParadox2 === 1){
                //Archer Paradox which makes all random targeting instead target this card
                player2.field[cardIndex].name = player2.field[cardIndex].name + " (P-A)";
                await client.users.cache.get(player.id).send("Card: " + player2.field[cardIndex].name + " afflicted with Archer Paradox!");
                turnLog.text += "\n" + player2.field[cardIndex].name + " afflicted with Archer Paradox!";
            } else {
                //Barber's paradox which makes a card unable to attack in the next turn
                player2.field[cardIndex].name = player2.field[cardIndex].name + " (P-B)";
                await client.users.cache.get(player.id).send("Card: " + player2.field[cardIndex].name + " afflicted with Barber's Paradox!");
                turnLog.text += "\n" + player2.field[cardIndex].name + " afflicted with Barber's Paradox!";
            }
        }
    } else {
        //Paradoxify the card (put (P) after the name)
        player2.field[cardIndex].name = player2.field[cardIndex].name + " (P)";
    }
}