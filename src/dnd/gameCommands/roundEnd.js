exports.run = async(client, turnLog, player) => {
    //Check if any card is silenced (Silenced would be in the name as (S-<Silence Amount>))
    for(let i = 0; i < player.field.length; i++){
        if(player.field[i] !== null){
            if(player.field[i].name.includes("(S-")){
                //Remove silence and add attack back depending on the silence amount
                let silenceAmount = player.field[i].name.split(" (S-")[1].split(")")[0];
                player.field[i].name = player.field[i].name.split(" (S-")[0];
                player.field[i].attack += parseInt(silenceAmount);
            }
        }
    }
}