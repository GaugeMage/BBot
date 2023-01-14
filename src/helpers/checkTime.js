exports.run = (CMD_NAME) => {
    //Checks if CMD_NAME is in the format HH:MM or H:MM
    if(CMD_NAME.length === 4 || CMD_NAME.length === 5){
        const timeSplit = CMD_NAME.split(':');
        if(timeSplit.length !== 2){
            return false;
        }
        if(timeSplit[0] <= 12 && timeSplit[0] >= 1){
            if(timeSplit[1] <= 59 && timeSplit[1] >= 1){
                return true;
            }
        } else {
            return false;
        }
    }
    return false;
}