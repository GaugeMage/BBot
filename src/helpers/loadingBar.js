exports.run = async(message) =>{
    const loadingPercentageID = (await message.channel.send("Loading…")).id;
    const loadingBarID = (await message.channel.send("▒▒▒▒▒▒▒▒▒▒")).id;

    return new Promise((resolve) => {

        // const loadingPercentageID = (await message.channel.send("Loading…")).id;
        // const loadingBarID = (await message.channel.send("▒▒▒▒▒▒▒▒▒▒")).id;

        const loadingPercentageMsg = message.channel.messages.cache.get(loadingPercentageID);
        const loadingBarMsg = message.channel.messages.cache.get(loadingBarID);
        
        setTimeout(function(){
            loadingPercentageMsg.edit('10%');
            loadingBarMsg.edit('█▒▒▒▒▒▒▒▒▒');
        }, 1000);

        setTimeout(function(){
            loadingPercentageMsg.edit('20%');
            loadingBarMsg.edit('██▒▒▒▒▒▒▒▒');
        }, 2000);

        setTimeout(function(){
            loadingPercentageMsg.edit('30%');
            loadingBarMsg.edit('███▒▒▒▒▒▒▒');
        }, 3000);

        setTimeout(function(){
            loadingPercentageMsg.edit('40%');
            loadingBarMsg.edit('████▒▒▒▒▒▒');
        }, 4000);

        setTimeout(function(){
            loadingPercentageMsg.edit('50%');
            loadingBarMsg.edit('█████▒▒▒▒▒');
        }, 5000);

        setTimeout(function(){
            loadingPercentageMsg.edit('60%');
            loadingBarMsg.edit('██████▒▒▒▒');
        }, 6000);

        setTimeout(function(){
            loadingPercentageMsg.edit('70%');
            loadingBarMsg.edit('███████▒▒▒');
        }, 7000);

        setTimeout(function(){
            loadingPercentageMsg.edit('80%');
            loadingBarMsg.edit('████████▒▒');
        }, 8000);

        setTimeout(function(){
            loadingPercentageMsg.edit('90%');
            loadingBarMsg.edit('█████████▒');
        }, 9000);

        setTimeout(function(){
            loadingPercentageMsg.edit('100%');
            loadingBarMsg.edit('██████████');
            resolve();
        }, 10000);
    });
}