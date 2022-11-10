exports.run = async(client, player) => {
    const Discord = require('discord.js');
    const hand = player.hand;
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${player.name}'s hand:`)
        .addFields(
            {name: 'Cards:', value: hand.map(card => card), inline: true}
        )
        .setTimestamp();
    await client.users.cache.get(player.id).send(embed);
}