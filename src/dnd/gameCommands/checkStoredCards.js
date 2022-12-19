exports.run = async(client, turnLog, player1, player2, card) => {
    console.log(card);
    if(card['storedCards'] === undefined){
        return;
    }

    //Iterate through the stored cards
    for(let i = 0; i < card['storedCards'].length; i++){
        // console.log("THIS HAPPENS!!!");
        const summonCard = require('../cardActions/actionCards/summonCard.js');
        await summonCard.run(client, turnLog, player2, player1, card['storedCards'][i]);

        //Remove the card from the stored cards
        card['storedCards'].splice(i, 1);
        i -= 1;
    }
}