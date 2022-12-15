exports.run = async(player) => {
    let ultorStandNames = [];
    for(let i = 0; i < player.subField.length; i++){
        if(player.subField[i] !== null){
            if(player.subField[i]?.name.startsWith("Ultor")){
                ultorStandNames.push(player.subField[i]?.name.substring(7, player.subField[i]?.name.length - 1));
            }
        }
    }

    if(ultorStandNames.length !== 0){
        return ultorStandNames;
    }

    return null;
}