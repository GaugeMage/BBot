exports.run = async(player, message, args) => {
    if(!message.member.voice.channelId) return await message.reply("You are not in a voice channel");
    const queue = player.createQueue(message.guild, {
        ytdlOptions: {
            filter: "audioonly",
            highWaterMark: 1 << 30,
            dlChunkSize: 0,
        },
        metaData: {
            channel: message.channel,
        }
    });
    try {
        if(!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        queue.destroy();
        return await message.reply("Could not join your voice channel!");
    }
    const searchResult = await player.search(args.join(" "), {
        requestedBy: message.author,
    })
    if(!searchResult) return await message.reply("No results found");
    
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
    if (!queue.playing) await queue.play();
    
    return await message.reply({content: `🎶 | Added ${searchResult.playlist ? "playlist" : "track"} to the queue!`, ephemeral: true});
}