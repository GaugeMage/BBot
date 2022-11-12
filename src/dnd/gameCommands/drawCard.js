exports.run = async(client, turnLog, player) => {
    //Draws the top card of the player's deck
    let deck = player.deck;
    let cards = deck.cards;
    let hand = player.hand;
    //Check if deck is empty
    if(cards.length === 0){
        client.users.cache.get(player.id).send("Your deck is empty!");
        return ;
    }
    let cardDrawn = cards[0];

    //Find the card in any of the card files
    const characterCards = require('../cards/characterCards.json');
    const locationCards = require('../cards/locationCards.json');
    const equipmentCards = require('../cards/equipmentCards.json');
    const spellCards = require('../cards/spellCards.json');

    let card = null;
    for(let i = 0; i < characterCards.length; i++){
        if(characterCards[i].name === cardDrawn){
            card = Object.assign({}, characterCards[i]);
            break;
        }
    }

    if(card === null){
        for(let i = 0; i < locationCards.length; i++){
            if(locationCards[i].name === cardDrawn){
                card = Object.assign({}, locationCards[i]);
                card['attack'] = 0;
                card['health'] = 0;
                break;
            }
        }
    }

    if(card === null){
        for(let i = 0; i < equipmentCards.length; i++){
            if(equipmentCards[i].name === cardDrawn){
                card = Object.assign({}, equipmentCards[i]);
                break;
            }
        }
    }

    if(card === null){
        for(let i = 0; i < spellCards.length; i++){
            if(spellCards[i].name === cardDrawn){
                card = Object.assign({}, spellCards[i]);
                break;
            }
        }
    }

    hand.push(card);
    cards.splice(0, 1);
    deck.cards = cards;
    player.deck = deck;
    player.hand = hand;

    turnLog.text += "\n" + player.name + " drew a card!";
}