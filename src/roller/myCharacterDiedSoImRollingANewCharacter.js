exports.run = async(message) => {
    //Rolls up a new character
    message.channel.send("Your new character's stats:");
    let tempString = "";
    let totalValue = 0;
    for(let i = 0; i < 6; i++){
        let rolls = [];
        let total = 0;
        for(let j = 0; j < 4; j++){
            rolls.push(Math.floor(Math.random() * 6) + 1);
            total += rolls[j];
        }

        tempString += "\n";
        const min = Math.min(...rolls);
        let minFound = false;
        for(let j = 0; j < rolls.length; j++){
            if(minFound == true || rolls[j] != min){
                tempString += "(" + rolls[j] + ") ";
            } else {
                tempString += "~~(" + rolls[j] + ")~~ ";
                minFound = true;
            }
        }
        //Removes smallest value from array
        rolls.splice(rolls.indexOf(Math.min(...rolls)), 1);
        
        total = 0;
        for(let j = 0; j < rolls.length; j++){
            total += rolls[j];
        }

        tempString += "= " + total;
        totalValue += total;
    }
    message.channel.send(tempString);
    message.channel.send("Total: " + totalValue);
};