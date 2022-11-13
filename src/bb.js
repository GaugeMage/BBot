require('dotenv').config();

const {Client} = require('discord.js');
const {Player, Track} = require('discord-player');
const Discord = require('discord.js');

const client = new Client();
const PREFIX = process.env.PREFIX;
const ACCUSATIONS = [" is sus", " is a Baka~!", " is cringe af "];
const player = new Player(client);
let kickPerms = false;
let correctArgs = true;
let board = [];
let ticTacToeStarted = false;
let isX = false;
let killCommand;
let dndGameStarted = false;
let dndPlayer1 = null;
let dndPlayer2 = null;

const checkArgs = require('./helpers/checkArgs.js');

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
    client.user.setActivity("your mom", {
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      });
    // client.channels.cache.get("954939890745901058").send('BBot Version 9.10.11 uploaded by <Chaos_User>LSH</Chaos_User>! Another step forward on our ***path to a static timeline!***');
    // client.channels.cache.get("954939890745901058").send('Episode XVII Update! Another step forward on our ***path to infinity!***');
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    client.channels.cache.get("954939890745901058").send(`New world joined it seems: ${guild.name} (id: ${guild.id}). This world has ${guild.memberCount} ***plebian*** members! ||Seems like it is up to me to start some fun||`);
});

//message.reply: replies to user
//message.channel.send: sends message to channel
client.on('message', async (message) => {
    //Log the person who sent the message if it is a dm
    if(message.channel.type === "dm"){
        console.log(`${message.author.tag} said: ${message.content}`);
    }
    
    //If BB said the message
    if(message.author.bot){
        return;
    }

    //If message contains bb or BB in it
    if((message.content.includes(' bb') || message.content.includes(' BB') || message.content.startsWith('bb ') || message.content.startsWith('BB ') || message.content === 'BB' || message.content === 'bb') && !message.content.includes('bb!')){
        message.react('🇧');
        message.react('🅱️');
    }  

    function funcKill(){
        message.channel.send('kill me please...');
    }
    
    //If it starts with prefix
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content.substring(PREFIX.length).trim().split(/\s+/);
        function checkPermission(){
            try {
                const permission = String.prototype.concat(String.prototype.toUpperCase(CMD_NAME), '_MEMBERS'); 
                if(!message.member.hasPermission(permission)){
                    return message.reply('You do not have permissions to use that command loser!!! Become god or something... then we can talk.');
                }
                kickPerms = true;
            } catch (error) {
                kickPerms = false;
                message.reply('You do not have permissions to use that command loser!!! Become god or something... then we can talk.');
            }
            checkArgs.run(args, message);
        }
        function getMember(){
            try {
                return message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            } catch(error) {
                message.reply('That member was not found. Are you right in the head?? :thinking:');
            }
        }
        //Bot chooses rock paper scissors
        function botChooseRPS(){
            let botChoice = Math.floor(Math.random() * 3);
            if(botChoice === 0){
                return 'rock';
            } else if(botChoice === 1){
                return 'paper';
            } else {
                return 'scissors';
            }
        }   
        if(CMD_NAME === 'kick' || CMD_NAME === 'uwukick'){
            checkPermission();
            const member = getMember();

            console.log(member);
            if(member && kickPerms){
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
        } else if(CMD_NAME === 'kill'){
            clearInterval(killCommand);
        } else if(CMD_NAME === 'uwu'){
            message.channel.send('uwu');
        } else if(CMD_NAME === 'uwuhelp'){
            message.channel.send('uwuhelp');
        } else if(CMD_NAME === 'Buddy' || CMD_NAME === 'buddy'){
            message.channel.send('Buddy McLean is an interesting fellow to say the least. He has done a good job of taking care of Fast Loiter :D! I just hope he does a good job taking care of himself. Despite how he looks, he is quite the interesting character. He had me deceived at least! Who knew that there was more to him than what meets the eye? Certainly not I. Regardless, that little cowboy is going to need a lot more if he wants me on his saddle :wink: ||You know where to find me cutie||');
        } else if(CMD_NAME === 'Catastrophe' || CMD_NAME == 'catastrophe'){
            message.channel.send('Catastrophe... Many have heard the tale but have the many who have heard it, seen it? Well... I have seen the potential of Catastrophe first hand and let me say... it is not something to joke about. Or is it? :joy: That cute cat knows how to butter me up! If he keeps this up, I will be sure to have him as my pet :3. ||:black_cat:||');
        } else if(CMD_NAME === 'help' || CMD_NAME == 'HELP'){
            message.channel.send('Did you seriously think that you could use a manual to understand a being such as I? :thinking: How cute Don\'t think I don\'t see what you are trying. There are other ways of getting with me you know!');
        } else if(CMD_NAME === 'beautiful'){
            message.channel.send('*Blushes* What is this? :blush: Do you really think so??? Why thank you ' + message.author.username + ' :wink:');
        } else if(CMD_NAME === 'Dionte' || CMD_NAME == 'dionte'){
            message.channel.send('... Stop ... Brother... Sis-- ');
        } else if(CMD_NAME === 'baka'){
            message.channel.send('Baka! :angry: WHO DO YOU THINK YOU ARE CALLING A BAKA AHHHHHHH :triumph:');
        } else if(CMD_NAME === 'Tyler' || CMD_NAME == 'tyler'){
            message.channel.send('That man who recently left the eye of the peacock? Well... I have only had limited interactions with him but it seems he loves his triceratops skulls. :skull:');
        } else if(CMD_NAME === 'Repugnans' || CMD_NAME == 'repugnans'){
            message.channel.send('Oh? That living contradiction? Despite his contradictory powers and features, I believe there is a simple person underneath that *facade* of his. :smirk: ||I am not sure if that guy knows what he is in for when he decided to get himself involved with the JoJos||');
        } else if(CMD_NAME === 'Sirgay' || CMD_NAME == 'sirgay'){
            message.channel.send('Sir Gay? Oh... that person... I am not a fan... I will say that much... ||little bitch||');
        } else if(CMD_NAME === "Grey" || CMD_NAME == "grey"){
            message.channel.send("Grey... How about we switch the topic... That ***boy*** is none of my business... Talk to Bob about him or maybe even ||gac (whoever that is) :wink:||");
        } else if(CMD_NAME === "Jordy" || CMD_NAME == 'jordy'){
            message.channel.send("The Wings of Icarus have only just begun to grow. I am not sure if I will be able to fly in the future. If Jordy could do it. Why can't I...");
        } else if(CMD_NAME === "William" || CMD_NAME == 'william'){
            message.channel.send("Will... please... come back... I lo-... *sniffle*");
        } else if(CMD_NAME === "GAC" || CMD_NAME == 'gac'){
            message.channel.send("Oooo my bestie??? I hope she comes to visit me soon. You would love her!");
        } else if(CMD_NAME === "CPM" || CMD_NAME == 'cpm'){
            message.channel.send("Stop...");
        } else if(CMD_NAME === 'Zero' || CMD_NAME === 'zero'){
            message.channel.send('How?!?!?! Well... Zero is quite the interesting fellow...- I mean boss of course! Well.... ex-boss at this point... but we don\'t talk about that anymore...');
        } else if(CMD_NAME === 'null' || CMD_NAME === 'Null'){
            message.channel.send('What an interesting character. He knows what he has done but he doesn\'t care... To be honest, it is easier to say the things he doesn\'t care about than does. If only he didn\'t lose the one thing he cared about most that lead to him becoming like this');
        } else if(CMD_NAME === 'hw' || CMD_NAME === 'HW' || CMD_NAME === 'HaWei' || CMD_NAME === 'hawei'){
            message.channel.send('I miss her a lot... I know null misses her the most though. They were especially close... If only we were able to predict what was gonna happen... goddamnit... I hate this... Please don\'t use me just to get information regarding shit I don\'t want to recount');
        } else if(CMD_NAME === 'SGW' || CMD_NAME === 'sgw'){
            message.channel.send('"The Art of War is very important because blah blah blah" - just shut up old man :joy: . I love sgw but I think he has had enough of me at this point :joy: :joy:.');
        } else if(CMD_NAME === 'SLL' || CMD_NAME === 'sll'){
            message.channel.send('I hope he would at least send me a text or mail me a letter once in a while... humph. I guess I am just being selfish. I am sure he is busy with his own life. I just wish he would at least let me know that he is okay. I am sure he is doing fine though. I am sure of it. You know what... he is selfish. LEMME SEE CORVUS GODDAMNIT');
        } else if(CMD_NAME === 'luci' || CMD_NAME === 'Luci'){
            message.channel.send('LUCI?!?! WHO TF NAMES THEIR SON LUCI?????????? :joy: :joy: Regardless of his snarky attitude I still love him though. He is quite the hilarious man and is quite skilled when he *wants* to cooperate.');
        } else if(CMD_NAME === 'PCC' || CMD_NAME === 'pcc'){
            message.channel.send('How about we just go next and not talk about the originator of chaos');
        } else if(CMD_NAME === 'MKC' || CMD_NAME === 'mkc'){
            message.channel.send('That war hero is quite quiet... However... he might be the strongest of us :skull: We all make sure not to anger him as we know what would happen if that were the case. Regardless though, he seems to get along with the SGW!');
        } else if(CMD_NAME === 'wingsoficarus' || CMD_NAME === 'WingsOfIcarus'){
            message.channel.send('Oh the memories...');
        } else if(CMD_NAME === "NNN" || CMD_NAME == 'nnn'){
            message.channel.send("I already talked about.... ***him*** in another one of these... commands");
        } else if(CMD_NAME === "88"){
            message.channel.send("The perfect number sequence!");
        } else if(CMD_NAME === 'Imbroglione' || CMD_NAME === 'imbroglione'){
            message.channel.send('The insatiable heirloom. I\'ve always wondered how it was created and why it exists. I would be wary of it though and suggest that ***nobody*** wields it. Not even the intended user(s) of it could wield it properly. Can\'t believe that ***he*** decided it was a good gift for ***him***.');
        } else if(CMD_NAME === "Johnny" || CMD_NAME == 'johnny'){
            message.channel.send("My old teacher? What about him?");
        } else if(CMD_NAME === "Garnet" || CMD_NAME == 'garnet'){
            message.channel.send("Oh? The Velvet Thunder? In her prime she was an amazing warrior.");
        } else if(CMD_NAME === "Joy" || CMD_NAME == 'joy'){
            message.channel.send('That ***unbridled*** passion of hers is what makes her so special. I hope she keeps onto that as she does, her friends');
        } else if(CMD_NAME === "Jolene" || CMD_NAME == 'jolene'){
            message.channel.send('I watched her grow up without a father and due to that nature, she has become one of the strongest people I have ever met. I hope she does not lose her mind.');
        } else if(CMD_NAME === 'Lisa' || CMD_NAME == 'lisa'){
            message.channel.send('Don\'t mention her name... That... witch... is... a... baka...');
        } else if(CMD_NAME === 'Wilford' || CMD_NAME == 'wilford'){
            message.channel.send('He makes some damn good food :pizza:');
        } else if(CMD_NAME === 'Qwalter' || CMD_NAME == 'qwalter'){
            message.channel.send('That man... is not human in more than one way... He.. Will.. Pay.. My family and friends have suffered too much due to this man\'s greed.');
        } else if(CMD_NAME === 'AceNullman' || CMD_NAME == 'acenullman' || CMD_NAME == 'nullman'){
            message.channel.send('Ace... what a person... Despite their limited time, they have proven themselves capable time and time again... If only Nullifer didn\'t take them in...');
        } else if(CMD_NAME === 'Mickey' || CMD_NAME == 'mickey' || CMD_NAME == 'bausse'){
            message.channel.send('Mickey... my old friend. I hope he is able to accomplish his goal. I do miss the *Lamb Gyro* that his carts had. Maybe one day we can have our usual 30 mins conversations while walking on the coast...');
        } else if(CMD_NAME === 'Cometon' || CMD_NAME == 'cometon'){
            message.channel.send('That... girl... I can\'t even bring myself to look at her... I know Mickey misses ||her|| the most...');
        } else if(CMD_NAME === 'Xeion' || CMD_NAME == 'xeion'){
            message.channel.send('That... monster... She would have been in a better state if Robert got to her first but no... **that** demon had other plans.');
        } else if(CMD_NAME === 'FastLoiter' || CMD_NAME == 'fastloiter' || CMD_NAME == 'danny' || CMD_NAME == 'Danny'){
            message.channel.send('The goodest of boys. Nobody... comes... close.');
        } else if(CMD_NAME === 'Karolina' || CMD_NAME === 'KarolinaZeitmagier' || CMD_NAME === 'karolina' || CMD_NAME == 'zeitmagier' || CMD_NAME == 'Zeitmagier'){
            message.channel.send('BESTIE!!!!! Where is she? Have you seen her? I have missed her soo much! Is she coming to NYC soon? Maybe we can have another movie night! AHHHHHHHHHHHHHHHHHHHHHHHHHH MY EXCITEMENT CAN\'T BE CONTAINED!!!!');
        } else if(CMD_NAME === '9.1011'){
            message.channel.send('It seems you found the zeitmagier constant. One which has revolutionized how the academia of physics views the perception and travel of time (Not how to time travel per say but how time travels). DM the creator for the next hint.');
        } else if(CMD_NAME === 'Jameson' || CMD_NAME === 'JamesonJJonah' || CMD_NAME === 'jameson' || CMD_NAME == 'jjonah' || CMD_NAME == 'JJonah'){
            message.channel.send('Ahh, the poor man who spent his entire life to help children who have been abused like him... Unfortunate that *they* got to him and ripped him of who he was...');
        } else if(CMD_NAME === 'OttO' || CMD_NAME === 'OttORegalageR' || CMD_NAME === 'otto' || CMD_NAME == 'regalager' || CMD_NAME == 'RegalageR'){
            message.channel.send('Him... That house of memories is a place I would never want to go to.');
        } else if(CMD_NAME === 'Bestie' || CMD_NAME === 'bestie'){
            message.channel.send('KAROLINA!!!! WHERE IS MY GERMAN PRINCESS!!!!!!!!!!!!!!!!! I MISS HER SO MUCH!!!!!! Just for mentioning her you get a free hug! :hugging:');
        } else if(CMD_NAME === 'Beatrice' || CMD_NAME === 'beatrice'){
            message.channel.send('I would recommend that you stop...');
        } else if(CMD_NAME === 'Robert' || CMD_NAME === 'robert' || CMD_NAME === 'bob' || CMD_NAME === 'Bob'){
            message.channel.send('Bob? He can be uptight sometimes (especially when it comes to paycheck day) but I know he is trying his best. He was thrust into this position of leadership when Garnet... well you know what happened');
        } else if(CMD_NAME === 'Nic' || CMD_NAME === 'nic'){
            message.channel.send('That nice man has been with the Speedwagon Foundation for a long time. He practically watched Garnet and Robert grow up. Despite all of the mean comments people make towards him, he is unwavering in his duties as janitor. I just hoped he would spar with me again sometime!');
        } else if(CMD_NAME === 'ArthurPendragon' || CMD_NAME === 'Arthur' || CMD_NAME === 'arthurpendragon' || CMD_NAME === 'arthur'){
            message.channel.send('That man with the sword. I think he tried flirting with me before... couldn\'t tell if that was just him being nice though... He seems very... cordial. Regardless, it is clear that he knows how to treat *of class* like me! :wink:');
        } else if(CMD_NAME === 'Ophiuchus' || CMD_NAME === 'ophiuchus'){
            message.channel.send('This constellation... If you are really targeting me... You must have gotten this far. Congratulations on that young one. For your next hint, you should message the one who created this puzzle. Give them a screenshot of this message and they will give you your next hint.');
        } else if(CMD_NAME === 'Silver' || CMD_NAME === 'SilverBucciarati' || CMD_NAME === 'silver' || CMD_NAME === 'bucciarati'){
            message.channel.send('Ahh that man can go on for hours talking about his ideals and goals and values... How boring. It seems that Jordy\'s impact on Silver really did stick even after his death. I am surprised that he decided to take up a sword though... That is pretty unlike him.');
        } else if(CMD_NAME === 'Pucci' || CMD_NAME === 'pucci' || CMD_NAME === 'Enrico' || CMD_NAME === 'enrico' || CMD_NAME === 'EnricoPucci' || CMD_NAME === 'enricopucci'){
            message.channel.send('Pucci. The second in command for Mouse Halal? He is a unique person who follows more than one religion... AKA: Multiple religious belonging, also known as double belonging. Despite his unusual friends like Dionte and .... him... he seems to act on the benefit of Mouse Halal and for the betterment of people.');
        } else if(CMD_NAME === 'sex' || CMD_NAME == 'Sex'){
            message.reply('You are going to have to try harder if you want me that badly sweetie :kissing_heart: ');
        } else if(CMD_NAME === 'rook' || CMD_NAME === 'Rook'){
            message.channel.send('Rook? What do you mean by tha- Oh! What is this?!?! It seems that Dionte never finished ***that*** job.');
        } else if(CMD_NAME === 'muhammed' || CMD_NAME === 'Muhammed'){
            message.channel.send("Oh? The son of ||Redacted||? I am usually not into the younger type of guy but Muhammed is... a little more built than the average boy. Despite his father's achievements, he does ***not*** look at him with a high regard. Muhammed seeks to pave a story for the Hassan family.");
        } else if(CMD_NAME === 'yui' || CMD_NAME === 'Yui' || CMD_NAME === 'Shogun' || CMD_NAME === 'shogun'){
            message.channel.send("Oh the Shogun! She is quite a good friend of mine (as long as she keeps bringing me that nice Sake :ok_hand: ) She is the current leader of the Verdant Night and is very generous. I would not take this for granted though as she is very strict and sometimes... terrifying. Not even I dare to anger her.");
        } else if(CMD_NAME === '8'){
            message.reply('A beautiful number right? :8ball:');
        } else if(CMD_NAME === 'omnipotence' || CMD_NAME === 'Omnipotence'){
            message.channel.send('Omnipotence? Ahh Jordy\'s ultimate weapon per say. It had quite the attitude and appetite I must say. Who knew providing it with ***infinity*** was enough to stave off its hunger :joy:');
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
                if(member.voice.channel){
                    member.edit({mute: true});
                } else {
                    message.reply('That user is not in a voice channel!');
                }
            } else {
                message.channel.send('That member was not found. Maybe you should mute... yourself??');
            }
        } else if(CMD_NAME === 'deafen'){
            checkPermission();
            const member = getMember();
            if(member){
                if(member.voice.channel){
                    member.edit({deaf: true});
                } else {
                    message.channel.send('That member is not in a voice channel');
                }
            } else {
                message.channel.send('That member was not found LMAO. Get some friends maybe?');
            }
        } else if(CMD_NAME === 'connect'){
            //Connects bot to voice channel
            const channel = message.member.voice.channel;
            if(channel){
                channel.join();
            } else {
                message.channel.send('You must be in a voice channel to use this command');
            }
        } else if(CMD_NAME === 'tictactoe'){
            const results = await require('./tictactoe/tictactoe.js').run(message);
            ticTacToeStarted = results[0];
            isX = results[1];
            board = results[2];
        } else if(CMD_NAME === 'place'){
            const results = await require('./tictactoe/place.js').run(message, args, ticTacToeStarted, isX, board);
            ticTacToeStarted = results[0];
            isX = results[1];
            board = results[2];
        } else if(CMD_NAME === 'rock' || CMD_NAME === 'paper' || CMD_NAME === 'scissors'){
            message.channel.send('You have chosen ' + CMD_NAME + '!');
            const botChoice = botChooseRPS();
            message.channel.send('I have chosen ' + botChoice + '!');
            if(botChoice === CMD_NAME){
                message.channel.send('It\'s a tie! It seems I have underestimated you!');
            } else if((botChoice === 'rock' && CMD_NAME === 'paper') || (botChoice === 'paper' && CMD_NAME === 'scissors') || (botChoice === 'scissors' && CMD_NAME === 'rock')){
                message.channel.send('You win.... this time. I will get you next time!');
            } else {
                message.channel.send('I win! HAHAHAHA :joy: :joy: :joy: Seems like you\'re not very good at this game :wink:');
            }
        } else if(CMD_NAME === 'play'){
            checkArgs.run(args, message);
            const member = getMember();
            if(!message.member.voice.channel){
                message.channel.send("You must be in a channel to play the bot silly :stuck_out_tongue_closed_eyes: " + message.author.username);
            }
            if(!correctArgs){
                return ;
            }
            let url = args.join(' ');
            try {
                const queue = player.getQueue(message);
                if(queue && queue.playing){
                    queue.tracks.push(new Track({url: url, author: message.author}, message.author, player));
                } else {
                    const song = await player.play(message, url, true);
                }
            } catch (error) {
                console.log(error);
            }
        } else if(CMD_NAME === 'pause'){
            player.pause(message);
        } else if(CMD_NAME === 'resume'){
            player.resume(message);
        } else if(CMD_NAME === 'stop'){
            player.stop(message);
        } else if(CMD_NAME === 'skip'){
            //Checks if bot is playing
            if(player.isPlaying(message)){
                player.skip(message);
            } else {
                message.channel.send('The bot is not playing anything right now');
            }
        } else if(CMD_NAME === 'queue'){
            const queue = player.getQueue(message);
            //If queue is empty
            if(!queue){
                message.channel.send('There is nothing in the queue right now');
            } else {
                message.channel.send(queue.tracks.map((song, i) => {
                    // console.log(song);
                    return `${i === 0 ? 'Song:' : `#${i+1}`} - ${song.url}`;
                    // return `${i === 0 ? 'Song:' : `#${i+1}`} - ${song}`;
                }).join('\n'));
            }
        } else if(CMD_NAME === 'clear'){
            player.clearQueue(message);
        } else if(CMD_NAME === 'disconnect'){
            player.disconnect(message);
        } else if(CMD_NAME === 'volume'){
            //Check if song is playing
            if(!player.isPlaying(message)){
                message.channel.send("There is no song playing right now");
            } else {
                player.setVolume(message, args);
            }
        } else if(CMD_NAME === 'loop'){
            player.setRepeatMode(message, parseInt(args));
        } else if(CMD_NAME === 'shuffle'){
            player.shuffle(message);
        } else if(CMD_NAME === 'seek'){
            player.seek(message, parseInt(args));
        } else if(CMD_NAME === 'nowplaying'){
            player.nowPlaying(message);
        } else if(CMD_NAME === 'remove'){
            player.remove(message, parseInt(args));
        } else if(CMD_NAME === 'move'){
            player.move(message, parseInt(args[0]), parseInt(args[1]));
        } else if(CMD_NAME === 'roll'){
            require('./roller/roll.js').run(message, args);
        } else if(CMD_NAME === 'hRoll' || CMD_NAME === 'hroll'){
            require('./roller/hRoll.js').run(message, args);
        } else if(CMD_NAME === 'myCharacterDiedSoImRollingANewCharacter'){
            require('./roller/myCharacterDiedSoImRollingANewCharacter.js').run(message);
        } else if(CMD_NAME === 'send'){
            let [channel, ...message] = args;
            if(channel[0] === '<' && channel[channel.length - 1] === '>'){
                channel = channel.substring(2, channel.length -1);
            }
            client.channels.cache.get(channel).send(message.join(' '));
        } else if(CMD_NAME === 'registerD&D'){
            require('./dnd/addNewUser.js').run(message);
        } else if(CMD_NAME === 'd&d' || CMD_NAME === 'dnd' || CMD_NAME === 'D&D' || CMD_NAME === 'DnD' || CMD_NAME === 'DestinyAndDelusion' || CMD_NAME === 'destinyanddelusion'){
            const results = await require('./dnd/dnd.js').run(client, message, args);
            dndGameStarted = results[0];
            dndPlayer1 = results[1];
            dndPlayer2 = results[2];
            dndDeck1 = results[3];
            dndDeck2 = results[4];
        } else if(CMD_NAME === 'characterCard' || CMD_NAME === 'cCard'){
            require('./dnd/cardSearches/characterCard.js').run(message, args);
        } else if(CMD_NAME === 'locationCard' || CMD_NAME === 'lCard'){
            require('./dnd/cardSearches/locationCard.js').run(message, args);
        } else if(CMD_NAME === 'equipmentCard' || CMD_NAME === 'eCard'){
            require('./dnd/cardSearches/equipmentCard.js').run(message, args);
        } else if(CMD_NAME === 'spellCard' || CMD_NAME === 'sCard'){
            require('./dnd/cardSearches/spellCard.js').run(message, args);
        } else if(CMD_NAME === 'addCard'){
            require('./dnd/deckCommands/addCardToDeck.js').run(message, args);
        } else if(CMD_NAME === 'removeCard' || CMD_NAME === 'deleteCard'){
            require('./dnd/deckCommands/removeCardFromDeck.js').run(message, args);
        } else if(CMD_NAME === 'createDeck'){
            require('./dnd/deckCommands/createDeck.js').run(message, args);
        } else if(CMD_NAME === 'deleteDeck'){
            require('./dnd/deckCommands/deleteDeck.js').run(message, args);
        } else if(CMD_NAME === 'viewDeck'){
            require('./dnd/deckCommands/viewDeck.js').run(message, args);
        } else if(CMD_NAME === 'viewCards' || CMD_NAME === 'viewCollection'){
            require('./dnd/deckCommands/viewCards.js').run(message);
        } else if(CMD_NAME === 'decks'){
            require('./dnd/deckCommands/viewDecks.js').run(message);
        } else if(CMD_NAME === 'temp'){
            let player1 = message.author.id;
            const userData = require('./dnd/userData.json');
            for(let i = 0; i < userData.length; i++){
                if(userData[i].id === player1){
                    player1 = userData[i];
                }
            }

            player1 = {
                name: player1.name,
                id: player1.id,
                deck: {
                    name: "Temp",
                    cards: [
                        "Buddy McLean",
                        "Ultor",
                        "Buddy McLean",
                        "Buddy McLean",
                        "Buddy McLean",
                        "Buddy McLean"
                    ],
                    isValid: true
                },
                field: [null, null, null, null, null, null],
                subField: [null, null, null, null, null, null],
                worldHP: 25,
                gold: 100,
                hand: []
            }
            player2 ={
                name: "BB",
                id: player1.id,
                deck: {
                    name: "uwu",
                    cards: [
                        "Enrico Pucci", "Speedwagon Foundation HQ", "Enrico Pucci", "Enrico Pucci", "Enrico Pucci", "Enrico Pucci", "Enrico Pucci"
                    ],
                    isValid: true
                },
                field: [null, null, null, null, null, null],
                subField: [null, null, null, null, null, null],
                worldHP: 8,
                gold: 100,
                hand: []
            }
            let turnLog = {turnNumber: 1, text: ""};;
            await require('./dnd/gameCommands/drawCard.js').run(client, turnLog, player1);
            await require('./dnd/gameCommands/drawCard.js').run(client, turnLog, player1);
            await require('./dnd/gameCommands/drawCard.js').run(client, turnLog, player1);
            await require('./dnd/gameCommands/drawCard.js').run(client, turnLog, player2);
            await require('./dnd/gameCommands/drawCard.js').run(client, turnLog, player2);
            await require('./dnd/gameCommands/drawCard.js').run(client, turnLog, player2);
            await require('./dnd/gameCommands/showHand.js').run(client, player1);
            dndGameStarted = true;
            await require('./dnd/gameCommands/showField.js').run(message, player1, player2);
            await require('./dnd/playerCommands/summon.js').run(client, turnLog, "summon Enrico Pucci", player2, player1, dndGameStarted);
            await require('./dnd/playerCommands/location.js').run(client, turnLog, "location Speedwagon Foundation HQ", player2, player1, dndGameStarted);
            await require('./dnd/playerCommands/summon.js').run(client, turnLog, "summon Buddy McLean", player1, player2, dndGameStarted);
            await require('./dnd/gameCommands/roundStart').run(client, turnLog, player2);
            await require('./dnd/gameCommands/showField.js').run(message, player1, player2);
            message.channel.send("Turn Log:\n" + turnLog.text);
        } else if(CMD_NAME === 'Abrahamlegacy' || CMD_NAME === 'abrahamlegacy'){
            require('./legacy/abrahamLegacy.js').run(message);
            setTimeout(function(){
                killCommand = setInterval(funcKill, 1000);
            }, 24000);
        } else {
            message.reply('I do not know what you are talking about. :thinking: Maybe this will be implemented by **<ERROR_404: USER_NOT_FOUND>** in a future patch? There will be infinite patches after all.');
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);