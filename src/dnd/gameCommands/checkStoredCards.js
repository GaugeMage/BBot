exports.run = async(client, turnLog, player1, player2, card) => {
    if(card['storedCards'] === undefined){
        return;
    }

    //Iterate through the stored cards
    for(let i = 0; i < card['storedCards'].length; i++){
        // console.log("THIS HAPPENS!!!");
        const summonCard = require('../cardActions/actionCards/summonCard.js');
        //Check what type of card it is
        const characterCard = require('../cards/characterCards.json');
        const spellCard = require('../cards/spellCards.json');
        const equipmentCard = require('../cards/equipmentCards.json');

        if(characterCard.findIndex(tempCard => tempCard.name.includes(card['storedCards'][i].name)) !== -1){
            await summonCard.run(client, turnLog, player2, player1, card['storedCards'][i]);
        } else if(spellCard.findIndex(tempCard => tempCard.name.includes(card['storedCards'][i].name)) !== -1 || equipmentCard.findIndex(tempCard => tempCard.name.includes(card['storedCards'][i].name)) !== -1){
            //Return the spell or equipment to the hand of the player who played it
            player2.hand.push(card['storedCards'][i]);
            turnLog.text += "\n" + card['storedCards'][i].name + " has been returned to " + player2.name + "'s hand!";
            await client.users.cache.get(player1.id).send(card['storedCards'][i].name + " has been returned to " + player2.name + "'s hand!");
        }
        //Remove the card from the stored cards
        card['storedCards'].splice(i, 1);
        i -= 1;
    }
}