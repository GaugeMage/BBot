exports.run = async(client, turnLog, player, player2, card) => {
    client.users.cache.get(player.id).send("You have cast " + card.name + "!");
    turnLog.text += "\n" + player.name + " has cast " + card.name + "!";

    //Special effects for cards
    const chooseAllyTarget = require('../../playerCommands/chooseAllyTarget.js');
    const chooseEnemyTarget = require('../../playerCommands/chooseEnemyTarget.js');
    const damageField = require('../damageField.js');
    const chooseAllyStand = require('../../playerCommands/chooseAllyStand.js');

    switch(card.name){
        case "Stand Strike":
            let standIndex = await chooseAllyStand.run(client, player);
            const enemyIndex = await chooseEnemyTarget.run(client, player, player2);

            //Have the stand strike the enemy
            await damageField.run(client, turnLog, player, player2, enemyIndex, player.field[standIndex].attack);
            break;
        case "Stand Rush":
            //TODO: Implement
            break;
        case "Free Candy!":
            //TODO: Implement
            break;
        case "Paradox Spit":
            //TODO: Implement
            break;
        case "Golden Liquid Syringe":
            //TODO: Implement
            break;
        case "D10":
            //TODO: Implement
            break;
        case "Donald's Zettaflare!":
            //TODO: Implement
            break;
        case "Volume Mourning":
            //TODO: Implement
            break;
        case "Sonic Cannon":
            //TODO: Implement
            break;
        case "Bite":
            const targetIndex = await chooseEnemyTarget.run(client, player, player2);
            await damageField.run(client, turnLog, player, player2, targetIndex, 2);
            break;
    }

}