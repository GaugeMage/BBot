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
            tempString = "| " + (i + 1) + ". **" + player1.field[i] + "**";
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
        let isEmpty = false;
        let isLocation = false;
        //Check if the space is empty
        if(player1.field[i] === null){
            isEmpty = true;
            field1Attack.push(0);
            field1Health.push(0);
        }
        //Look for the card in the character cards
        let card = cCardData.find(card => card.name === player1.field[i]);
        if(card === undefined && !isEmpty){
            //Look for the card in the location cards
            card = lCardData.find(card => card.name === player1.field[i]);
            if(card === undefined){
                //Look for the card if it is a stand
                card = cCardData.find(card => card.stand?.name === player1.field[i]);
                //Look for the card if it is a generated character
                if(card === undefined){
                    card = cCardData.find(card => card.generatedCharacters?.find(card => card.name === player1.field[i]));
                    card = card.generatedCharacters.find(card => card.name === player1.field[i]);
                } else {
                    card = card.stand;
                }
            } else {
                field1Attack.push(0)
                field1Health.push(0);
                isLocation = true;
            }
        }
        if(!isEmpty && !isLocation){
            // console.log(card.name + " has " + card.attack + " attack");
            field1Attack.push(card.attack);
            field1Health.push(card.health);
        }
    }

    //Checks player 1 subfield
    for(let i = 0; i < player1.subField.length; i++){
        let isEmpty = false;
        //Check if it is empty
        if(player1.subField[i] === null){
            isEmpty = true;
        }
        //Look for the card in the equipment cards
        let card = eCardData.find(card => card.name === player1.subField[i]);
        if(card === undefined && !isEmpty){
            //Look for the card in the equipment of the character cards
            //First checks if it has equipment
            if(cCardData.find(card => card.equipment !== undefined)){
                //Then it iterates through the equipment
                for(let j = 0; j < cCardData.find(card => card.equipment !== undefined).equipment.length; j++){
                    //Checks if the equipment matches the card
                    if(cCardData.find(card => card.equipment !== undefined).equipment[j].name === player1.subField[i]){
                        card = cCardData.find(card => card.equipment !== undefined).equipment[j];
                    }
                }
            }
        }
        if(!isEmpty){
            field1Attack[i] += card.attack;
            field1Health[i] += card.health;
        }
    }

    //Checks player 2 field
    let field2Attack = [];
    let field2Health = [];
    for(let i = 0; i < player2.field.length; i++){
        let isEmpty = false;
        let isLocation = false;
        //Check if the space is empty
        if(player2.field[i] === null){
            isEmpty = true;
            field2Attack.push(0);
            field2Health.push(0);
        }
        //Look for the card in the character cards
        let card = cCardData.find(card => card.name === player2.field[i]);
        if(card === undefined && !isEmpty){
            //Look for the card in the location cards
            card = lCardData.find(card => card.name === player2.field[i]);
            if(card === undefined){
                //Look for the card if it is a stand
                card = cCardData.find(card => card.stand?.name === player2.field[i]);
                //Look for the card if it is a generated character
                if(card === undefined){
                    card = cCardData.find(card => card.generatedCharacters?.find(card => card.name === player2.field[i]));
                    card = card.generatedCharacters.find(card => card.name === player2.field[i]);
                } else {
                    card = card.stand;
                }
            } else {
                field2Attack.push(0)
                field2Health.push(0);
                isLocation = true;
            }
        }
        if(!isEmpty && !isLocation){
            field2Attack.push(card.attack);
            field2Health.push(card.health);
        }
    }

    //Checks player 2 subfield
    for(let i = 0; i < player2.subField.length; i++){
        let isEmpty = false;
        //Check if it is empty
        if(player2.subField[i] === null){
            isEmpty = true;
        }
        //Look for the card in the equipment cards
        let card = eCardData.find(card => card.name === player2.subField[i]);
        if(card === undefined && !isEmpty){
            //Look for the card in the equipment of the character cards
            //First checks if it has equipment
            if(cCardData.find(card => card.equipment !== undefined)){
                //Then it iterates through the equipment
                for(let j = 0; j < cCardData.find(card => card.equipment !== undefined).equipment.length; j++){
                    //Checks if the equipment matches the card
                    if(cCardData.find(card => card.equipment !== undefined).equipment[j].name === player2.subField[i]){
                        card = cCardData.find(card => card.equipment !== undefined).equipment[j];
                    }
                }
            }
        }
        if(!isEmpty){
            field2Attack[i] += card.attack;
            field2Health[i] += card.health;
        }
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
            tempString = "| " + (i + 1) + ". **" + player2.field[i] + "**";
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
    console.log(player1.hand);
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