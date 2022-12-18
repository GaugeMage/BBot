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

    switch(card.name){
        case "Merrie Melodies":
            //Add a copy of a random spell from the enemy's deck to your hand
            const spellCards = require('../cards/spellCards.json');
            let randomSpell = null;
            let indexes = [];
            while(randomSpell === null){
                if(indexes.length >= player2.deck.cards.length){
                    client.users.cache.get(player.id).send("There are no spells in your opponent's deck!");
                    break;
                }
                let randomIndex = Math.floor(Math.random() * player2.deck.cards.length);
                if(indexes.includes(randomIndex)){
                    continue;
                }
                indexes.push(randomIndex);
                for(let i = 0; i < spellCards.length; i++){
                    if(spellCards[i].name == player2.deck.cards[randomIndex]){
                        randomSpell = Object.assign({}, spellCards[i]);
                        const addCardToHand = require('./addCardToHand.js');
                        await addCardToHand.run(client, turnLog, player, randomSpell);
                        break;
                    }
                }
            }
            
            //Equip a random equipment card
            const equipCard = require('./equipCard.js');
            const equipmentCards = require('../cards/equipmentCards.json');
            //Selects a random equipment from the equipmentCards
            let randomEquipment = equipmentCards[Math.floor(Math.random() * equipmentCards.length)];
            randomEquipment["created"] = true;
            //Gets the index of the stand in the field
            let standIndex = player.field.findIndex(cardlet => cardlet?.name.includes(card.name));
            await equipCard.run(client, turnLog, player, standIndex, randomEquipment);

            //Reduces the cost of all created cards in hand by 1
            for(let i = 0; i < player.hand.length; i++){
                if(player.hand[i]?.created){
                    player.hand[i].cost -= 1;
                }
            }
            break;
    }

    return;
}