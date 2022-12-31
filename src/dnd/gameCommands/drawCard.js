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

    hand.push(cardDrawn);
    cards.splice(0, 1);
    deck.cards = cards;
    player.deck = deck;
    player.hand = hand;

    turnLog.text += "\n" + player.name + " drew a card!";
}