exports.run = async(message) => {
    message.channel.send("Woah. This Monastery... I knew BB's title as an Archmage wasn't just for show but I did not know it ran this deep... I wondered what happened to this place and these people.");

    setTimeout(function(){
        message.channel.send('Now we can leave these archives and go back to safety to complete the 91011 data');
    }, 5000);

    setTimeout(function(){
        message.channel.send('```bash\ncd ./src/91011/```');
    }, 10000);

    setTimeout(function(){
        message.channel.send('```bash\nls```');
    }, 15000);

    setTimeout(function(){
        message.channel.send('```bash\n91011.js```');
    }, 20000);

    setTimeout(function(){
        message.channel.send('```bash\nnode 91011.js```');
    }, 25000);

    setTimeout(function(){
        message.channel.send('Woah.... this place is fascinating. There is so much on zeitmagien calculus, the Q-Walt, and zeitmagien theory. I wonder if BB has read any of this...');
    }, 30000);

    setTimeout(function(){
        message.channel.send("There is this unique file I found with a '.qwalt' extension... That is weird. When I try to open it, it says 'You do not have permission to open this file' and prompts me for a password. The full file name is 'accel.qwalt'.");
    }, 35000);

    setTimeout(function(){
        message.channel.send('Hmmm the only hint I have when scouring this folder for a password is this: \n```ts\n/*\nOne thing to remember BBot is that this uses the 24 hour clock which is why I put your favorite ternary operator in there!\n*/\nconst passwd = curTime.getHours() > 12 ? `${curTime.getHours() - 12}:${curTime.getMinutes()}` : `${curTime.getHours()}:${curTime.getMinutes()}`;```');
    }, 40000);

    setTimeout(function(){
        message.channel.send('When you figure out the password, use it as the next bbot command! (It seems like this password changes all the time)');
    }, 45000);
}