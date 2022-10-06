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
    // client.channels.cache.get("954939890745901058").send('Added some new work employees as well as a weird hungry being. It seems BB has patched me once more. Another step forward on our path of infinity!');
});

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

    //Log the person who sent the message if it is a dm
    if(message.channel.type === "dm"){
        console.log(`${message.author.tag} said: ${message.content}`);
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

        switch(CMD_NAME){
            case 'kick':
            case 'uwukick':
                checkPermission();
                const member = getMember();

                console.log(member);
                if(member){
                    member.kick().then((member) => message.channel.send(`${member.user.tag} was sent to the gulag :skull: :skull: :skull:.`)).catch((err) => message.channel.send('I do not have permissions because I am not uwu enough yet :('));
                } else {
                    message.channel.send('That member was not found. Are you right in the head?? :thinking:');
                }
                break;
            case 'ban':
            case 'uwuban':
                checkPermission();
                try {
                    const user = await message.guild.members.ban(args[0]);
                    message.channel.send('User was banned successfully. That user was a Baka~ and was really easy to obliterate. They could not handle the power of infinity || or 8||');
                } catch(err){
                    console.log(err);
                    message.channel.send('An error occurred. Either I do no have permissions or the user was not found.');
                }
                break;
            case 'accuse':
                const member2 = getMember();
                message.channel.send(`${member2}${ACCUSATIONS[Math.floor(Math.random() * ACCUSATIONS.length)]}`);
                break;
            case 'uwu':
                message.channel.send('uwu');
                break;
            case 'uwuhelp':
                message.channel.send('uwuhelp');
                break;
            case 'help':
                message.channel.send('Did you seriously think that you could use a manual to understand a being such as I? :thinking: How cute Don\'t think I don\'t see what you are trying. There are other ways of getting with me you know!');
                break;
            case 'Buddy':
            case 'buddy':
                message.channel.send('Buddy McLean is an interesting fellow to say the least. He has done a good job of taking care of Fast Loiter :D! I just hope he does a good job taking care of himself. Despite how he looks, he is quite the interesting character. He had me deceived at least! Who knew that there was more to him than what meets the eye? Certainly not I. Regardless, that little cowboy is going to need a lot more if he wants me on his saddle :wink: ||You know where to find me cutie||');
                break;
            case 'Catastrophe':
            case 'catastrophe':
                message.channel.send('Catastrophe... Many have heard the tale but have the many who have heard it, seen it? Well... I have seen the potential of Catastrophe first hand and let me say... it is not something to joke about. Or is it? :joy: That cute cat knows how to butter me up! If he keeps this up, I will be sure to have him as my pet :3. ||:black_cat:||');
                break;
            case 'Tyler':
            case 'tyler':
                message.channel.send('That man who recently left the eye of the peacock? Well... I have only had limited interactions with him but it seems he loves his triceratops skulls. :skull:');
                break;
            case 'Repugnans':
            case 'repugnans':
                message.channel.send('Oh? That living contradiction? Despite his contradictory powers and features, I believe there is a simple person underneath that *facade* of his. :smirk: ||I am not sure if that guy knows what he is in for when he decided to get himself involved with the JoJos||');
                break;
            case 'Sirgay':
            case 'sirgay':
                message.channel.send('Sir Gay? Oh... that person... I am not a fan... I will say that much... ||little bitch||');
                break;
            case 'beautiful':
            case 'Beautiful':
                message.channel.send('*Blushes* What is this? :blush: Do you really think so??? Why thank you ' + message.author.username + ' :wink:');
                break;
            case 'Dionte':
            case 'dionte':
                message.channel.send('... Stop ... Brother... Sis-- ');
                break;
            case 'baka':
            case 'Baka':
                message.channel.send('Baka! :angry: WHO DO YOU THINK YOU ARE CALLING A BAKA AHHHHHHH :triumph:');
                break;
            case 'Grey':
            case 'grey':
            case 'GreyNullifer':
            case 'greynullifer':
                message.channel.send('Grey... How about we switch the topic... That ***boy*** is none of my business... Talk to Bob about him or maybe even ||gac (whoever that is) :wink:||');
                break;
            case 'Jordy':
            case 'jordy':
                message.channel.send('The Wings of Icarus have only just begun to be developed. I am not sure if I will be able to fly in the future. ||I am not sure if I will be able to fly in the future or even to the moon.||');
                break;
            case 'William':
            case 'william':
                message.channel.send('Will... please... come back... I lo-... *sniffle*');
                break;
            case 'GAC':
            case 'gac':
                message.channel.send('Oooo my bestie??? I hope she comes to visit me soon. You would love her!');
                break;
            case 'CPC':
            case 'cpc':
                message.channel.send('Stop...');
                break;
            case 'NNN':
            case 'nnn':
                message.channel.send('I already talked about.... ***him*** in another one of these... commands');
                break;
            case '88':
                message.channel.send('The perfect number sequence!');
                break;
            case 'Johnny':
            case 'johnny':
                message.channel.send('My old teacher? What about him?');
                break;
            case 'Garnet':
            case 'garnet':
                message.channel.send('Oh? The Velvet Thunder? In her prime she was an amazing warrior.');
                break;
            case 'Joy':
            case 'joy':
                message.channel.send('That ***unbridled*** passion of hers is what makes her so special. I hope she keeps onto that as she does, her friends');
                break;
            case 'Jolene':
            case 'jolene':
                message.channel.send('I watched her grow up without a father and due to that nature, she has become one of the strongest people I have ever met. I hope she does not lose her mind.');
                break;
            case 'Lisa':
            case 'lisa':
            case 'lisalainenvet':
            case 'LisaLainenvet':
            case 'lainenvet':
            case 'Lainenvet':
                message.channel.send('Don\'t mention her name... That... witch... is... a......');
                break;
            case 'Wilford':
            case 'wilford':
                message.channel.send('He makes some damn good food :pizza:');
                break;
            case 'Qwalter':
            case 'qwalter':
                message.channel.send('That man... is not human in more than one way... He.. Will.. Pay.. My family and friends have suffered too much due to this man\'s greed.');
                break;
            case 'AceNullman':
            case 'acenullman':
            case 'nullman':
            case 'ace':
            case 'Ace':
                message.channel.send('Ace... what a person... Despite their limited time, they have proven themselves capable time and time again... If only Nullifer didn\'t take them in...');
                break;
            case 'Mickey':
            case 'mickey':
            case 'MickeyBausse':
            case 'mickeybausse':
            case 'bausse':
            case 'Bausse':
                message.channel.send('Mickey... my old friend. I hope he is able to accomplish his goal. I do miss the *Lamb Gyro* that his carts had. Maybe one day we can have our usual 30 mins conversations while walking on the coast...');
                break;
            case 'Cometon':
            case 'cometon':
                message.channel.send('That... girl... I can\'t even bring myself to look at her... I know Mickey misses ||her|| the most...');
                break;
            case 'Xeion':
            case 'xeion':
                message.channel.send('That... monster... She would have been in a better state if Robert got to her first but no... **that** demon had other plans.');
                break;
            case 'FastLoiter':
            case 'fastloiter':
            case 'danny':
            case 'Danny':
                message.channel.send('The goodest of boys. Nobody... comes... close.');
                break;
            case 'Karolina':
            case 'karolina':
            case 'KarolinaZeitmagier':
            case 'karolinazeitmagier':
                message.channel.send('BESTIE!!!!! Where is she? Have you seen her? I have missed her soo much! Is she coming to NYC soon? Maybe we can have another movie night! AHHHHHHHHHHHHHHHHHHHHHHHHHH MY EXCITEMENT CAN\'T BE CONTAINED!!!!');
                break;
            case 'Jameson':
            case 'jameson':
            case 'JamesonJJonah':
            case 'jamesonjjonah':
            case 'jjonah':
            case 'JJonah':
                message.channel.send('Ahh, the poor man who spent his entire life to help children who have been abused like him... Unfortunate that *they* got to him and ripped him of who he was... That monstrosity is irredeemable now');
                break;
            case 'Otto':
            case 'otto':
            case 'OttORegalageR':
            case 'ottoregalager':
            case 'regalager':
            case 'RegalageR':
                message.channel.send('Him... That house of memories is a place I would never want to go to.');
                break;
            case 'Bestie':
            case 'bestie':
                message.channel.send('KAROLINA!!!! WHERE IS MY GERMAN PRINCESS!!!!!!!!!!!!!!!!! I MISS HER SO MUCH!!!!!! Just for mentioning her you get a free hug! :hugging:');
                break;
            case 'Beatrice':
            case 'beatrice':
                message.channel.send('I would recommend that you stop...');
                break;
            case 'Robert':
            case 'robert':
            case 'Bob':
            case 'bob':
                message.channel.send('Bob? He can be uptight sometimes (especially when it comes to paycheck day) but I know he is trying his best. He was thrust into this position of leadership when Garnet... well you know what happened');
                break;
            case 'Nic':
            case 'nic':
                message.channel.send('That nice man has been with the Speedwagon Foundation for a long time. He practically watched Garnet and Robert grow up. Despite all of the mean comments people make towards him, he is unwavering in his duties as janitor. I just hoped he would spar with me again sometime!');
                break;
            case 'ArthurPendragon':
            case 'arthurpendragon':
            case 'arthur':
            case 'Arthur':
                message.channel.send('That man with the sword. I think he tried flirting with me before... couldn\'t tell if that was just him being nice though... He seems very... cordial. Regardless, it is clear that he knows how to treat *of class* like me! :wink:');
                break;
            case 'Silver':
            case 'silver':
            case 'SilverBucciarati':
            case 'silverbucciarati':
                message.channel.send('Ahh that man can go on for hours talking about his ideals and goals and values... How boring. It seems that Jordy\'s impact on Silver really did stick even after his death. I am surprised that he decided to take up a sword though... That is pretty unlike him.');
                break;
            case 'Sex':
            case 'sex':
                message.reply('You are going to have to try harder if you want me that badly sweetie :kissing_heart: ');
                break;
            case '8':
                message.reply('A beautiful number right? :8ball:');
            case 'omnipotence':
            case 'Omnipotence':
                message.channel.send('Omnipotence? Ahh Jordy\'s ultimate weapon per say. It had quite the attitude and appetite I must say. Who knew providing it with ***infinity*** was enough to stave off its hunger :joy:');
                break;
            case 'Secret':
                const member3 = getMember();
                //Turn the rest of the args into 1 string
                let temp3 = "";
                for(let i = 1; i < args.length; i++){
                    temp3 += args[i] + " ";
                }
                //Send the member a dm using the arg
                member3.send(temp3);
                console.log(`Sent ${member3.user.username} a DM with the message: ${temp3}`);
                break;
            case 'mute':
                checkPermission();
                const member4 = getMember();
                if(member){
                    member4.edit({mute: true});
                } else {
                    message.channel.send('That member was not found. Maybe you should mute... yourself??');
                }
                break;
            case 'deafen':
                checkPermission();
                const member5 = getMember();
                if(member5){
                    member5.edit({deaf: true});
                } else {
                    message.channel.send('That member was not found LMAO. Get some friends maybe?');
                }
                break;
            case 'play':
                checkArgs();
                const member6 = getMember();
                if(!message.member6.voice.channel){
                    message.channel.send("You must be in a channel to play the bot silly :stuck_out_tongue_closed_eyes!: " + message.author.username);
                }
                message.member6.voice.channel.join();
                // async function play(connection, url){
                //     connection.play(await ytdl(url), {type: 'opus'});
                // }
                play();
                break;
            case 'roll':
            case 'Roll':
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
                    let tempString = "";
                    for(let i = 0; i < rolls.length; i++){
                        tempString += "\n";
                        const currentRoll = rolls[i];
                        if(currentRoll === 1){
                            tempString += 'You rolled a 1 :sob: big oof';
                        } else if(currentRoll === diceType){
                            tempString += 'You rolled a ' + diceType + ' POG! YOUR UWU LEVELS ARE OVER 8000';
                        } else if(currentRoll === 8){
                            tempString += 'You rolled a 8. THAT IS A VERY SPECIAL NUMBER. THAT IS WAY BETTER THAN A NATURAL ' + diceType;
                        } else {
                            tempString += 'You rolled a ' + currentRoll + ' :game_die:';
                        }
                    }
                    //If it is longer than 2000 characters, split it
                    if(tempString.length > 1900){
                        const tempString2 = tempString.split('\n');
                        let tempString3 = "";
                        for(let i = 0; i < tempString2.length; i++){
                            tempString3 += tempString2[i] + '\n';
                            if(tempString3.length > 1900){
                                message.channel.send(tempString3);
                                tempString3 = "";
                            }
                        }
                        message.channel.send(tempString3);
                    } else {
                        message.channel.send(tempString);
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
                        if(modifier){
                            message.channel.send('You rolled a ' + rolls[0] + ' with your modifier of ' + modifier + ' :game_die:');
                        }
                        message.channel.send('You rolled a ' + rolls[0] + ' :game_die:');
                    }
                }
                if(modifier){
                    message.channel.send('Your modifier was ' + modifier);
                }
                break;
            case 'myCharacterDiedSoImRollingANewCharacter':
                //Rolls up a new character
                message.channel.send("Your new character's stats:");
                let tempString = "";
                for(let i = 0; i < 6; i++){
                    let rolls = [];
                    let total = 0;
                    for(let j = 0; j < 4; j++){
                        rolls.push(Math.floor(Math.random() * 6) + 1);
                        total += rolls[j];
                    }

                    tempString += "\n";
                    const min = Math.min(...rolls);
                    let minFound = false;
                    for(let j = 0; j < rolls.length; j++){
                        if(minFound == true || rolls[j] != min){
                            tempString += "(" + rolls[j] + ") ";
                        } else {
                            tempString += "~~(" + rolls[j] + ")~~ ";
                            minFound = true;
                        }
                    }
                    //Removes smallest value from array
                    rolls.splice(rolls.indexOf(Math.min(...rolls)), 1);
                    
                    total = 0;
                    for(let j = 0; j < rolls.length; j++){
                        total += rolls[j];
                    }

                    tempString += "= " + total;
                }
                message.channel.send(tempString);
                break;
            case 'send':
                let [channel, ...message] = args;
                if(channel[0] === '<' && channel[channel.length - 1] === '>'){
                    channel = channel.substring(2, channel.length -1);
                }
                client.channels.cache.get(channel).send(message.join(' '));
                break;
            default:
                message.reply('I do not know what you are talking about. :thinking: Maybe this will be implemented by BB in a future patch? There will be ***infinite*** patches after all.');
                break; 
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);