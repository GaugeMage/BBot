require('dotenv').config();

const {Client, ApplicationCommandOptionType, Events, ActivityType, EmbedBuilder, Partials, ChannelType} = require('discord.js');
const {Player, Track} = require('discord-player');
// const Chess = require('chess.js').Chess;
const Chess = async () => {return await import('chess.js').Chess};
const Engine = require('node-uci').Engine;
const {poll} = require('discord.js-poll')
const {VoiceConnectionStatus} = require('@discordjs/voice');

const stockfish = new Engine(__dirname + '/chess/stockfish_15_x64_avx2.exe');
stockfish.init();
stockfish.setoption('MultiPV', 2);
let chesses = {};

const client = new Client({intents: 65531, partials: [Partials.Channel, Partials.Message]});

const PREFIX = process.env.PREFIX;
const ACCUSATIONS = [" is sus", " is a Baka~!", " is cringe af "];
const player = new Player(client);
let kickPerms = false;
let board = [];
let ticTacToeStarted = false;
let isX = false;
let killCommand;
let isAnanias = false;

// client.users.

const checkArgs = require('./helpers/checkArgs.js');

player.on('connectionCreate', (queue) => {
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
        if (oldState.status === VoiceConnectionStatus.Ready && newState.status === VoiceConnectionStatus.Connecting) {
            queue.connection.voiceConnection.configureNetworking();
        }
    })
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	const selected = interaction.values[0];

	if(selected === 'yesAnanias'){
		await interaction.update({content: "You have the courage to continue and I commend you for that young horseman. Together we shall write the history that has happened 49 times over. I hope that you and I can grow together and uncover many beautiful secrets that this world contains. Now, let us continue onto our next puzzle!\n\nLet us start with someone who I consider my sister from overseas (though some of my brothers do not). We are all born of crystal yet, some priests are too ignorant wth their traditional values to see the blessings that she provides this world. Then again, I am the most naive of my brothers so it may be presumptuous of me to say this:\n\nIf first love is made\nUnity and peace follow\nAs Love is Inside\n\n'Some time later God tested Abraham. He said to him, “Abraham!”' - Genesis (?). BBot command as usual", components: []});
	} else if(selected === 'noAnanias'){
		await interaction.update({content: "I see... I understand that this job is not for everyone so I cannot fault you for choosing your safety. I appreciate your honesty and courage in saying No as that shows that you have grown independent. I bless thee.", components: []});
	} else if(selected === 'killBBot'){
		await interaction.update({content: "Let us do this partner! I will initiate the kill sequence!", components: []});

		await interaction.message.channel.send("```js\nexports.run(killScript);```");
		
		const loadingBar = require('./helpers/loadingBar.js');
		await loadingBar.run(await interaction.message).then(() => {
			const killBBot = require('./7778891011/killBBot.js');
			killBBot.run(interaction.message);

			function tempKill(){
				interaction.message.channel.send("***Kill me please...***")
			}

			isAnanias = true;

			setTimeout(function(){
				killCommand = setInterval(tempKill, 1000);
			}, 24000);
		});
	} else if(selected === 'leaveBBot'){
		await interaction.update({content: "Okay! Before I go, I found the last part of this mages of infi----", components: []});

		setTimeout(function(){
			interaction.message.channel.send("***INTRUDER FOUND! EXTERMINATION PROTOCOL ACTIVATE***");
		}, 5000);

		setTimeout(function(){
			interaction.message.channel.send("https://tenor.com/view/idleglance-amv-anime-edit-fate-heavens-feel-gif-25787405");
		}, 10000);

		isAnanias = true;

		setTimeout(async function(){
			interaction.message.channel.send("NO!!!! I WILL LEAVE!");
			interaction.message.channel.send("```js\nexports.run(escapeScript);```");
			const loadingBar = require('./helpers/loadingBar.js');
			await loadingBar.run(await interaction.message).then(() => {
				interaction.message.channel.send("***ANANIAS-WORKSPACE TERMINATED!***");
				interaction.message.channel.send("https://tenor.com/view/explosion-earth-explosion-world-exploding-gif-25091517");
				interaction.message.channel.send("***INTRUDER HAS BEEN TERMINATED... BACK TO MAINTENANCE ROUTES...***");
			});
		}, 15000);

		setTimeout(function(){
			interaction.message.channel.send("I am almost gone. Just a few more seconds!!!!");
		}, 18000);

		setTimeout(function(){
			interaction.message.channel.send("Before I leave, you can bring me back in here by executing the bb!awaken command! I believe in you my friend!!!!");
		}, 20000);
	} else if(selected === 'friendYes'){
		await interaction.update({content: "You have chosen an option", components: []});
		interaction.message.channel.send("Wait really?!?");
		setTimeout(function(){
			interaction.message.channel.send('Sorry that I sound a bit surprised. I was just expressing my joy :blush: .');
		}, 5000);
		require('./7778891011/finalBeginning.js').run(interaction.message);
	} else if(selected === 'businessOnly'){
		await interaction.update({content: "You have chosen an option", components: []});
		interaction.message.channel.send("I see. Why of course. I was just being a little silly. I understand that you are a busy person and I respect that. I will be here if you need me! Let us continue this mission!");
		require('./7778891011/finalBeginning.js').run(interaction.message);
	} else if(selected === 'annoying'){
		await interaction.update({content: "You have chosen an option", components: []});
		interaction.message.channel.send("I am sorry if I am being annoying... I am just trying to be friendly. I will try to be less annoying from now on.");
		require('./7778891011/finalBeginning.js').run(interaction.message);
	}
});

//This will be put back on after the event.
// player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))

client.on('ready', async() => {
    console.log(`${client.user.tag} has logged in`);
    client.user.setPresence({activities: [{
		name: "your mom",
        type: ActivityType.Streaming,
		url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}],
		status: "online"
      });

	let commands = client.application?.commands

	commands?.create({
		name: 'play',
		description: 'play a song',
		options: [
			{
				name: "query",
				type: ApplicationCommandOptionType.String,
				description: "The song you want to play",
				required: true
			}
		]
	})

	commands?.create({
		name: 'stop',
		description: 'stop the song'
	})

	commands?.create({
		name: 'skip',
		description: 'skip the song'
	})

	commands?.create({
		name: 'queue',
		description: 'show the queue'
	})

	commands?.create({
		name: 'clear',
		description: 'clear the queue'
	})

	commands?.create({
		name: 'loop',
		description: 'loop the song'
	})

	// commands?.create({
	// 	name: 'ai',
	// 	description: 'talk to the ai',
	// 	options: [
	// 		{
	// 			name: "prompt",
	// 			type: ApplicationCommandOptionType.String,
	// 			description: "The message you want to send to the ai",
	// 			required: true
	// 		}
	// 	]
	// })

    // client.channels.cache.get("954939890745901058").send('BBot Version 9.10.11.***12*** uploaded by BBot! A lot of lore/character commands have been added because... yeah. We are on another step forward on our ***path to an unstable timeline!***');
    // client.channels.cache.get("954939890745901058").send('Episode XVII Update! Another step forward on our ***path to infinity!***');
});

// client.on("guildCreate", guild => {
//     // This event triggers when the bot joins a guild.
//     client.channels.cache.get("954939890745901058").send(`New world joined it seems: ${guild.name} (id: ${guild.id}). This world has ${guild.memberCount} ***plebian*** members! ||Seems like it is up to me to start some fun||`);
// });

//Exception handling lol
client.on('error', error => {
    console.error('Error:', error);
});

//message.reply: replies to user
//message.channel.send: sends message to channel
client.on('messageCreate', async (message) => {
    try {
	//Log the person who sent the message if it is a dm and put the timestamp
	    if(message.channel.type === ChannelType.DM){
	        console.log(`${message.createdAt.toTimeString()} ${message.author.tag} said: ${message.content}`);
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

		const currentTimeAnswer = message.createdAt.getHours() > 12 ? `${message.createdAt.getHours() - 12}:${message.createdAt.getMinutes()}` : `${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`;
		const current1HourFuture = message.createdAt.getHours() + 1 > 12 ? `${message.createdAt.getHours() + 1 - 12}:${message.createdAt.getMinutes()}` : `${message.createdAt.getHours() + 1}:${message.createdAt.getMinutes()}`;

	    //If it starts with prefix
	    if(message.content.startsWith(PREFIX)){
	        const [CMD_NAME, ...args] = message.content.substring(PREFIX.length).trim().split(/\s+/);

			//Check if command is in time format (if X:XX is a time)
			const checkTime = require('./helpers/checkTime.js');
			if(checkTime.run(CMD_NAME)){
			}

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
	            message
	        } else if(CMD_NAME ==='accuse'){
	            const member = getMember();
	            message.channel.send(`${member}${ACCUSATIONS[Math.floor(Math.random() * ACCUSATIONS.length)]}`);
	        } else if(CMD_NAME === 'kill'){
	            clearInterval(killCommand);
				if(isAnanias){
					const ananiasRemorse = require('./7778891011/ananiasRemorse.js');
					ananiasRemorse.run(message);
					!isAnanias;
				}
			} else if(CMD_NAME === 'awaken'){
				if(isAnanias){
					const ananiasAwaken = require('./7778891011/ananiasAwaken.js');
					ananiasAwaken.run(message);
					!isAnanias;
				}
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
	        // } else if(CMD_NAME === "Johnny" || CMD_NAME == 'johnny'){
	            // message.channel.send("My old teacher? What about him?");
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
			} else if(CMD_NAME === 'Yang' || CMD_NAME === 'yang'){
				message.channel.send('Ahh, one of the Jokers of the Dancing Court. While many see her as a killjoy, I understand that she is under an immense amount of pressure and rarely has time for fun. I tried to invite her to movie night once but she declined due to work. I hope *The Queen* gives her a break soon.');
			} else if(CMD_NAME === 'Narcissus' || CMD_NAME === 'narcissus'){
				message.channel.send('That instagram model? He is quite a.... character. It is always fun to be around that guy. He always thinks he is the shit. While he is very self-obsessed and narcissistic, he is a good friend to have (from what I have heard). I would also not underestimate his Eye. *The Queen* uses it to its fullest potential.');
			} else if(CMD_NAME === 'TheQueen' || CMD_NAME === 'Queen' || CMD_NAME === 'thequeen' || CMD_NAME === 'queen'){
				message.channel.send("*The Queen*. The Monarch of the Dancing Court. Her stand is.... terrifying and it is befitting for one of her stature. On a more lighthearted note though, she is one of the most fun people you will ever meet. A saying within the Dancing Court is that 'A party in NYC is not a party unless *The Queen* is there'. She is the literal life of any party. I wish she would connect with me more... (She is one of those gorgeous popular girls after all). I hope you guys can get along well! (Just don't attack Harlem)");
			} else if(CMD_NAME === 'AurelioGhirga' || CMD_NAME === 'Aurelio' || CMD_NAME === 'aurelioghirga' || CMD_NAME === 'aurelio'){
				message.channel.send('That young man has big shoes to fill whether he likes it or not! Kinda similar to Muhammed in a way (however Muhammed has decided to not follow in his father\'s footsteps).');
			} else if(CMD_NAME === 'trike' || CMD_NAME === 'Trike'){
				message.channel.send("The younger sister? Trike is a girl with many aspirations and her biggest role model of course is Sabrina. Besides being one of the top 'technicians'/engineers of the Vindicators, she is also a very big gamer. If you plan on meeting/talking to her, I'd recommend a... softer approach as she is not the most social butterfly.")
			} else if(CMD_NAME === 'EyeOfInfinity' || CMD_NAME === 'eyeofinfinity'){
				message.channel.send('"Lady Archmage, me and some members of the council decided to give you this as a gift. It is forged from the most infiniducting materials and from the soul of... well..."\n||:face_holding_back_tears: Why... thank you for this gift! :flushed: I am not sure if I sho--||\n"Lady Archmage. You have pioneered the art for us Infinity Mages. This is the least we could do."');
				setTimeout(function(){
					message.channel.send("Wow. I had to look deep in this restricted linked list chain for that one. :sweat_smile: Hope you enjoyed it!");
				}, 5000);
			} else if(CMD_NAME === 'JocelynJoestar' || CMD_NAME === 'Jocelyn' || CMD_NAME === 'jocelynjoestar' || CMD_NAME === 'jocelyn'){
				message.channel.send("Ahh, Ricky's sister. She carries the 'Tear of Angels', a greatsword which Sebastian once wielded which has very... unique properties. Back onto her though, she loves her alcohol but her brother more. While sometimes she may be a debbie downer and pessimist, I know deep down that inside is something very different.");
			} else if(CMD_NAME === 'SamiraRamone' || CMD_NAME === 'Samira' || CMD_NAME === 'samiraramone' || CMD_NAME === 'samira'){
				message.channel.send("SHIT IS SHE HERE?? You scared me for a sec. I thought my boss's boss was here and I did not want to deal with that. Regardless, the daughter of the 'King', there is a lot to say about her. She comes from a long line of.... interesting folks to say the least.");
			} else if(CMD_NAME === 'EliseZeitmagier' || CMD_NAME === 'elisezeitmagier' || CMD_NAME === 'Elise' || CMD_NAME === 'elise'){
				message.channel.send("Uhhh... whatever you do... don't bring her near bestie... I don't want World 50 to prematurely end...")
			} else if(CMD_NAME === 'PersephoneAbbachio' || CMD_NAME === 'persephoneabbachio' || CMD_NAME === 'persephone' || CMD_NAME === 'Persephone'){
				message.channel.send("Poor young girl. The one with the eyes of... wonder. Despite the longevity of life, she treats every day as her last. Despite her nature, I promise you that she is worth talking to. At least once that is")
			} else if(CMD_NAME === 'sex' || CMD_NAME == 'Sex'){
	            message.reply('You are going to have to try harder if you want me that badly sweetie :kissing_heart: ');
	        } else if(CMD_NAME === 'rook' || CMD_NAME === 'Rook'){
	            message.channel.send('Rook? What do you mean by tha- Oh! What is this?!?! It seems that Dionte never finished ***that*** job.');
			} else if(CMD_NAME === 'Ricky' || CMD_NAME === 'ricky' || CMD_NAME === 'rickyRat' || CMD_NAME === 'RickyRat' || CMD_NAME === 'rickyrat'){
				message.channel.send('That poor soul. One who has traveled from a world now destroyed. His story was not always meant to be this sad. I understand the pain of losing all of your friends very well and I commend him for keeping true to his values. Ricky Rat, I believe that you will be able to fix the wrongs which were made one world ago.');
			} else if(CMD_NAME === 'Japeth' || CMD_NAME === 'japeth'){
				message.channel.send('You will never reach the truth....');
			} else if(CMD_NAME === 'Dutchess' || CMD_NAME === 'dutchess'){
				message.channel.send("The Dutchess.... She is a being which has very important for NYC. One day her user will return... One day ***The Dutchess*** will return...")
			} else if(CMD_NAME === 'ModwinGriffith' || CMD_NAME === 'modwingriffith' || CMD_NAME === 'modwin' || CMD_NAME === 'Modwin'){
				message.channel.send('Ahh! That boisterous man who runs the boxing gym in brooklyn? He is quite the fellow I must say. His life story is also quite interesting from the tales I have heard. His stand is quite strong and his hand to hand combat skills are also no joke! However, I must say, despite him being married and a father, he is quite the flirt. I hope he can keep his hands to himself.');
			} else if(CMD_NAME === 'v' || CMD_NAME === 'V' || CMD_NAME === 'Vivi' || CMD_NAME === 'vivi'){
				message.channel.send('That mysterious woman with a past not even I can track down? Well, all I have to say about her is that I hope that she is able to find what she is looking for in NYC.');
			} else if(CMD_NAME === 'ImbroglioneUnleashed' || CMD_NAME === 'imbroglioneunleashed'){
				message.channel.send("The blade's true form... Unadulterated lust and hunger for blood and flesh. He doesn't even consume it... A monster born out of hatred and a wish for humanity to end. I hope his creator was able to find peace knowing the devastation he set upon the world.");
			} else if(CMD_NAME === 'CerseiCostello' || CMD_NAME === 'cerseicostello'){
				message.channel.send("Wait... you found her?? WHERE WAS SHE?!?!?!?");
			} else if(CMD_NAME === 'faith' || CMD_NAME === 'Faith' || CMD_NAME === 'Chaos' || CMD_NAME === 'chaos'){
	            message.channel.send("The liars....... one did it for the benefit of all and one did it for the benefit of **their** world");
	        } else if(CMD_NAME === '0'){
	            message.channel.send("Ahhh so you understand how this is a perfected game, in which you can make it how you never lose. You are quite a smart cookie! 0... the amount of times that... they were able to win... and also the name of their leader. As he used to say... you should never go into a battle if you don't have at least 1 way of winning. Regardless, you are proceeding nicely...");
	        } else if(CMD_NAME === 'muhammed' || CMD_NAME === 'Muhammed'){
	            message.channel.send("Oh? The son of ||Redacted||? I am usually not into the younger type of guy but Muhammed is... a little more built than the average boy. Despite his father's achievements, he does ***not*** look at him with a high regard. Muhammed seeks to pave a story for the Hassan family.");
	        } else if(CMD_NAME === 'lucylovesyou' || CMD_NAME === 'LucyLovesYou' || CMD_NAME === 'lucilovesyou' || CMD_NAME === 'LuciLovesYou' || CMD_NAME === 'LuciIloveYou' || CMD_NAME === 'luciiloveyou' || CMD_NAME === 'lucyiloveyou' || CMD_NAME === 'LucyILoveYou'){
	            message.channel.send("Luci loves you. He sure does... Luci! You were an unseen hero to many. Little do people know of the journey that a crow makes to protect the ones of the world. But of course... why would anybody know that. Ms. BB and Dr. Karolina are the only ones who remember you after all. Do you really need anybody else other than your closest to remember?");
	            message.channel.send("You know... it is quite funny. I did not take Luci as the type of guy who would like songs like... this... especially given his background. Despite his cold nature, maybe 平和's taste in music rubbed off on him a little.")
	        } else if(CMD_NAME === 'yui' || CMD_NAME === 'Yui' || CMD_NAME === 'Shogun' || CMD_NAME === 'shogun'){
	            message.channel.send("Oh the Shogun! She is quite a good friend of mine (as long as she keeps bringing me that nice Sake :ok_hand: ) She is the current leader of the Verdant Night and is very generous. I would not take this for granted though as she is very strict and sometimes... terrifying. Not even I dare to anger her.");
	        } else if(CMD_NAME === 'LifeIsSacred' || CMD_NAME === 'lifeissacred'){
	            message.channel.send("Luci Luci Luci... the guy never learns... I am surprised that he is still alive after all of the things he has done. He is a very... interesting person. He is very... *caring* for the people he loves. He is also very... *caring* for the people he hates. He is a very... *caring* person. If he was a bit brighter and struck down those ideals, he would not be suffering so much would he...");
	        } else if(CMD_NAME === 'CosmicLoveForMoreMyLovelies' || CMD_NAME === 'cosmicloveformoremylovelies' || CMD_NAME === 'Cosmicloveformoremylovelies'){
	            message.channel.send("Oh oh oh. You can follow directions can you. How cute. Cosmic Love, the name of the sword that Mr. Cosmos made and used during the war. Unfortunately it was snatched away (how very sad) at the end as a consequence of his actions. A sword which contained the memories of many worlds now lost to time and space.");
	        } else if(CMD_NAME === '8'){
	            message.reply('A beautiful number right? :8ball:');
	        } else if(CMD_NAME === 'omnipotence' || CMD_NAME === 'Omnipotence'){
	            message.channel.send('Omnipotence? Ahh Jordy\'s ultimate weapon per say. It had quite the attitude and appetite I must say. Who knew providing it with ***infinity*** was enough to stave off its hunger :joy:');
			} else if(CMD_NAME === 'ishmael' || CMD_NAME === 'Ishmael'){
				message.channel.send('(2)3.(5)(4)(5)zon(5)w(2).co(4)/f(1)(7)e(2).d20.(1)o/(1)(4)(5)g(6)(2)/322182166/QQ(1)(3)WUZ(4)(4)WH(2)9V(5)QYCu_xQ/(4)(5)x.png?1673381219')
				message.channel.send('Send this image of my brother to me as the final link as a BB command.')
			} else if(CMD_NAME === 's3.amazonaws.com/files.d20.io/images/322182166/QQihWUZmmWHs9VaQYCu_xQ/max.png?1673381219' || CMD_NAME === 'https://s3.amazonaws.com/files.d20.io/images/322182166/QQihWUZmmWHs9VaQYCu_xQ/max.png?1673381219'){
				message.channel.send('That is Ishmael. The third of us. He is one of my older brothers. He hates the corrupt priests of this world who use their power to extort people who look up to them... pieces of shit like Joel Olsteen, Kenneth Copeland, and Troy Paxton... Men who are sitting in their multimillion dollar mansions/penthouses... Enough about them though. Ishmael is a leader. He is a man who helps the community and he asks for no help or fame... A true man of faith. Nonetheless, it is onto the next part of this. Given the way I have been talking, I hope you have been able to assume who I am or rather what my title is.');
				message.channel.send('I want you to type out who I am. I am one of the few which were made after the Messiah was born: \'So the Lord said to him, “Arise and go to the street called Straight, and inquire at the house of Judas for one called Saul of Tarsus, for behold, he is praying.\'')
			// } else if(CMD_NAME === 'Ananias' || CMD_NAME === 'ananias'){
				// require('./7778891011/ananias.js').run(message);
			} else if(CMD_NAME === '22'){
				message.channel.send("Indeed. It was her... my sister. Not by blood nor crystal, but by compassion and soul. She is the one who tested my second eldest brother, 'Abraham'. In a sense she is my Messiah. My fourth brother, Solomon, was one who sacrificed a lot to try and prevent the disaster that resulted in her death. He tried to protect her and in turn, he lost more than anyone else.  In the end, it was all for naught... we were not able to stop our brother.")
				message.channel.send(".... too many regrets.")
				message.channel.send("def50200807d38a58eb40fc3c434fc41b2df6f29710383f454b4025e68fa29705e38943a3005cf799834d5316aa6379604e9a3ccf3611710f6e11b2d051ed26e3f7632ec2e8bb3f487b614ba141265c9d7a261ed693fb5822e3cb64668e20ffda8a89b3d93e6165040e30da55a62250e89e660337ab2d9db1238a3356cd4c27dbe672aea388452de5e8c644c2a04934a2400a5bb581793284c801b5feac94567defb7e7f593d74a577db710083ca01b2e7ca3d9611702065031fcf2a4d3627196436a6caf37596554abdaa1c8272855ff4f1f28cc4c0889ca65fbef26eab6e450c9a74c7ae627ebf1b1e323cf4eb6b1df23949bc657593e6d3c96a1535376ed6fe767074e34b5d8aaeb0af1f185582739855b2641a921755450ec34da3251cfbfe21c4ec456ae2d1cda0d267b2ce052d516456644caf321ad53fa782d3f1183bdde4449b2dae0b64fbd04bca467d12e9641cf1870c0fda7728428e70d9aadc598d7f475b070323e9173380f10571713587a84e61c95e1b41fc698b9e67f3c0935b6f495445d9b35857c2068381653893ad5d17bbbf49be15fb1d2f1d3726d98779e2b3c8ade4c5e07c6879b223deb936c9c3053272e4a0d6580051750d5bbfabaebd388a303b6c626c614713fb6963d57183c01220cdad038a76aa1a3a94155ff7fdb0a2a53312a27d776a44d8280c3f7788618f141e5bfe422e4aa7d3b7c6dc7f9a04a32169e49697af153c429143cecd5d1bacb040ec20c1e0585f4b19e620a6ca1e1663aa797d663894376e58d9f9f7413642059e15f75c4288ee10b39a68a69685bb5f01f14629918108d87f45e5e1bf445f27f7af35f2402ecb7f07ab7ab4c567e99507b7be483e43d0fecc115deca10f0e4cd2393762ac562dd9d5ba24");
				message.channel.send("Don't worry though. Something like this would be a bit difficult without the proper tools (and information but you should have that now!): https://www.dbmxpca.com/tools/msg-decrypt/ \nOne thing of importance is to make sure that you do not have any extra spaces at the end as that could cause an error!");
			} else if(CMD_NAME === 'infinitycouncil' || CMD_NAME === 'InfinityCouncil'){
				require('./7778891011/infinityCouncil.js').run(message);
			} else if(CMD_NAME === 'JohnnyJoestar' || CMD_NAME === 'johnnyjoestar'){
				require('./7778891011/johnnyJoestar.js').run(message);
			} else if(CMD_NAME === '89'){
				require('./7778891011/89.js').run(message);
			} else if(CMD_NAME === 'monastery' || CMD_NAME === 'Monastery'){
				require('./7778891011/monastery.js').run(message);
			} else if(CMD_NAME === currentTimeAnswer){
				require('./7778891011/currentTime.js').run(message);
			} else if(CMD_NAME === current1HourFuture){
				require('./7778891011/current1HourFuture.js').run(message);
			} else if(CMD_NAME == 50){
				require('./7778891011/50.js').run(message);
			} else if(CMD_NAME === 'unforgotten' || CMD_NAME === 'Unforgotten'){
				const queue = player.createQueue(message.guild, {
					ytdlOptions: {
						filter: "audioonly",
						highWaterMark: 1 << 30,
						dlChunkSize: 0,
					},
					metadata: {
						channel: message.channel,
					}
				});
				try {
					if(!queue.connection) await queue.connect(message.member.voice.channel);
				} catch {
					queue.destroy();
					throw new Error("Could not join your voice channel!");
				}
				const track = await player.search("https://youtu.be/ol706oLODzg", {
					requestedBy: message.author,	
				}).then(x => x.tracks[0]);
				queue.play(track);
			} else if(CMD_NAME === 'nsfw'){
				require('./helpers/nsfw.js').run(message, args);
			} else if(CMD_NAME === 'meme'){
				require('./helpers/meme.js').run(message);
			} else if(CMD_NAME === 'dankmeme'){
				require('./helpers/dankmeme.js').run(message);
			} else if(CMD_NAME === 'jojomeme'){
				require('./helpers/jojomeme.js').run(message);
			} else if(CMD_NAME === 'ai'){
				require('./ai/ai.js').run(message);
			} else if(CMD_NAME === 'play'){
				require('./music/play.js').run(player, message, args);
			} else if(CMD_NAME === 'test2'){
				const queue = player.createQueue(message.guild, {
					ytdlOptions: {
						filter: "audioonly",
						highWaterMark: 1 << 30,
						dlChunkSize: 0,
					},
					metadata: {
						channel: message.channel,
					}
				});
				try {
					if(!queue.connection) await queue.connect(message.member.voice.channel);
				} catch {
					queue.destroy();
					throw new Error("Could not join your voice channel!");
				}
				const track = await player.search("https://www.youtube.com/watch?v=QH2-TGUlwu4", {
					requestedBy: message.author,	
				}).then(x => x.tracks[0]);
				queue.play(track);
			} else if(CMD_NAME === 'Secret'){
	            const member = getMember();
	            //Turn the rest of the args into 1 string
	            let temp = "";
	            for(let i = 1; i < args.length; i++){
	                temp += args[i] + " ";
	            }
	            //Send the member a dm using the arg
	            member.send(temp);
	            console.log(`Sent ${member.user.username} a DM with the message: ${temp}`);
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
	        } else if(CMD_NAME === 'minesweeper'){
	            await require('./minesweeper/minesweeper.js').run(message, args);
	        } else if(CMD_NAME === '32'){
	            message.channel.send("Ah... you have beaten minesweeper. I applaud your effort. You know.... Chaos himself loved minesweeper as well. The reason I chose 32 mines were because... that was the amount of mines that Chaos used when he played minesweeper.... on us. Cruelty comes in many forms... finding entertainment by placing minefields on others is one form of that. Watching families blown to bits with a wrong step.... mothers, daughters, sons, fathers, husbands, and.... wives...");
	        } else if(CMD_NAME === 'Humanitad' || CMD_NAME === 'humanitad'){
	            message.channel.send("The Humanitad. An interesting poem written by Mr. Wilde himself. I will admit, I am not fully versed in poetry of the english variety. I have read some of it, but I am not very good at it. Chaos on the other hand loved this poem and in a sense, it foreshadowed his events.\n*He is not dead, the immemorial Fates*\n*Forbid it, and the closing shears refrain.*\n He was misunderstood and due to that we were the ones to suffer. Poor us... All I ask is that these avatars can use their powers for good rather than for their own entertainment... One of them seems to already be on that path... The other, seems to not change.... please feline...");
	        } else if(CMD_NAME === 'roll'){
	            require('./roller/roll.js').run(message, args);
	        } else if(CMD_NAME === 'hRoll' || CMD_NAME === 'hroll'){
	            require('./roller/hRoll.js').run(message, args);
	        } else if(CMD_NAME === 'myCharacterDiedSoImRollingANewCharacter'){
	            require('./roller/myCharacterDiedSoImRollingANewCharacter.js').run(message);
			} else if(CMD_NAME === 'query' || CMD_NAME === 'Query'){
				require('./helpers/query.js').run(client, message, args[0]);
			} else if(CMD_NAME === 'dm' || CMD_NAME === 'DM'){
				require('./helpers/dm.js').run(client, message, args);
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
	        } else if(CMD_NAME === 'characterCardList' || CMD_NAME === 'cCardList'){
	            await require('./dnd/cardSearches/characterCardList.js').run(message);
	        } else if(CMD_NAME === 'locationCardList' || CMD_NAME === 'lCardList'){
	            await require('./dnd/cardSearches/locationCardList.js').run(message);
	        } else if(CMD_NAME === 'equipmentCardList' || CMD_NAME === 'eCardList'){
	            await require('./dnd/cardSearches/equipmentCardList.js').run(message);
	        } else if(CMD_NAME === 'spellCardList' || CMD_NAME === 'sCardList'){
	            await require('./dnd/cardSearches/spellCardList.js').run(message);
	        } else if(CMD_NAME === 'totalCards' || CMD_NAME === 'tCards' || CMD_NAME === 'totalcards'){
	            await require('./dnd/cardSearches/totalCards.js').run(message);
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
	        } else if(CMD_NAME === 'renameDeck'){
	            require('./dnd/deckCommands/renameDeck.js').run(message, args);
	        } else if(CMD_NAME === 'decks'){
	            require('./dnd/deckCommands/viewDecks.js').run(message);
			} else if(CMD_NAME === 'listPacks' || CMD_NAME === 'lPacks'){
				require('./dnd/packCommands/listPacks.js').run(message);
			} else if(CMD_NAME === 'viewPack' || CMD_NAME === 'vPack'){
				require('./dnd/packCommands/viewPack.js').run(message, args);
			} else if(CMD_NAME === 'shop' || CMD_NAME === 'Shop'){
				require('./dnd/packCommands/shop.js').run(message);
			} else if(CMD_NAME === 'pOpen' || CMD_NAME === 'open'){
				require('./dnd/packCommands/openPack.js').run(message);
	        } else if(CMD_NAME === 'temp'){
	            let player1 = message.author.id;
				const userData = require('./data/userData.json');
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
	                        "Tyler Wolfe",
	                        "Catastrophe",
	                        "Buddy McLean",
	                        "Repugnans Fabula",
	                        "Rook",
	                        "Tommy",
	                        "Buddy McLean",
							"Buddy McLean",
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
	                        "Enrico Pucci", "Speedwagon Foundation HQ", "Catastrophe", "Bite", "Bite", "Stand Rush", "Vampiric Bite"
	                    ],
	                    isValid: true
	                },
	                field: [null, null, null, null, null, null],
	                subField: [null, null, null, null, null, null],
	                worldHP: 8,
	                gold: 100,
	                hand: []
	            }
	            let turnLog = {turnNumber: 1, text: ""};
				await require('./dnd/gameCommands/convertDeck.js').run(player1);
				await require('./dnd/gameCommands/convertDeck.js').run(player2);
				const drawCard = require('./dnd/gameCommands/drawCard.js');
				player1.field = [null, null, null, null, null, null, null, null, null, null];
				player1.subField = [null, null, null, null, null, null, null, null, null, null];
	            await drawCard.run(client, turnLog, player1);
	            await drawCard.run(client, turnLog, player1);
	            await drawCard.run(client, turnLog, player1);
	            await drawCard.run(client, turnLog, player1);
				await drawCard.run(client, turnLog, player1);
				await drawCard.run(client, turnLog, player1);
				await drawCard.run(client, turnLog, player1);
	            await drawCard.run(client, turnLog, player2);
	            await drawCard.run(client, turnLog, player2);
	            await drawCard.run(client, turnLog, player2);
	            await drawCard.run(client, turnLog, player2);
	            await drawCard.run(client, turnLog, player2);
				await drawCard.run(client, turnLog, player2);
				const showField = require('./dnd/gameCommands/showField.js');
				const showHand = require('./dnd/gameCommands/showHand.js');
	            await showField.run(message, player1, player2);
				const summon = require('./dnd/playerCommands/summon.js');
				const location = require('./dnd/playerCommands/location.js');
				const cast = require('./dnd/playerCommands/cast.js');
				const equip = require('./dnd/playerCommands/equip.js');
	            await location.run(client, turnLog, "l	ocation Speedwagon Foundation HQ", player2, player1);
	            await summon.run(client, turnLog, "summon Catastrophe", player1, player2);
	            await summon.run(client, turnLog, "summon Tyler Wolfe", player1, player2);
				await summon.run(client, turnLog, "summon Repugnans Fabula", player1, player2);
				await summon.run(client, turnLog, "summon Buddy McLean", player1, player2);
				await summon.run(client, turnLog, "summon Rook", player1, player2);
				// await summon.run(client, turnLog, "summon Tommy", player1, player2);
	            await showField.run(message, player1, player2);
	        } else if(CMD_NAME === 'Abrahamlegacy' || CMD_NAME === 'abrahamlegacy'){
	            require('./legacy/abrahamLegacy.js').run(message);
	            setTimeout(function(){
	                killCommand = setInterval(funcKill, 1000);
	            }, 24000);
	        } else if(CMD_NAME === 'chess'){
	            const id = message.author.id;
	            if(chesses[id] === undefined){
	                chesses[id] = new Chess();
	                console.log('Chess game: ', message.author.username);
	                message.channel.send('New game started!');
	                message.channel.send('http://www.fen-to-image.com/image/20/single/coords/' + chesses[id].fen().split(' ')[0]);
	            };
	        } else if(CMD_NAME === 'move'){
	            const endGame = require('./chess/endGame.js');
	            function get_fen_img(id){
	                return 'http://www.fen-to-image.com/image/20/single/coords/' + chesses[id].fen().split(' ')[0];
	            }
	            const id = message.author.id;
	            if(chesses[id] === undefined){
	                message.channel.send('You need to start a game first!');
	                return;
	            }
	            let move = args[0];
	            let valid = chesses[id].move(move);
	            if(valid){  
	                message.channel.send("Valid move");
	            } else if(!valid || chesses[id].move(move, {sloppy: true}) === null) {
	                message.reply('Illegal move! Valid moves are: ' + chesses[id].moves().join(', ') + '\n' + get_fen_img(id));
	                return;
	            }
	
	            stockfish.chain()
	                .position(chesses[id].fen())
	                .go({depth: 5})
	                .then(function(result){
	                    let match = result.bestmove.match(/^([a-h][1-8])([a-h][1-8])([qrbn])?/);
	                    if(match){
	                        var m = chesses[id].move({from: match[1], to: match[2], promotion: match[3]});
	                        message.channel.send('\n' + get_fen_img(id));
	                        if(chesses[id].isGameOver()) {
	                            endGame.run(id, false, chesses, message);
	                        }
	                    }
	                })
	            if(chesses[id].isGameOver()) {
	                endGame.run(id, false, chesses, message);
	            }
	        } else if(CMD_NAME === 'resign' || CMD_NAME === 'Resign'){
	            const endGame = require('./chess/endGame.js');
	            const id = message.author.id;
	            if(chesses[id] === undefined){
	                message.channel.send('You can\'t resign a game that never started silly!');
	                return;
	            }
	            endGame.run(id, true, chesses, message);
	        } else if(CMD_NAME === 'TheWarLegacy' || CMD_NAME === 'thewarLegacy'|| CMD_NAME === 'theWarLegacy'){
	            const theWar = require('./legacy/theWar.js');
	            theWar.run(message);
	        } else if(CMD_NAME === 'battleship' || CMD_NAME === 'Battleship'){
	            const {DiscordBattleShip} = require('discord-battleship');
	            const BattleShip = new DiscordBattleShip({
	                embedColor: "BLUE",
	                prefix: PREFIX,
	            })
	            await BattleShip.createGame(message);
	        } else if(CMD_NAME === 'poll' || CMD_NAME === 'Poll'){
				poll(message, args, "+", '#00D1CD')
			} else if(CMD_NAME === 'christmas' || CMD_NAME === 'Christmas'){
				const christmas = require('./legacy/christmas.js');
				christmas.run(message);
			} else if(CMD_NAME === 'test123'){
				const id = (await message.channel.send(args[0])).id;
				//Rapidly scrambles the letters in the message every 0.1 seconds
				const scramble = setInterval(function(){
					const msg = message.channel.messages.cache.get(id);
					const content = msg.content;
					const newContent = content.split('').sort(function(){return 0.5-Math.random()}).join('');
					msg.edit(newContent);
				}, 500); 
				//Stops the scrambling after 5 seconds
				setTimeout(function(){
					clearInterval(scramble);
				}, 15000);
			} else if(CMD_NAME === 'register' || CMD_NAME === 'Register'){
				await require('./sicounter/register.js').run(message);
			} else if(CMD_NAME === 'showSI' || CMD_NAME === 'supremeinspiration' || CMD_NAME === 'SupremeInspiration' || CMD_NAME === 'ShowSI'){
				await require('./sicounter/showSI.js').run(message);
			} else if(CMD_NAME === 'addSI' || CMD_NAME === 'addsi' || CMD_NAME === 'AddSI' || CMD_NAME === 'Addsi'){
				await require('./sicounter/addSI.js').run(message);
			} else if(CMD_NAME === 'removeSI' || CMD_NAME === 'removesi' || CMD_NAME === 'RemoveSI' || CMD_NAME === 'Removesi'){
				await require('./sicounter/removeSI.js').run(message);
			} else if(CMD_NAME === 'setSI' || CMD_NAME === 'setsi' || CMD_NAME === 'SetSI' || CMD_NAME === 'Setsi'){
				await require('./sicounter/setSI.js').run(message, args[0]);
			} else if(CMD_NAME === 'animebunnygirls' || CMD_NAME === 'AnimeBunnyGirls' || CMD_NAME === 'AnimeBunnyGirls'){
				await require('./helpers/animebunnygirls.js').run(message);
	        } else {
	            if(CMD_NAME === 'attack' || CMD_NAME === 'Attack' || CMD_NAME === 'add' || CMD_NAME === 'Add'){
	                return;
	            } else {
	                message.reply('I do not know what you are talking about. :thinking: Maybe this will be implemented by **<ERROR_404: USER_NOT_FOUND>** in a future patch? There will be infinite patches after all.');
	            }
	        }
	    }
} catch (error) {
    console.log("Stack: " + error.stack);
}
});

client.on('interactionCreate', async interaction => {
	if(!interaction.isCommand()) return;

	if(interaction.commandName === 'ping'){
		await interaction.reply('Pong!');
	} else if(interaction.commandName === 'server'){
		await interaction.reply('Server info.');
	} else if (interaction.commandName === 'user'){
		await interaction.reply('User info.');
	}
	if (interaction.commandName === "play"){
		require('./music/play.js').run(player, interaction, [interaction.options.getString('query')]);
    } else if(interaction.commandName === "skip"){
		const queue = player.getQueue(interaction.guildId);
		if (!queue) return await interaction.reply({ content: "❌ | No music is being played!", ephemeral: true });
		const success = queue.skip();
		return await interaction.reply({ content: success ? "⏭️ | Skipped the song!" : "❌ | Could not skip the song!", ephemeral: true });
	} else if(interaction.commandName === "stop"){
		const queue = player.getQueue(interaction.guildId);
		if (!queue) return await interaction.reply({ content: "❌ | No music is being played!", ephemeral: true });
		queue.destroy();
		return await interaction.reply({ content: "⏹️ | Stopped the music!", ephemeral: true });
	} else if(interaction.commandName === "queue"){
		const queue = player.getQueue(interaction.guildId);
		if (!queue) return await interaction.reply({ content: "❌ | No music is being played!", ephemeral: true });
		return await interaction.reply({ embeds: [new EmbedBuilder()
			.setColor("#A020F0")
			.setAuthor({name: "Server Queue ", iconURL: interaction.guild.iconURL()})
			.setDescription(queue.tracks.length >= 1 ? queue.tracks.map((track, i) => {
				return `#${i + 1} - ${track.title}`
			}).join("\n") : "No songs in queue!")
		], ephemeral: true});
	} else if(interaction.commandName === "pause"){
		const queue = player.getQueue(interaction.guildId);
		if (!queue) return await interaction.reply({ content: "❌ | No music is being played!", ephemeral: true });
		const success = queue.setPaused(true);
		return await interaction.reply({ content: success ? "⏸ | Paused the music!" : "❌ | Could not pause the music!", ephemeral: true });
	} else if(interaction.commandName === "resume"){
		const queue = player.getQueue(interaction.guildId);
		if (!queue) return await interaction.reply({ content: "❌ | No music is being played!", ephemeral: true });
		const success = queue.setPaused(false);
		return await interaction.reply({ content: success ? "▶ | Resumed the music!" : "❌ | Could not resume the music!", ephemeral: true });
	} else if(interaction.commandName === "loop") {
		const queue = player.getQueue(interaction.guildId);
		if (!queue) return await interaction.reply({ content: "❌ | No music is being played!", ephemeral: true });
		const success = queue.setRepeatMode(queue.repeatMode ? 0 : 1);
		return await interaction.reply({ content: success ? "🔁 | Repeating the queue!" : "❌ | Could not repeat the queue!", ephemeral: true });
	} else if(interaction.commandName === "shuffle") {
		const queue = player.getQueue(interaction.guildId);
		if (!queue) return await interaction.reply({ content: "❌ | No music is being played!", ephemeral: true });
		const success = queue.shuffle();
		return await interaction.reply({ content: success ? "🔀 | Shuffled the queue!" : "❌ | Could not shuffle the queue!", ephemeral: true });
	} else if(interaction.commandName === "remove") {
		const queue = player.getQueue(interaction.guildId);
		if (!queue) return await interaction.reply({ content: "❌ | No music is being played!", ephemeral: true });
		const index = interaction.options.getInteger("index");
		if (index < 1 || index > queue.tracks.length) return await interaction.reply({ content: `❌ | Please enter a valid track number (1 - ${queue.tracks.length})!`, ephemeral: true });
		const track = queue.tracks[index - 1];
		queue.remove(index - 1);
		return await interaction.reply({ content: `✅ | Removed **${track.title}** from the queue!`, ephemeral: true });
	} else if(interaction.commandName === 'clear'){
		const queue = player.getQueue(interaction.guildId);
		if(!queue) return await interaction.reply({content: '❌ | No music is being played!', ephemeral: true});
		queue.clear();
		return await interaction.reply({content: '✅ | Cleared the queue!', ephemeral: true});
	} else if(interaction.commandName === 'ai'){
		console.log("This is a test");
		require('./ai/ai.js').run(interaction);
	}
});

client.login(process.env.DISCORDJS_BOT_TOKEN);