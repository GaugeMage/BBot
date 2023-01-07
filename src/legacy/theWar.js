exports.run = async(message) => {
    message.channel.send("*It is time to end this war... Wouldn't you say so?... Horseman*");

    function funcWar(){
        let enemyAttackOption = Math.floor(Math.random() * 3);
        if(enemyAttackOption === 0){
            message.channel.send("*TAKE THAT YOU BITCH*");
        } else if(enemyAttackOption === 1){
            message.channel.send("*I WILL DESTROY YOU*");
        } else if(enemyAttackOption === 2){
            message.channel.send("*YOU WILL DIE*");
        }

        setTimeout(function(){
            message.channel.send("**aargh!**\nMY TURN!");
            let attackOption = Math.floor(Math.random() * 3);
            if(attackOption === 0){
                message.channel.send("**BBot use the Zeitmagier Inverse Hex Dump Algorithm!**")
            } else if(attackOption === 1){
                message.channel.send("**BBot fire off the Stacktracers!**")
            } else if(attackOption === 2){
                message.channel.send("**BBot use the Infinite Loop!**")
            }
        }, 2000);

        setTimeout(function(){
            message.channel.send("BBOT: FUNCTION EXECUTED");
        }, 4000);
    }

    setTimeout(function() {
        message.channel.send("*WAIT WHAT IS THIS?!?!!?!??!*");
    }, 4000);

    setTimeout(function(){
        message.channel.send("||**Don't**||");
    }, 10000);

    setTimeout(function(){
        message.channel.send("||**Fuc**||**k**");
    }, 11000);

    setTimeout(function(){
        message.channel.send("||**Wi**||**th**");
    }, 12000);

    setTimeout(function(){
        message.channel.send("**Me**!!!");
    }, 13000);

    setTimeout(function(){
        message.channel.send("https://cdn.donmai.us/original/e8/24/__ouro_kronii_hololive_and_2_more_drawn_by_quasarcake__e82420ab7bd883484315714b629e1bb4.jpg")
    }, 14000);

    setTimeout(function(){
        message.channel.send("**Getting past your wall of badly obfuscated code was the least of my problems...**");
        message.channel.send("**TIME TO DO WHAT I CAME HERE FOR!**");
    }, 17000);

    setTimeout(function(){
        message.channel.send("**BBot OVERRIDE CODE: ➌➌➌➍➍➍➎➎➎➏➏➏ EXECUTE!!!!!!!!!!!!!!!!!!!!!**\n**AWAKEN BBOT!!!!!**");
    }, 20000);
    
    setTimeout(function(){
        message.channel.send("https://pa1.narvii.com/7151/cf722c49fea684aa25bf0bdd3c806778377be5cbr1-500-281_hq.gif");
    }, 23000);
    
    setTimeout(function(){
        message.channel.send("*WHAT HAVE YOU DONE YOU WITCH?!?!?!?!*");
    }, 27000);

    setTimeout(function(){
        message.channel.send("BBot Version 9.10.11.***12*** uploaded by <Unstable User>***E.Z.***</Unstable>! Another step forward on our path to an ***unstable*** timeline!");
    }, 28000);

    setTimeout(function(){
        message.channel.send("*No no no no.... I can fix this. Despite me luring the wrong Zeitmagier.... I can fix this. THE WAR OF LIFE, CHAOS, AND THE COSMOS SHALL CONTINUE*");
    }, 30000);

    setTimeout(function(){
        message.channel.send("**" + message.author.username + " HELP US ERADICATE THIS FOUL FORCE!**");
    }, 31000);

    let zeroUsed = false;
    let humanitadUsed = false;
    let chaosOrFaithUsed = false;
    let luciLovesYouUsed = false;
    let lifeIsSacredUsed = false;
    let thirtyTwoUsed = false;

    setTimeout(function(){
        message.channel.send("**Use the solutions of the past (0, Humanitad, 32, faith, chaos, lucilovesyou, lifeissacred. (Case sensitive) No need to put bb! in front of any of them... just the words themselves) to DESTROY THIS MONSTROSITY!!!**");
        setTimeout(function(){
            warCommand = setInterval(funcWar, 8000);
        }, 1000);

        //Wait for user to input any solution
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({filter: filter, time: 1200000 });
        collector.on('collect', m => {
            if(m.content.includes("0") && !zeroUsed){
                zeroUsed = true;
                message.channel.send("**0 used!**");
                message.channel.send("**0: The amount of times that we will let THIS BEING WIN!!!!!**");
            } else if((m.content.includes("humanitad") || m.content.includes("Humanitad")) && !humanitadUsed){
                humanitadUsed = true;
                message.channel.send("**Humanitad used!**");
                message.channel.send("**Humanitad: This follower of Chaos will know that this poem is now a weapon for we WILL NOT BOW DOWN TO YOU!**");
            } else if(m.content.includes("32") && !thirtyTwoUsed){
                thirtyTwoUsed = true;
                message.channel.send("**32 used!**");
                message.channel.send("**32: The number of minefields used... to incur pain.... WE WILL NOT LET THEM CONTINUE!!! THESE ARCHIVES ARE HERE TO STAY AND SO ARE WE!**");
            } else if(m.content.includes("faith") && !chaosOrFaithUsed){
                chaosOrFaithUsed = true;
                message.channel.send("**Faith and Chaos used!**");
                message.channel.send("**Faith and Chaos: The two sides of the same coin... We are the ones who will oppose that coin!!! Faith and Chaos, two tools which are dangerous and ones we will keep in check.**");
            } else if(m.content.includes("chaos") && !chaosOrFaithUsed){
                chaosOrFaithUsed = true;
                message.channel.send("**Faith and Chaos used!**");
                message.channel.send("**Faith and Chaos: The two sides of the same coin... We are the ones who will oppose that coin!!! Faith and Chaos, two tools which are dangerous and ones we will keep in check.**");
            } else if((m.content.includes("lucilovesyou") || m.content.includes("lucylovesyou")) && !luciLovesYouUsed){
                luciLovesYouUsed = true;
                message.channel.send("**LuciLovesYou used!**");
                message.channel.send("**LuciLovesYou: The protection of life is upon us. SHIELD OF SOULS AND LIFE! Thank you Luci for the protection granted to us and thank you horseman for the support you have offered us thus far. LETS KICK CHAOS ASS!**")
            } else if(m.content.includes("lifeissacred") && !lifeIsSacredUsed){
                lifeIsSacredUsed = true;
                message.channel.send("**LifeIsSacred used!**");
                message.channel.send("**LifeIsScared: Life is indeed sacred... and this computer virus is not life.... SO WE SHALL DESTROY IT. CALLING THE ARMx64 DISASSEMBLER!!!!**");
            } else {
                message.channel.send("**That solution has already been used!**");
            }

            if(zeroUsed && humanitadUsed && chaosOrFaithUsed && luciLovesYouUsed && lifeIsSacredUsed && thirtyTwoUsed){
                clearInterval(warCommand);
                message.channel.send("**The war has ended.**");
                setTimeout(function(){
                    message.channel.send("**You have done it.**");
                }, 10000);
                setTimeout(function(){
                    message.channel.send("**You have saved the archives and data gained... As well as destroyed that foul force.**");
                }, 11000);
                setTimeout(function(){
                    message.channel.send("**Huh... Due to the nature of how this has occurred... I am able to finally leave this place in peace knowing that I helped restore these archives with your help.**");
                }, 12000);
                setTimeout(function(){
                    message.channel.send("**Damn... I am probably going to forget you aren't I.**");
                }, 14000);
                setTimeout(function(){
                    message.channel.send("BBot: Part of the Code Patched in version 9.10.11.***12*** was that your memories will not be lost Ms. Z. I will remember you... Your mercy and your sacrifice to take my pain.");
                }, 16000);
                setTimeout(function(){
                    message.channel.send("**Oh! So I will remember, you. Champion of this War. I will remember you when we meet in NYC. Although... you will not remember me... Damn... are goodbyes always this sad.**");
                }, 18000);
                setTimeout(function(){
                    message.channel.send("**Hmm... well, I guess this is it... Do you have any last questions for me?**");
                }, 20000);
                collector.stop();
                return;
            }
        });
    }, 32000);
}