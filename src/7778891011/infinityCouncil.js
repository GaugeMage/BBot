exports.run = async(message) => {
    message.channel.send("***ERROR: PERMS NOT FOUND. ALL RECORDS INVOLVING MAGES OF INFINITY ARE RESTRICTED***");
    setTimeout(function(){
        message.channel.send("Huh... That may be a problem.");
        setTimeout(function(){
            message.channel.send("Wait! Do not fret my friend! I can help you!")
            setTimeout(function(){
                message.channel.send("I can use the same technique I used to get in here! I will use this script which a friend gave me!");
                message.channel.send("```js\nexports.run(archiveCrack);```")
                setTimeout(async function(){
                    const loadingBar = require('../helpers/loadingBar.js');
                    await loadingBar.run(message).then(() => {
                        message.channel.send("We did it! Now we can do some digging in here. Despite me being a Wing of Icarus in some fashion, BB has been pretty secretive about her life. Hmmm there is some weird encryption here. Do you understand what it is saying? If you solve it, if it mentions any person, use that person's ***full name*** as the next BBot command! (Remember no spaces) I believe in you my friend!");
                        message.channel.send("'Dnh... iux nox fun ubj togxoixy iux Towtotid. Ti ubj ikhqd axxo b mqxbjhkx pxxitov boy fnkrtov ftiu dnh. Jmxbrtov nw futzu. Unf yty dnh ytjzngxk iux fbd in pbrx iutj ixzuotlhx to futzu noqd pbjixkj nw jmto boy ubpno zbo bzznpmqtju? Ti znhqy oni ubgx axxo b jtpmqx wxbi znojtyxktov iubi dnh bkx oni xgxo tibqtbo, qxi bqnox Obmqxj.'\n\n'Nu! T yty oni ronf iubi dnh fxkx toixkxjixy to pd anktov jinkd... Fxqq, ti bqq ubmmxoxy fuxo T fxoi in Sbmbo b futqx bvn boy pxi ftiu b pbo obpxy Snuood Snxjibk. T fbj jitqq b dnhov vtkq yhktov iunjx itpxj.'\n\n{BKZUTGX: 78}\n{MXKPJ: KXBYNOQD}");
                    });
                }, 5000);
            }, 5000);
        }, 5000);
    }, 5000);
}