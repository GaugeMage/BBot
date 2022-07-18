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
                return message.reply('You do not have permissions to use that command');
            }
            checkArgs();
        }
        function checkArgs(){
            if(args.length === 0){
                return message.reply('Please provide an ID lmao. :D');
            }
        }

        if(CMD_NAME === 'kick' || CMD_NAME === 'uwukick'){
            checkPermission();
            const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            console.log(member);
            if(member){
                member.kick().then((member) => message.channel.send(`${member.user.tag} was sent to the gulag :skull: :skull: :skull:.`)).catch((err) => message.channel.send('I do not have permissions because I am not uwu enough yet :('));
            } else {
                message.channel.send('That member was not found. Are you right in the head?? :thinking:');
            }
        } else if(CMD_NAME === 'ban' || CMD_NAME === 'uwuban'){
            checkPermission();
            const member = message.guild.members.cache.get(args[0]);

            console.log(member);
            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('User was banned successfully');
            } catch(err){
                console.log(err);
                message.channel.send('An error occurred. Either I do no have permissions or the user was not found.');
            }
        } else if(CMD_NAME ==='accuse'){
            const member = message.guild.members.cache.get(args[0]);
            message.channel.send(`${member}${ACCUSATIONS[Math.floor(Math.random() * ACCUSATIONS.length)]}`);
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);