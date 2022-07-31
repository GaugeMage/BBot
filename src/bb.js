require('dotenv').config();

const {Client, TextChannel} = require('discord.js');

const client = new Client();
const PREFIX = process.env.PREFIX;
const ACCUSATIONS = [" is sus", " is a Baka~!", " is cringe af "];

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
    client.user.setActivity("your mom", {
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      });
    client.channels.cache.get("954939890745901058").send('THE BB STREAM IS NOW ONLINE 24/7! You can find the link to BB\'s stream if you click on my profile! As well as this, BB has added more character commands for people you guys have met last session! It seems BB has patched me once more. Another step forward on our path of infinity!');
});

client.on

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    client.channels.cache.get("954939890745901058").send(`New world joined it seems: ${guild.name} (id: ${guild.id}). This world has ${guild.memberCount} ***plebian*** members! ||Seems like it is up to me to start some fun||`);
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
                return message.reply('Please provide more args (arguments) lmao. :D');
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
            message.channel.send('Did you seriously think that you could use a manual to understand a being such as I? :thinking: How cute Don\'t think I don\'t see what you are trying. There are other ways of getting with me you know!');
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
        } else if(CMD_NAME === "Jordy"){
            message.channel.send("The Wings of Icarus have only just begun to be developed. I am not sure if I will be able to fly in the future. ||I am not sure if I will be able to fly in the future or even to the moon.||");
        } else if(CMD_NAME === "William"){
            message.channel.send("Will... please... come back... I lo-... *sniffle*");
        } else if(CMD_NAME === "GAC"){
            message.channel.send("Oooo my bestie??? I hope she comes to visit me soon. You would love her!");
        } else if(CMD_NAME === "CPC"){
            message.channel.send("Stop...");
        } else if(CMD_NAME === "NNN"){
            message.channel.send("I already talked about.... ***him*** in another one of these... commands");
        } else if(CMD_NAME === "88"){
            message.channel.send("The perfect number sequence!");
        } else if(CMD_NAME === "Johnny"){
            message.channel.send("My old teacher? What about him?");
        } else if(CMD_NAME === "Garnet"){
            message.channel.send("Oh? The Velvet Thunder? In her prime she was an amazing warrior.");
        } else if(CMD_NAME === "Joy"){
            message.channel.send('That ***unbridled*** passion of hers is what makes her so special. I hope she keeps onto that as she does, her friends');
        } else if(CMD_NAME === "Jolene"){
            message.channel.send('I watched her grow up without a father and due to that nature, she has become one of the strongest people I have ever met. I hope she does not lose her mind.');
        } else if(CMD_NAME === 'Lisa'){
            message.channel.send('Don\'t mention her name... That... witch... is... a... baka...');
        } else if(CMD_NAME === 'Wilford'){
            message.channel.send('He makes some damn good food :pizza:');
        } else if(CMD_NAME === 'Qwalter'){
            message.channel.send('That man... is not human in more than one way... He.. Will.. Pay.. My family and friends have suffered too much due to this man\'s greed.');
        } else if(CMD_NAME === 'AceNullman'){
            message.channel.send('Ace... what a person... Despite their limited time, they have proven themselves capable time and time again... If only Nullifer didn\'t take them in...');
        } else if(CMD_NAME === 'Mickey'){
            message.channel.send('Mickey... my old friend. I hope he is able to accomplish his goal. I do miss the *Lamb Gyro* especially that his carts had. Maybe one day we can have our usual 30 mins conversations while walking on the coast...');
        } else if(CMD_NAME === 'Cometon'){
            message.channel.send('That... girl... I can\'t even bring myself to look at her... I know Mickey misses ||her|| the most...');
        } else if(CMD_NAME === 'Xeion'){
            message.channel.send('That... monster... She would have been in a better state if Robert got to her first but no... **that** demon had other plans.');
        } else if(CMD_NAME === 'FastLoiter'){
            message.channel.send('The goodest of boys. Nobody... comes... close.');
        } else if(CMD_NAME === 'sex'){
            message.reply('You are going to have to try harder if you want me that badly sweetie :kissing_heart: ');
        } else if(CMD_NAME === '8'){
            message.reply('A beautiful number right? :8ball:');
        } else if(CMD_NAME === 'Secret'){
            const member = getMember();
            //Turn the rest of the args into 1 string
            let temp = "";
            for(let i = 1; i < args.length; i++){
                temp += args[i] + " ";
            }
            //Send the member a dm using the arg
            member.send(temp);
            console.log(`Sent ${member.user.username} a DM with the message: ${temp}`);c
        } else if(CMD_NAME === 'mute'){
            checkPermission();
            const member = getMember();
            if(member){
                member.edit({mute: true});
            } else {
                message.channel.send('That member was not found. Maybe you should mute... yourself??');
            }
        } else if(CMD_NAME === 'deafen'){
            checkPermission();
            const member = getMember();
            if(member){
                member.edit({deaf: true});
            } else {
                message.channel.send('That member was not found LMAO. Get some friends maybe?');
            }
        } else if(CMD_NAME === 'play'){
            checkArgs();
            const member = getMember();
            if(!message.member.voice.channel){
                message.channel.send("You must be in a channel to play the bot silly :stuck_out_tongue_closed_eyes!: " + message.author.username);
            }
            message.member.voice.channel.join();
            // async function play(connection, url){
            //     connection.play(await ytdl(url), {type: 'opus'});
            // }
            play();
        } else if(CMD_NAME === 'roll'){
            checkArgs();
            //Split the string after d
            const temp = args[0].split('d');
            const temp2 = temp[1].split('+');
            //Get the number of dice
            const diceAmount = Number(temp[0]);
            //Get the dice type
            const diceType = Number(temp2[0]);
            //Get the modifier
            const modifier = Number(temp2[1]);

            let rolls = [];
            let total = 0;
            for(let i = 0; i < diceAmount; i++){
                rolls.push(Math.floor(Math.random() * diceType) + 1);
                total += rolls[i];
            }
            //If modifier exists, add it to the total
            if(modifier){
                total += Number(modifier);
            }
            if(rolls.length > 1){
                message.channel.send('You rolled a total of: ' + total + ' :game_die:');
                for(let i = 0; i < rolls.length; i++){
                    const currentRoll = rolls[i];
                    if(currentRoll === 1){
                        message.channel.send('You rolled a 1 :sob: big oof');
                    } else if(currentRoll === diceType){
                        message.channel.send('You rolled a ' + diceType + ' POG! YOUR UWU LEVELS ARE OVER 8000');
                    } else if(currentRoll === 8){
                        message.channel.send('You rolled a 8. THAT IS A VERY SPECIAL NUMBER. THAT IS WAY BETTER THAN 20');
                    } else {
                        message.channel.send('You rolled a ' + currentRoll + ' :game_die:');
                    }
                }
            } else {
                if(modifier){
                    message.channel.send('You rolled a ' + total + ' :game_die:');
                }
                if(rolls[0] === 1){
                    message.channel.send('You rolled a 1 :sob: big oof');
                } else if(rolls[0] === diceType){
                    message.channel.send('You rolled a ' + diceType + ' POG! YOUR UWU LEVELS ARE OVER 8000');
                } else if(rolls[0] === 8){
                    message.channel.send('You rolled a 8. THAT IS A VERY SPECIAL NUMBER. THAT IS WAY BETTER THAN 20');
                } else {
                    message.channel.send('You rolled a ' + rolls[0] + ' with your modifier of ' + modifier + ' :game_die:');
                }
            }
            if(modifier){
                message.channel.send('Your modifier is ' + modifier);
            }
        } else {
            message.reply('I do not know what you are talking about. :thinking: Maybe this will be implemented by BB in a future patch? There will be ***infinite*** patches after all.');
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);