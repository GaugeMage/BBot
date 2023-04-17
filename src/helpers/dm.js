exports.run = async(client, message, args) => {
    let user = args[0];

    if(user[0] === '<' && user[user.length - 1] === '>'){
        user = user.substring(2, user.length - 1);
    }

    //Send a dm to the user which is the message content
    // client.users.cache.get(user).send(args.slice(1).join(' '));
    client.users.fetch(user).then(user => {
        user.send(args.slice(1).join(' '));
    });
}