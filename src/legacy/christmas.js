exports.run = async(message) => {
    //Picks one of a couple christmas gifs to send
    const gifs = [
        'https://tenor.com/view/holly-logan-santa-christmas-time-holiday-spirit-holiday-sweater-gif-23834833',
        'https://tenor.com/view/christmas-eve-merry-christmas-gif-24247588',
        'https://image.myanimelist.net/ui/5LYzTBVoS196gvYvw3zjwE82LN9SwxyeLK98vBNkfcU',
        'https://tenor.com/view/anime-christmas-denki-gai-sensei-master-gif-21011047',
        'https://tenor.com/view/reasonsimbroke-christmas-happy-holidays-merry-christmas-pokemon-gif-24249497',
        'https://tenor.com/view/happy-gif-24244592', 
        'https://tenor.com/view/cat-christmas-flying-xmas-cat-gif-24247775',
        'https://v5a5f8p9.stackpathcdn.com/wp-content/uploads/2020/12/fairy-tail-christmas.gif',
        'https://animeshelter.com/wp-content/uploads/2017/11/giphy6.gif',
        'https://tenor.com/view/santa-anime-strong-gif-7412680',
        'https://i.kym-cdn.com/photos/images/original/002/372/310/8ee.gif',
        'https://static.wikia.nocookie.net/393e6109-a28e-4e02-8527-437f08b86981/scale-to-width/370',
        'https://tenor.com/view/brave-exkaiser-yuusha-exkaiser-santa-father-christmas-centaur-gif-26132549',
        'https://tenor.com/view/christmas-anime-present-gif-15863476',
        'https://tenor.com/view/anime-christmas-blink-pretty-gif-15911231'
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    message.channel.send(randomGif);
}