exports.run = async(client, player) => {
    const Discord = require('discord.js');
    const hand = player.hand;
    
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${player.name}'s hand:`)
        .addFields(
            {name: 'Cards:', value: hand.map(card => card.name), inline: true},
            {name: 'Cost:', value: hand.map(card => card.cost), inline: true},
            {name: 'Stats:', value: hand.map(card => (card.attack !== undefined ? card.attack : 0)  + '/' + (card.health !== undefined ? card.health : 0)), inline: true}
        )
        .setTimestamp();
    await client.users.cache.get(player.id).send(embed);
}