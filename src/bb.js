require('dotenv').config();

const {Client} = require('discord.js');

const client = new Client();
const PREFIX = process.env.PREFIX;
const ACCUSATIONS = [" is sus", " is a Baka~!", " is cringe af "];

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New world joined it seems: ${guild.name} (id: ${guild.id}). This world has ${guild.memberCount} ***plebian*** members! ||Seems like it is up to me to start some fun||`);
  });

//message.reply: replies to user
//message.channel.send: sends message to channel
client.on('message', async (message) => {
    //If BB said the message
    if(message.author.bot){
        return;
    }

    //If message contains bb or BB in it
    if((message.content.includes('bb') || message.content.includes('BB')) && !message.content.includes('bb!')){
        message.react('🇧');
        message.react('🅱️');
    }
    
    //If it starts with prefix
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content.substring(PREFIX.length).trim().split(/\s+/);
        function checkPermission(){
            const permission = String.prototype.concat(String.prototype.toUpperCase(CMD_NAME), '_MEMBERS'); 
            if(!message.member.hasPermission(permission)){
                return message.reply('You do not have permissions to use that command loser!!! Become god or something... then we can talk.');
            }
            checkArgs();
        }
        function checkArgs(){
            if(args.length === 0){
                return message.reply('Please provide an ID lmao. :D');
            }
        }

        function getMember(){
            return message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        }

        if(CMD_NAME === 'kick' || CMD_NAME === 'uwukick'){
            checkPermission();
            const member = getMember();

            console.log(member);
            if(member){
                member.kick().then((member) => message.channel.send(`${member.user.tag} was sent to the gulag :skull: :skull: :skull:.`)).catch((err) => message.channel.send('I do not have permissions because I am not uwu enough yet :('));
            } else {
                message.channel.send('That member was not found. Are you right in the head?? :thinking:');
            }
        } else if(CMD_NAME === 'ban' || CMD_NAME === 'uwuban'){
            checkPermission();
            const member = getMember();

            console.log(member);
            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('User was banned successfully. That user was a Baka~ and was really easy to obliterate. They could not handle the power of infinity || or 8||');
            } catch(err){
                console.log(err);
                message.channel.send('An error occurred. Either I do no have permissions or the user was not found.');
            }
        } else if(CMD_NAME ==='accuse'){
            const member = getMember();
            message.channel.send(`${member}${ACCUSATIONS[Math.floor(Math.random() * ACCUSATIONS.length)]}`);
        } else if(CMD_NAME === 'uwu'){
            message.channel.send('uwu');
        } else if(CMD_NAME === 'uwuhelp'){
            message.channel.send('uwuhelp');
        } else if(CMD_NAME === 'Buddy'){
            message.channel.send('Buddy McLean is an interesting fellow to say the least. He has done a good job of taking character of Fast Loiter :D! I just hope he does a good job taking care of himself. Despite how he looks, he is quite the interesting character. He had me deceived at least! Who knew that there was more to him than what meets the eye? Certainly not I. Regardless, that little cowboy is going to need a lot more if he wants me on his saddle :wink: ||You know where to find me cutie||');
        } else if(CMD_NAME === 'Catastrophe'){
            message.channel.send('Catastrophe... Many have heard the tale but have the many who have heard it, seen it? Well... I have seen the potential of Catastrophe first hand and let me say... it is not something to joke about. Or is it? :joy: That cute cat knows how to butter me up! If he keeps this up, I will be sure to have him as my pet :3. ||:black_cat:||');
        } else if(CMD_NAME === 'help'){
            message.channel.send('Did you seriously think that you could use a manual to understand a being such as I? :thinking: How cute :BBShoot: Don\'t think I don\'t see what you are trying. There are other ways of getting with me you know!');
        } else if(CMD_NAME === 'beautiful'){
            message.channel.send('*Blushes* What is this? :blush: Do you really think so??? Why thank you ' + message.author.username + ' :wink:');
        } else if(CMD_NAME === 'Dionte'){
            message.channel.send('... Stop ... Brother... Sis-- ');
        } else if(CMD_NAME === 'baka'){
            message.channel.send('Baka! :angry: WHO DO YOU THINK YOU ARE CALLING A BAKA AHHHHHHH :triumph:');
        } else if(CMD_NAME === 'Tyler'){
            message.channel.send('That man who recently left the eye of the peacock? Well... I have only had limited interactions with him but it seems he loves his triceratops skulls. :skull:');
        } else if(CMD_NAME === 'Repugnans'){
            message.channel.send('Oh? That living contradiction? Despite his contradictory powers and features, I believe there is a simple person underneath that *facade* of his. :smirk: ||I am not sure if that guy knows what he is in for when he decided to get himself involved with the JoJos||');
        } else if(CMD_NAME === 'Sirgay'){
            message.channel.send('Sir Gay? Oh... that person... I am not a fan... I will say that much... ||little bitch||');
        } else if(CMD_NAME === "Grey"){
            message.channel.send("Grey... How about we switch the topic... That ***boy*** is none of my business... Talk to Bob about him or maybe even ||gac (whoever that is) :wink:||");
        } 
        else if(CMD_NAME === 'mute'){
            checkPermission();
            if(member){
                member.edit({mute: true});
            } else {
                message.channel.send('That member was not found. Maybe you should mute... yourself??');
            }
        } else if(CMD_NAME === 'deafen'){
            checkPermission();
            if(member){
                member.edit({deaf: true});
            } else {
                message.channel.send('That member was not found LMAO. Get some friends maybe?');
            }
        } else if(CMD_NAME === 'play'){
            checkArgs();
            if(!message.member.voice.channel){
                message.channel.send("You must be in a channel to play the bot silly :stuck_out_tongue_closed_eyes!: " + message.author.username);
            }
            message.member.voice.channel.join();
            // async function play(connection, url){
            //     connection.play(await ytdl(url), {type: 'opus'});
            // }
            play();
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);