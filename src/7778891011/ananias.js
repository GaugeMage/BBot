exports.run = async(message) => {
    const {ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
    message.channel.send('Correct. That is who I am. I am Brother Ananias. Rather I am the Seventh and Final Crystal Priest of the Messiah. The youngest of my brothers and therefore the most innocent and naive. That is probably why I am filled with such sin.');
    message.channel.send('However, I do know when to pay respects to my brothers.');
    message.channel.send('https://s3.amazonaws.com/files.d20.io/images/310763802/AQGYhXVcgMpbQle7tXvrvA/med.png?1666548828')
    message.channel.send('BBot bid me welcome into this place and I shall respect her wishes as well as the wishes of those who had the blessing of entering this place as well. I will help make this place finalized!');
    message.channel.send('For I am Ananias!');
    message.channel.send('```js\nPhase2: execute(7778891011);```');
    message.channel.send('Now Horsemen... Tell me... Are you willing to help me complete these archives?');
    
    const menu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions(
                {
                    label: 'Yes',
                    description: 'If you select this, you and I shall go on a journey.',
                    value: 'yesAnanias',
                },
                {
                    label: 'No',
                    description: 'If you select this, we shall end our brief introduction.',
                    value: 'noAnanias',
                },
            ),
        );

    message.channel.send({content: "Select Yes/No", components: [menu]});
}