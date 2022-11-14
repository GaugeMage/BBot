exports.run = async(client, turnLog, player, player2, standName) => {
    //Character cards
    const characterCards = require('../cards/characterCards.json');

    //Check if there is space
    if(player.field[player.field.length - 1] !== null){
        client.users.cache.get(player.id).send("Your field is full so this stand will not summon!");
        return;
    }

    //Looks for card in characterCards
    let card = null;
    for(let i = 0; i < characterCards.length; i++){
        if(characterCards[i].stand?.name === standName){
            card = Object.assign({}, characterCards[i].stand);
            break;
        }
    }

    //Insert card into field
    for(let i = 0; i < player.field.length; i++){
        if(player.field[i] === null){
            player.field[i] = card;
            break;
        }
    }

    player["standsSummoned"].push(card);

    return;
}