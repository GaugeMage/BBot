exports.run = async(player) => {
    //Shuffles the player's deck
    let deck = player.deck;
    let cards = deck.cards;
    let shuffledCards = [];
    let randomIndex;
    while(cards.length > 0){
        randomIndex = Math.floor(Math.random() * cards.length);
        shuffledCards.push(cards[randomIndex]);
        cards.splice(randomIndex, 1);
    }
    deck.cards = shuffledCards;
    player.deck = deck;
    
    return player;
}