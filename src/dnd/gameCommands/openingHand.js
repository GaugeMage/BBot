exports.run = async(client, turnLog, player) => {
    const drawCard = require('./drawCard.js');

    //Opening hand should have 4 cards
    for(let i = 0; i < 4; i++){
        await drawCard.run(client, turnLog, player);
    }
}