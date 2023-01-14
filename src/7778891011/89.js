exports.run = async(message) => {
    message.channel.send("Wow... your skills and reliability remind me of one of my brothers, Ezekiel. Granted, his skills lie in other departments. This isn't about him though.");

    setTimeout(function(){
        message.channel.send("***INTRUDER DETECTED: USER 4N4N145...***");
    }, 8000);

    setTimeout(function(){
        message.channel.send("Oh no. BBot is going to find me and boot me out of this system!!!");
    }, 12000)

    setTimeout(function(){
        message.channel.send("***EXTRAPOLATION SEQUENCE:***");
    }, 17000);

    let messageID; 
    let nameMessage;
    
    setTimeout(async function(){
        messageID = (await message.channel.send("**ENCODED NAME: 4N4N145 (0% Complete)**")).id;
        nameMessage  = message.channel.messages.cache.get(messageID);
    }, 18000)

    setTimeout(function(){
        nameMessage.edit('**ENCODED NAME: 4N4NI45 (25% Complete)**');
    }, 22000);

    setTimeout(function(){
        nameMessage.edit('**ENCODED NAME: 4N4NI4S (50% Complete)**');
    }, 26000);

    setTimeout(function(){
        nameMessage.edit('**ENCODED NAME: AN4NI4S (62.5% Complete)**');
    }, 30000);

    setTimeout(function(){
        nameMessage.edit('**ENCODED NAME: ANANI4S (77.5% Complete)**');
    }, 34000);

    setTimeout(function(){
        nameMessage.edit('**ENCODED NAME: ANANIAS (100% Complete)**');
    }, 38000);

    setTimeout(function(){
        nameMessage.reply("***USER DATA SUCCESSFULLY EXTRAPOLATED. INTRUDER ANANIAS HAS BEEN FOUND.***");
    }, 41000);

    setTimeout(function(){
        nameMessage.reply("***INITIATING STACKTRACERS...***");
    }, 45000);

    setTimeout(function(){
        nameMessage.reply("Uh oh.... what should I do??? I can't let BBot find me. I'm going to have to hide. I'll have to find a way to get out of this system. Wait! What if we tried to kill BBot temporarily and tried to reboot her?");
    }, 50000);

    const {ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');

    const menu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions(
                {
                    label: 'Reboot BBot',
                    description: 'If you select this, we will attempt to brute force reboot BBot.',
                    value: 'killBBot',
                },
                {
                    label: 'Go into hiding/Leave BBot',
                    description: 'If you select this, I shall temporarily leave this system.',
                    value: 'leaveBBot',
                },
            ),
        );
        
    setTimeout(function(){
        message.channel.send({content: "What should I do?", components: [menu]});
    }, 55000);
}