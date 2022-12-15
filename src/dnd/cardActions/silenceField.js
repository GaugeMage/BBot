exports.run = async(client, turnLog, player, player2, cardIndex) => {
    //Check if card is already silenced
    if(!player2.field[cardIndex]?.name.includes(" (S-")){
        player2.field[cardIndex].name = player2.field[cardIndex].name + " (S-" + player2.field[cardIndex].attack + ")";
        player2.field[cardIndex].attack = 0;
    }
    await client.users.cache.get(player.id).send("Card: " + player2.field[cardIndex]?.name + " silenced!");
    turnLog.text += "\n" + player2.field[cardIndex]?.name + " silenced!";

    //Check if American Pie is in player 1's field
    let americanPieIndex = player.field.findIndex(card => card?.name === "American Pie");

    //If American Pie is in player 1's field, deal 1 damage to a random card
    if(americanPieIndex !== -1){
        turnLog.text += "\nAmerican Pie Damaged: ";
        const damageField = require('./damageField.js');
        await damageField.run(client, turnLog, player, player2, null, 1);
    }

    //Check if ultor is in player 2's field
    const checkUltor = require("./checkUltor.js");
    let ultorStands = await checkUltor.run(player);

    //Check if American pie is in ultor stands
    if(ultorStands?.includes("American Pie")){
        turnLog.text += "\nAmerican Pie Damaged: ";
        const damageField = require('./damageField.js');
        await damageField.run(client, turnLog, player, player2, null, 1);
    }
}