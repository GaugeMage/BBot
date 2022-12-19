exports.run = async(client, turnLog, player, player2, card) => {
    //Stores card into the character who has the Stand "See You Again"
    let charIndex = player2.field.findIndex(card => card?.stand?.name.includes("See You Again"));

    //Checks if see you again has already been triggered this round
    if(player2.field[charIndex]['seeYouAgainTriggered'] === undefined){
        return false;
    } else if(player2.field[charIndex]['seeYouAgainTriggered'] === true){
        return false;
    } else if(player2.field[charIndex]['seeYouAgainTriggered'] === false){
        player2.field[charIndex]['seeYouAgainTriggered'] = true;
    }


    const storeCard = require('../storeCard.js');
    await storeCard.run(client, turnLog, player2, player, charIndex, card);

    return true;
}