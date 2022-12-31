exports.run = async(player) => {
    let deck = player.deck;
    let cards = deck.cards;

    const characterCards = require('../cards/characterCards.json');
    const locationCards = require('../cards/locationCards.json');
    const equipmentCards = require('../cards/equipmentCards.json');
    const spellCards = require('../cards/spellCards.json');

    for(let j = 0; j < cards.length; j++){
        let currentCard = cards[j];
        let card = null;
        for(let i = 0; i < characterCards.length; i++){
            if(characterCards[i]?.name === currentCard){
                card = Object.assign({}, characterCards[i]);
                break;
            }
        }

        if(card === null){
            for(let i = 0; i < locationCards.length; i++){
                if(locationCards[i]?.name === currentCard){
                    card = Object.assign({}, locationCards[i]);
                    card['type'] = "Location";
                    card['attack'] = 0;
                    card['health'] = 0;
                    break;
                }
            }
        }

        if(card === null){
            for(let i = 0; i < equipmentCards.length; i++){
                if(equipmentCards[i]?.name === currentCard){
                    card = Object.assign({}, equipmentCards[i]);
                    break;
                }
            }
        }

        if(card === null){
            for(let i = 0; i < spellCards.length; i++){
                if(spellCards[i]?.name === currentCard){
                    card = Object.assign({}, spellCards[i]);
                    break;
                }
            }
        }

        cards[j] = card;
    }

    player["standsSummoned"] = [];
    player["horsemenSummoned"] = {
        buddySummoned: false,
        repugnansSummoned: false,
        catastropheSummoned: false,
        rookSummoned: false,
        tylerSummoned: false,
    };

    deck.cards = cards;
    player.deck = deck;
}