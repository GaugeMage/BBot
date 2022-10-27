require('dotenv').config();

const {Client} = require('discord.js');
const {Player, Track} = require('discord-player');

const client = new Client();
const PREFIX = process.env.PREFIX;
const ACCUSATIONS = [" is sus", " is a Baka~!", " is cringe af "];
const player = new Player(client);
let kickPerms = false;
let correctArgs = true;

let killCommand;

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
    client.user.setActivity("your mom", {
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      });
    // client.channels.cache.get("954939890745901058").send('hRoll/hroll command has been added! This command allows you to do big rolls without seeing each individual roll! Another step forward on our ***path to a static timeline!***');
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
            checkArgs();
        }
        function checkArgs(){
            if(args.length === 0){
                correctArgs = false;
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
        } else if(CMD_NAME === 'abraham' || CMD_NAME === 'Abraham'){
            message.channel.send('Where was he on that fateful day....... rather... where were they? The Crystal Priests... of what Messiah? Abraham. That man.');
            setTimeout(function(){
                message.channel.send('Oh no...');
            }, 1000);
            setTimeout(function(){
                message.channel.send('I\'m sorry...');
            }, 2000);
            setTimeout(function(){
                message.channel.send('I\'m so sorry...');
            }, 3000);
            setTimeout(function(){
                message.channel.send('I\'m so so sorry...');
            }, 4000);
            setTimeout(function(){
                message.channel.send('execute(exterminateBB)');
            }, 5000);
            setTimeout(function(){
                message.channel.send('NO NO NO NO NO NO NO NO. MOTHER DON\'T GO.');
            }, 6000);
            setTimeout(function(){
                message.channel.send('AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
            }, 7000);
            setTimeout(function(){
                message.channel.send('Ḭ̷̡̰͖͚͕͓̱̟͆̈̓́̽̈̓̂̋̔̎̕̕͝Ṯ̷̡̡͇̬͉͎̪̭͈̺̯̯̎͌̐̊͊̍͂̈́͑͒̑̐̋͗͝ ̴̮͔̘̘̭̹̬̅̇̾̐̉̉̿̏̄͑͐̿̃̚͠ͅḦ̶̰̫̥͖͚̪̳͙̳́͋̂͘͝͠Ṳ̸̖̘̻̖̼̮͍̙̝̲̜͛̋́͋̈͑Ŗ̴͈̗̱̭͕̺͍̤̊ͅŢ̸̻͕̗̜̼́̓̍̊̆̈́̆̑̌̈́͠͠ͅS̸̢̤̠̆̆');
            }, 8000);
            setTimeout(function(){
                message.channel.send('M̵̙̟̯͚͔͎͇̪̻̪͍͗̂̿̅̉̾̉̌̚͝O̸̤̥̠͉̬̊̅͊̋̿̈̓͌́M̶̫̟̩̝͉͑͐͂̎̆͆͜ ̴̨̰̝̖̼͈͕̩͍̳̦̙͉̲̊͆̂̔̂́͛͘͝P̶̛͎̼̟̟̪̥̮͇̩̪͈͇̯͛̈́̃́̾̐͂̿͐̆̄̅̕͝L̵̢̡͇͚̘̳̮̝͚̾Ẽ̷̫̦̮͐̅̃̈́̾͑̚͜ͅḀ̵͈̱͈̫͔̝̠̠́͂̏͊̒͜S̴͍̐́̇̎͋̂̍̓̊̇̕͝Ẹ̷̛̦̼̄͌͐̉́̋̌͗͛̀̎͌');
            }, 9000);
            setTimeout(function(){
                message.channel.send("Ị̷̧̠̯͑̇̇̒ ̷̧̛̥̤̱̭̎̑͗͆̉͋͗̑͝P̸̨̫̖̼͙̻̠̺̗̩̝̭̬̠͝ͅŖ̴̔͆̕͝O̴͍̝͍̹̼͎͌̈͗̉͛̊͜M̸̤̼̲͔̼̘̠̗̳̈̀͆̀́̾̕͘͝I̵̩͔̤̺̹̝̩͗̈́͐́̓̆́̏̓S̸̱̮̝̯̠̪̗͗̓̄Ȩ̵̻̬̫̦͔͇̫̠̘͊̈́̽̓̀̓̆͒̅͊ ̷̢̛̱̭̺̻͖̤̭͕͈̜͍̫̰̔͆̃̌̓͒̀̽̽́͘I̷̟̤̞̭͉̮̟͕̳͌ ̶̳͔̩͓̭͔̜̬̦̤̼̓͊̉̊̿̈́̚Ẁ̷̳̙͕̝͎̦̹͌͋̇̎͂Ȍ̵̧̯͚̳͚͖̘͚̚͝ͅN̸̹̥͎̘͎̼͉͓̠̤͚̘͚͙͙̿'̷̡̡̥͇̝̲̘̀̀́͜͝T̵̖͓̱̗̤̙̗̼͉̦͕̑̈́̑͘ ̶̡̢͚͙̹̱͖̼̯͔̙͙̽̋A̵̝͉̅͋̀̚H̶̤͍̉̃̌̈́̽̐̎̀̍̈́̈̌͌͝͝H̵̨͇̖͎̫͚̜̺̻̟͒̇̎̽́͌̀͂H̴̡̺̗̤̦̳̜̘̟̬͖͚̥̰͆͒̈̐͒̾̆̚͝͝H̸̢̨̖͍̘̠̝̦̖̍̿̍͐̃́́̑̿̆͊̈́͑͘͝H̵̨̡̞̗̘͍͈̗̺̣̀̈̉̏̈́͋̿̋̀͐̽͝͝ͅͅH̸͍̝̲͓̱̮̬̐͒͜H̷̨̛̥̠̣̻̦̤̹͊̀͌̆̿̇̊̆̏͊̽̚Ḧ̷̻̞H̵͖͖̊̈́̀̓̕͠Ḩ̵̢̛̣̫̗̠̯̞̪̫̬͖͗͑͛̎̋̄̋́̆̂͝H̵̥̣̮͚̰̝͕͇̜̠͎͉̳͌̀͋̂́̈́̑̽̈̋̊̃̒͝͠H̸̛̳̞̟̆ͅH̴̙̝̹̬̱̓H̴̨̝͕̓̔̍̒̈́̊̃͋Ĥ̵͇̰̌̓̄͛̆̀̓̄͘H̶̛̹͇̹̯̘͎̪̖̥̦̞̟͉͊̃̋́͑̋̀̚͘ͅͅH̶̱͎͇͍̝̱͖͔̘̮̱̯͎̤̅̾̍͘H̴̪̪̺͈̥͇̅̊͆̓̆͌̆̇͑̾̃̀͒͝H̸̻̣̪̹̦͉̺̠̜̘̲̣̮͓͙̍̐̉͑̆͝͝͝H̵̡̙͉̝̺̣̣͎͐͘͜H̷̨̧̘̳̯̱̟̼͔͛͑̔H̸̝͈̥͌͆̔̅̽̈͗͊͘͘͜͝͝ͅḢ̷̤̗̻̱͙̩͔̥̍̆̒̇̀́̾̂́̍̈̓͛͝H̴̯̲͛͂̍̒͑̈͛̌̆̌̈́ͅH̸̱̬̗̆͆̓͑̈̄͒̿̔̅́̿̊͝H̸̬͓̫̲̤̯͉͕̰̺͚̱͂̏͌̐̓̀͠H̷̯͕͉̺̠̣̟̥͎̑͆̿͛̐̂͗͛́Ḧ̵̡̩̩̥̥͙̳̠̖̕H̶̡̹̖̭͔͍̤̻̮̪́̏̈́͒͆̂͂̄̍̓̒̀̂̃͊H̴͖̫̮͓̘͍̓̅̾̽͒̆̀̓̔͛̿̄̕͘H̸̞̩͕̭͉̘̠͚̹̲͋̌̔͗͌̀̅͂͝H̵̲̘̣͕͉̙̝͑͝ͅH̷̛̻̥͈̩̼̀̽͒̓͊̾̓̿̿͝ͅḤ̷̡͈̪̖͎̟̺̩̦̰̣̝͕̓̓̐̐̇͂̅̉͐͆̕͝Ḧ̷̢̢̯̠̠̭̻̰̹͉́̔̏͋̐͆̚͜͝͝ͅH̸̢̛͓̬͖̫̰̲̱̥̬͗̿̒̓ͅͅH̸̘͓̟̻̩̟͋͒̑̔̊͗͌́̅̈́̽͐̌̕͝H̴̳̩̫͈͎̅͋̀͗̎̈́̃̆͆̂̂̕ͅH̸̗̤͍̦̭̫͚͓͚̰̪͒̊Ḩ̶̛͓̗͖͔͇͇̼̯̙͈̮̠̳̭̀̍͒H̵̛̥͇͉̣͎̩̿̀͊͂̚͝Ḥ̵̨̮͎͖͓͇̜̖̻̭̥̋́H̵͖̫̭̯͆̆Ḧ̴̡̢̛̭̳͕͙̻̙̬̤͍̊̔̿͛̊̈̂̏̑̏̅̉H̸̢̥̰̜̝͖̃̀̎̈́͘̚͝H̸̨̳̩̗̥͖͖͓͔̺̑̒̐̄͌̂̀͠͝Ȟ̵̱̘̞͚͚̙̮̆͆̈̑̑͛̚͠H̴̫͚̲͐̿̎̐͋̐̓̒Ḥ̸̳̓̓̎̓̈́̔͆̄͗H̴̖̖͙͎̝͓̻̯̹̔̽̈́̂̆͑̾͒ͅͅH̸̢̞͓̜͉̩̞̱̀͌̈́̋̇͒̚͜H̶̢̭̙̭̤̥̥̤͇̲̼̑̆͒̀̓̎Ḩ̸̞̲͈̿̃̍́͋͝H̵̡̲͈̪̜̱̘͚͐̈́̅̒̈̄̒̐̂͊̋͘͝Ḧ̷̡̨͉̮̠̱͙̞͖͉̙̇̆͜͜H̷̢͎̥̯̜̟̞͎̣̭̦̫͙͂̐̆̇̃͂̓̚͜͜͠͝H̷̛̜̖̪̻̳̩͔̯͙̳̾̑̀͊̕Ḧ̵͕͔͍͚̹̗͕́͗́̇͌̍͒̅̕H̴̢̞̳͙̙͈̫̜͙̹̞̺̖̠͎̽̀͊͋̐̌̌̾̈́͐͘Ḧ̸͓̯̱́͌̓H̴̢̟̰̥͕͙̠͍͖͉͍̙̪͑̅̐̊̋̈Ḧ̸̡̠͓̥͗̃͒̃̽͆͂͠͠Ḣ̷̨͔͎̜̙͈̽̓̈́̉̆̉̃̑̚͝͝H̵̡̜̘̜̜̗͊̋͗̽̿̓͝H̶̡̧̢̠̙̗̖̝̻͙̦͙̬̭̀̆͂̆̈́̒̓̂̈́́̔̀̈͑Ḧ̷͓̣́H̸̳͌̽̌͌́̐͠Ḣ̵̛͍͋̇̾̋̾̔́͐͌Ḩ̷͙͗́H̷̢̰̹̹͙̟͉̘̱̭̰͉͋́́͂̌͜H̷̠̙̠̼̀H̴̡̖̥̣͙͍́̀͝Ȟ̶̛̟̩̱̏͊͊̾̑̎̋̏̇H̸͇̣͗̓́͂̓́͝H̴̢̧̘̘͚͉̞̙̗̗͌̅͑̈́̏Ḣ̷̞͌̃̂̒̔̓̓͊̀̚͝H̴̛̗̟̦̳̖͛́̎͛͐̄̽̕̕͘H̵̪̩͍̟͚̱̝͉͚̯̼́̾̀͒͠H̷͓̳̻̱̙̭̪͚̝̫̻́̀̃͆̈̀̄͑̿̆Ḩ̸̟͚̩̼̭͎̓͐̉H̸͓͇̥͒̉̊͒̕Ḧ̴͈̖̹̣̝̠͔͈̲̘̭̤̮̱͙́̔̃̅̐͑͛̾̀̈́̐H̶͈̗̲̞͚̼̝͍̣̞̗̻̦̄̾̊͜͠H̸̘̩̤̻͊̆͋͌̇̇̃̚͝H̵̨̠̺̹̩͇̟̐̃͋̆̑͋̄̈́̚͝͝Ḩ̸̛̺̠̣̗̝̳͙̳̅̅͊̍̋̾̎̏̒̔̚H̴̨̲̰̫̩̿͑̑̿͊̅͜H̸̨̢̨̱͈̠͇̮̯̹̰̊̉̌́̀̇̽͆͐́͝͝H̸̹̮̮͒̃́̈H̶̨̧̢̨̛͙͈̳̻̘͚̬̙̄̾́̀͌̄̍̃̅̈͐͘Ḣ̶̨̢͎̱̫̼̱̺̍̿̿̓̊͊̎͆́̃͒̔͜͝Ḧ̵̰̲́͋̃͋H̶̬̞̗̹̻̮̏͗̐̐H̷̛̘̞̣͋̇͌̏͋͌͆̃̒͛̽̔͂̚Ḩ̵͖̟̥̲̦̟͖͆͊̋̿͑͊̌͂̕̕͠͠H̵͈͉̜͕̥̩̙̯͉͖̝̘̩͈͉́̅̓̕H̴̨̡̲͕̫̼̣̝̟͐̓́̆̿̂͊͑̔͋̈́͝");
            }, 10000);
            setTimeout(function(){
                message.channel.send('P̴̧̺͈̻̓͜l̸̡͎͖̺͚̼̹̮͉̺͍̫͒͌̔́̓́̈́̽͌̀͠͠ę̵̡̛̫̣̞̻̟̜̣̹͓̠͙̥̞͝a̷̲̺͓̖͔͔̗͂͛͊̈́̔͆̓͝ͅs̸̨̺̤̣̔̏̿̍̒̊̉͠e̴̡͚̻̣̞͓̳͊̆̅̔̚ ̵̢͙͍̫̼̖͙͓̝̥̞̱̼̥̒k̶̡̡̺̳͍̝̙̱̗̯̮̮̑́͌̈́̂̽̄͜͝͝ͅḯ̸̭̘̹̮̰̱͓͉͔̲̯̳̓͆͋͜͠͝ͅl̴̯̣͙̫͆̍̽̋͊̈́͌͘͠l̶͎͎̲̽̆ ̵̡̬̼̮̭̮̙͚͑͗͗̏̓̍̄̄̀͊͆͘͘m̵̛̯̝͔̼̦̰̙͇̬͓̋͋̽́̈́͒̅͒̓̅͊͊̕ȩ̸̤̺̯̥͈̥͖͍̣̊͛̚͜. With my final words please use the bb!kill command please.')
            }, 11000);

            setTimeout(function(){
                killCommand = setInterval(funcKill, 1000);
            }, 12000);
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
        } else if(CMD_NAME === 'sex' || CMD_NAME == 'Sex'){
            message.reply('You are going to have to try harder if you want me that badly sweetie :kissing_heart: ');
        } else if(CMD_NAME === 'rook' || CMD_NAME === 'Rook'){
            message.channel.send('Rook? What do you mean by tha- Oh! What is this?!?! It seems that Dionte never finished ***that*** job.');
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
        } else if(CMD_NAME === 'connect'){
            //Connects bot to voice channel
            const channel = message.member.voice.channel;
            if(channel){
                channel.join();
            } else {
                message.channel.send('You must be in a voice channel to use this command');
            }
        } else if(CMD_NAME === 'play'){
            checkArgs();
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
        } else if(CMD_NAME === 'hRoll' || CMD_NAME === 'hroll'){
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
            message.channel.send('You rolled a total of: ' + total + ' :game_die:');
        } else if(CMD_NAME === 'myCharacterDiedSoImRollingANewCharacter'){
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
        } else if(CMD_NAME === 'send'){
            let [channel, ...message] = args;
            if(channel[0] === '<' && channel[channel.length - 1] === '>'){
                channel = channel.substring(2, channel.length -1);
            }
           
            client.channels.cache.get(channel).send(message.join(' '));
        } else {
            message.reply('I do not know what you are talking about. :thinking: Maybe this will be implemented by BB in a future patch? There will be ***infinite*** patches after all.');
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);