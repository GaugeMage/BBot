exports.run = async(message) => {
    const cCardData = require("../cards/characterCards.json");
    const lCardData = require("../cards/locationCards.json");
    const eCardData = require("../cards/equipmentCards.json");
    const sCardData = require("../cards/spellCards.json");
    message.channel.send("Total Character Cards: " + cCardData.length + "\nTotal Location Cards: " + lCardData.length + "\nTotal Equipment Cards: " + eCardData.length + "\nTotal Spell Cards: " + sCardData.length + "\nTotal Cards: " + (cCardData.length + lCardData.length + eCardData.length + sCardData.length));
}