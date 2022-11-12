exports.run = async(message, player1, player2) => {

    let divider = "\n+--------------------------------------------------------------------------------------------------------------------------+\n";
    let fieldString = divider;
    const lineLength = fieldString.length;

    //Player 1's field
    //Show player 1's name and center it on the line
    fieldString += "| **" + player1.name + "** |";

    //Show player 1's world hp and center it on the line
    fieldString += "\n| World HP: **" + player1.worldHP + "** |" + " Gold: **" + player1.gold + "** |" + " Hand Size: **" + player1.hand.length + "** |" + " Deck Size: **" + player1.deck.cards.length + "** |";

    fieldString += divider;

    let tempStrings = [];
    //Add spaces to the end of each element to make the total length of the array equal to the length of the line
    for(let i = 0; i < player1.subField.length; i++){
        let tempString = "";
        let isEmpty = false;
        if(player1.subField[i] === null){
            isEmpty = true;
        }

        if(!isEmpty){
            tempString = "| " + (i + 1) + ". **" + player1.subField[i] + "**";
        } else {
            tempString = "| " + (i + 1) + ". ";
        }
        while(tempString.length < lineLength / player1.subField.length){
            tempString += " ";
        }
        tempStrings.push(tempString);
    }

    //Add the subfield elements to the string
    for(let i = 0; i < player1.subField.length; i++){
        fieldString += tempStrings[i];
    }
    fieldString += divider;

    //Add spaces to the end of each element to make the total length of the array equal to the length of the line
    tempStrings = [];
    for(let i = 0; i < player1.field.length; i++){
        let tempString = "";
        let isEmpty = false;
        if(player1.field[i] === null){
            isEmpty = true;
        }

        if(!isEmpty){
            tempString = "| " + (i + 1) + ". **" + player1.field[i].name + "**";
        } else {
            tempString = "| " + (i + 1) + ". ";
        }
        while(tempString.length < lineLength / player1.field.length){
            tempString += " ";
        }
        tempStrings.push(tempString);
    }

    //Add the field elements to the string
    for(let i = 0; i < player1.field.length; i++){
        fieldString += tempStrings[i];
    }

    fieldString += divider;

    //The attack and health values of the card for each space on the field for player 1
    //Add spaces to the end of each element to make the total length of the array equal to the length of the line
    const cCardData = require("../cards/characterCards.json");
    const lCardData = require("../cards/locationCards.json");
    const eCardData = require("../cards/equipmentCards.json");
    const sCardData = require("../cards/spellCards.json");
    console.log("Total Character Cards: " + cCardData.length)
    console.log("Total Location Cards: " + lCardData.length)
    console.log("Total Equipment Cards: " + eCardData.length)
    console.log("Total Spell Cards: " + sCardData.length)
    console.log("Total Cards: " + (cCardData.length + lCardData.length + eCardData.length + sCardData.length));

    //Checks player 1 field
    let field1Attack = [];
    let field1Health = [];
    for(let i = 0; i < player1.field.length; i++){
        //Check if the space is empty
        if(player1.field[i] === null){
            field1Attack.push(0);
            field1Health.push(0);
            continue;
        }

        field1Attack.push(player1.field[i].attack);
        field1Health.push(player1.field[i].health);
    }

    //Checks player 1 subfield
    for(let i = 0; i < player1.subField.length; i++){
        //Check if it is empty
        if(player1.subField[i] === null){
            continue;
        }

        console.log("Checking subfield card: " + player1.subField[i]);
        field1Attack[i] += player1.subField[i].attack;
        field1Health[i] += player1.subField[i].health;
    }

    //Checks player 2 field
    let field2Attack = [];
    let field2Health = [];
    for(let i = 0; i < player2.field.length; i++){
        //Check if the space is empty
        if(player2.field[i] === null){
            field2Attack.push(0);
            field2Health.push(0);
            continue;
        }

        field2Attack.push(player2.field[i].attack);
        field2Health.push(player2.field[i].health);
    }

    //Checks player 2 subfield
    for(let i = 0; i < player2.subField.length; i++){
        //Check if it is empty
        if(player2.subField[i] === null){
            continue;
        }
        field2Attack[i] += player2.subField[i].attack;
        field2Health[i] += player2.subField[i].health;
    }

    //Add spaces to the end of each element to make the total length of the array equal to the length of the line
    tempStrings = [];
    for(let i = 0; i < player1.field.length; i++){
        let tempString = "| " + (i + 1) + ". **" + field1Attack[i] + "** / **" + field1Health[i] + "**";
        while(tempString.length < lineLength / player1.field.length){
            tempString += " ";
        }
        tempStrings.push(tempString);
    }

    //Add the field elements to the string
    for(let i = 0; i < tempStrings.length; i++){
        fieldString += tempStrings[i];
    }

    fieldString += divider;

    //Add spaces to the end of each element to make the total length of the array equal to the length of the line
    tempStrings = [];
    for(let i = 0; i < player2.field.length; i++){
        let tempString = "| " + (i + 1) + ". **" + field2Attack[i] + "** / **" + field2Health[i] + "**";
        while(tempString.length < lineLength / player2.field.length){
            tempString += " ";
        }
        tempStrings.push(tempString);
    }

    //Add the field elements to the string
    for(let i = 0; i < tempStrings.length; i++){
        fieldString += tempStrings[i];
    }

    fieldString += divider;

    
    //Player 2's field
    //Add spaces to the end of each element to make the total length of the array equal to the length of the line
    tempStrings = [];
    for(let i = 0; i < player2.field.length; i++){
        let tempString = "";
        let isEmpty = false;
        if(player2.field[i] === null){
            isEmpty = true;
        }

        if(!isEmpty){
            tempString = "| " + (i + 1) + ". **" + player2.field[i].name + "**";
        } else {
            tempString = "| " + (i + 1) + ". ";
        }
        while(tempString.length < lineLength / player2.field.length){
            tempString += " ";
        }
        tempStrings.push(tempString);
    }

    //Add the field elements to the string
    for(let i = 0; i < player2.field.length; i++){
        fieldString += tempStrings[i];
    }
    
    fieldString += divider;

    //Add spaces to the end of each element to make the total length of the array equal to the length of the line
    tempStrings = [];
    for(let i = 0; i < player2.subField.length; i++){
        let tempString = "";
        let isEmpty = false;
        if(player2.subField[i] === null){
            isEmpty = true;
        }

        if(!isEmpty){
            tempString = "| " + (i + 1) + ". **" + player2.subField[i] + "**";
        } else {
            tempString = "| " + (i + 1) + ". ";
        }
        while(tempString.length < lineLength / player2.subField.length){
            tempString += " ";
        }
        tempStrings.push(tempString);
    }

    //Add the subfield elements to the string
    for(let i = 0; i < player2.subField.length; i++){
        fieldString += tempStrings[i];
    }
    fieldString += divider;

    //Show player 1's world hp and center it on the line
    fieldString += "| World HP: **" + player2.worldHP + "** |" + " Gold: **" + player2.gold + "** |" + " Hand Size: **" + player2.hand.length + "** |" + " Deck Size: **" + player2.deck.cards.length + "** |";;

    //Show player 2's name and center it on the line
    fieldString += "\n| **" + player2.name + "** |";

    fieldString += divider;

    //Check if the string has more than 1900 characters
    if(fieldString.length > 1900){
        const tempString2 = fieldString.split('\n');
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
        //Send the string
        message.channel.send(fieldString);
    }
};