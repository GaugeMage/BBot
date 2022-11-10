exports.run = async(client, message, player) => {
    //Draws the top card of the player's deck
    let deck = player.deck;
    // console.log(deck)
    let cards = deck.cards;
    let hand = player.hand;
    let cardDrawn = cards[0];
    hand.push(cardDrawn);
    cards.splice(0, 1);
    deck.cards = cards;
    player.deck = deck;
    player.hand = hand;
    return player;
}