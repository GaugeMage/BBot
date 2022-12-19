exports.run = async(client, turnLog, player, player2, cardIndex, equipment) => {
    //Checks if the Stand "See You Again" is in the enemy player's field
    if(player2.field.some(card => card?.stand?.name?.includes("See You Again"))){
        const seeYouAgain = require('../specificCards/seeYouAgain.js');
        const triggered = await seeYouAgain.run(client, turnLog, player, player2, card);
        if(triggered){
            await client.users.cache.get(player.id).send(card.name + " has been stored in " + player2.field[player2.field.findIndex(card => card?.stand?.name?.includes("See You Again"))].name + "!");
            return;
        }
    }
    
    //Insert card into subfield
    player.subField[cardIndex] = equipment;

    client.users.cache.get(player.id).send(player.field[cardIndex].name + " has equipped " + equipment.name + "!");
    turnLog.text += "\n" + player.field[cardIndex].name + " has equipped " + equipment.name + "!";

    //Special effects for cards
    switch(card.name){
        case "Ultor":
            //Pick a random stand which was summoned
            let stand = player.standsSummoned[Math.floor(Math.random() * player.standsSummoned.length)];

            //Change the name of the card to Ultor (Stand Name)
            player.subField[charIndex].name ="Ultor (" + stand.name + ")";
            break;
    }
}