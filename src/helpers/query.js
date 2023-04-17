exports.run = async(client, message, archive) => {
    if(message.channel.id !== '1086201436217548872' && message.channel.id !== '1086531645970075680'){
        message.channel.send("What is this command? Hmmm...");
        return
    }

    let channel = '';

    switch(archive){
        case '91011':
            channel = client.channels.cache.get("1086544838234734642");
            break;
        case '9101112':
            channel = client.channels.cache.get("1086548774584852590");
            break;
        case 'ERROR':
            channel = client.channels.cache.get("1086549362768887808");
            break;
        case '10':
            channel = client.channels.cache.get("1086693121473122344");
            break;
        case '78':
            channel = client.channels.cache.get("1086706646639722516");
            break;
        case '81':
            channel = client.channels.cache.get("1087466913745076234");
            break;
        default:
            message.channel.send("**ERROR 808: {ARCHIVE: " + archive + "}** ***NOT FOUND***");
            return 
    }

    message.channel.send("**{ARCHIVE: <#" + channel.id + ">}** ***UNLOCKED***");
    channel.permissionOverwrites.create(channel.guild.roles.everyone, {ViewChannel: true});
};