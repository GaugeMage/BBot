exports.run = async(message) => {
    const {ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
    message.channel.send("Wait there was a secret message in that? Your cleverness always amazes me Horseman.");

    setTimeout(function(){
        message.channel.send("If I can be honest... I... don't have many friends so talking to you and going on this adventure with you has been a lot of fun. If we were to ever meet in the real world, I would love to become your real friend and hang out. I know a great pizza place in brooklyn that we could go to.");
    }, 5000);

    setTimeout(function(){
        message.channel.send("I am just being presumptuous though. Do you see me as a friend and someone you would want to hang out with?");
    }, 15000);

    setTimeout(function(){
        message.channel.send("You don't have to feel pressured to say that you see me as a friend. I was just curious...");
    }, 25000);

    const menu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions(
                {
                    label: 'I do view you as a friend!',
                    value: 'friendYes',
                },
                {
                    label: 'We are only partners for this mission.',
                    value: 'businessOnly',
                },
                {
                    label: 'No.. You are frankly just annoying',
                    value: 'annoying',
                }
            ),
        );

    setTimeout(function(){
        message.channel.send({content: "Select one of the options below:", components: [menu]});
    }, 35000);
}