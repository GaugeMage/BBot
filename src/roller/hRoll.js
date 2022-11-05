exports.run = async(message, args) => {
    require('../helpers/checkArgs').run(args, message);
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
    message.channel.send('You rolled a total of: ' + total + ' :game_die:');
};