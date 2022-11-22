exports.run = async(client, turnLog, player, player2) => {
    const damageField = require('../cardActions/damageField.js');
    const allyDamage = require('../cardActions/allyDamage.js');
    const paradox = require('../cardActions/paradox.js');

    for(let i = 0; i < player.field.length; i++){
        if(player.field[i] !== null){
            player.field[i].hasAttacked = false;
            if(player.field[i].name.includes("(S-")){
                //Remove silence and add attack back depending on the silence amount
                let silenceAmount = player.field[i].name.split(" (S-")[1].split(")")[0];
                player.field[i].name = player.field[i].name.split(" (S-")[0];
                player.field[i].attack += parseInt(silenceAmount);
            }
            if(player.field[i].name.includes("(P-G-")){
                //Tick down the turns left and do 2 damage to the unit until turnsLeft = 0
                let turnsLeft = player.field[i].name.split(" (P-G-")[1].split(")")[0];
                if(turnsLeft !== 0){
                    await allyDamage.run(client, turnLog, player, null, 2);
                }
                --turnsLeft;
                if(turnsLeft !== 0){
                    player.field[i].name = player.field[i].name.split(" (P-G-")[0] + " (P-G-" + turnsLeft + ")";
                } else {
                    player.field[i].name = player.field[i].name.split(" (P-G-")[0];
                }
            }
            if(player.field[i].name.includes("(P-B)")){
                //Remove the paradox
                player.field[i].name = player.field[i].name.split(" (P-B)")[0];
            }
        }
        //Check if paradox is in player 2's field
        let paradoxIndex = player2.field.findIndex(card => card.name.includes("Paradox"));
        if(paradoxIndex !== -1){
            //Check if the current card is paradoxified
            if(player.field[i] !== null && player.field[i].name.includes("(P)")){
                //Paradoxify neighboring cards:
                if(i !== 0 && player.field[i - 1] !== null){
                    await paradox.run(client, turnLog, player2, player, i - 1);
                }
                if(i !== player.field.length - 1 && player.field[i + 1] !== null){
                    await paradox.run(client, turnLog, player2, player, i + 1);
                }
            }
        }
    }
}