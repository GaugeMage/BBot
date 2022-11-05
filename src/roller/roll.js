exports.run = async(message, args) => {
    require('../helpers/checkArgs.js').run(args, message);
    //Split the string after d
    const temp = args[0].split('d');
    const temp2 = temp[1].split('+');
    //Get the number of dice
    const diceAmount = Number(temp[0]);
    //Get the dice type
    const diceType = Number(temp2[0]);
    //Get the modifier
    const modifier = Number(temp2[1]);

    let rolls = [];
    let total = 0;
    for(let i = 0; i < diceAmount; i++){
        rolls.push(Math.floor(Math.random() * diceType) + 1);
        total += rolls[i];
    }
    //If modifier exists, add it to the total
    if(modifier){
        total += Number(modifier);
    }
    if(rolls.length > 1){
        message.channel.send('You rolled a total of: ' + total + ' :game_die:');
        let tempString = "";
        for(let i = 0; i < rolls.length; i++){
            tempString += "\n";
            const currentRoll = rolls[i];
            if(currentRoll === 1){
                tempString += 'You rolled a 1 :sob: big oof';
            } else if(currentRoll === diceType){
                tempString += 'You rolled a ' + diceType + ' POG! YOUR UWU LEVELS ARE OVER 8000';
            } else if(currentRoll === 8){
                tempString += 'You rolled a 8. THAT IS A VERY SPECIAL NUMBER. THAT IS WAY BETTER THAN A NATURAL ' + diceType;
            } else {
                tempString += 'You rolled a ' + currentRoll + ' :game_die:';
            }
        }
        //If it is longer than 2000 characters, split it
        if(tempString.length > 1900){
            const tempString2 = tempString.split('\n');
            let tempString3 = "";
            for(let i = 0; i < tempString2.length; i++){
                tempString3 += tempString2[i] + '\n';
                if(tempString3.length > 1900){
                    message.channel.send(tempString3);
                    tempString3 = "";
                }
            }
            message.channel.send(tempString3);
        } else {
            message.channel.send(tempString);
        }
    } else {
        if(modifier){
            message.channel.send('You rolled a ' + total + ' :game_die:');
        }
        if(rolls[0] === 1){
            message.channel.send('You rolled a 1 :sob: big oof');
        } else if(rolls[0] === diceType){
            message.channel.send('You rolled a ' + diceType + ' POG! YOUR UWU LEVELS ARE OVER 8000');
        } else if(rolls[0] === 8){
            message.channel.send('You rolled a 8. THAT IS A VERY SPECIAL NUMBER. THAT IS WAY BETTER THAN 20');
        } else {
            if(modifier){
                message.channel.send('You rolled a ' + rolls[0] + ' with your modifier of ' + modifier + ' :game_die:');
            }
            message.channel.send('You rolled a ' + rolls[0] + ' :game_die:');
        }
    }
};