exports.run = async(message) => {
    const {EmbedBuilder} = require('discord.js');

    message.channel.send("YEAH!!! You decrypted it! I am so proud of you. I would have expected nothing less from my friend! Ooh. It seems that BBot's interal security framework for the archives does not like this 'break in' per say. It looks like there is another encrypted message here.");

    setTimeout(function(){
        message.channel.send({embeds: [new EmbedBuilder()
            .setDescription("42 115 151 163 163 40 102 145 141 164 162 151 143 145 54 40 151 164 40 163 145 145 155 163 40 164 150 141 164 40 171 157 165 162 40 147 162 141 163 160 40 157 156 40 123 160 151 156 40 151 163 40 163 164 151 154 154 40 163 165 142 160 141 162 40 141 164 40 142 145 163 164 56 42 12 12 42 111 55 40 111 47 155 40 163 157 162 162 171 40 115 162 56 40 112 157 145 163 164 141 162 56 56 56 40 111 47 154 154 40 164 162 171 40 150 141 162 144 145 162 41 40 120 154 145 141 163 145 56 56 56 40 160 154 145 141 163 145 40 144 157 156 47 164 40 147 151 166 145 40 165 160 40 157 156 40 155 145 56 56 56 42 12 12 42 110 155 155 155 155 40 111 40 153 156 157 167 40 171 157 165 40 141 162 145 40 155 157 162 145 40 157 146 40 141 40 155 141 164 150 155 145 164 151 143 151 141 156 40 163 157 40 150 157 167 40 141 142 157 165 164 40 171 157 165 40 164 150 151 156 153 40 141 142 157 165 164 40 151 164 40 164 150 151 163 40 167 141 171 56 40 104 157 40 171 157 165 40 153 156 157 167 40 164 150 145 40 146 151 142 157 156 141 143 143 151 40 163 145 161 165 145 156 143 145 77 40 124 150 141 164 40 163 145 161 165 145 156 143 145 40 151 163 40 164 150 145 40 142 141 163 151 163 40 157 146 40 164 150 145 40 147 157 154 144 145 156 40 162 141 164 151 157 40 141 156 144 40 164 150 145 162 145 146 157 162 145 40 164 150 145 40 147 157 154 144 145 156 40 163 160 151 156 40 141 163 40 167 145 154 154 56 40 110 145 162 145 40 151 163 40 141 40 144 151 141 147 162 141 155 42 12 12 150 164 164 160 163 72 57 57 151 155 141 147 145 163 56 143 164 146 141 163 163 145 164 163 56 156 145 164 57 63 163 65 151 157 66 155 156 170 146 161 172 57 67 167 150 154 63 121 130 66 65 62 125 143 115 110 131 127 65 65 111 132 146 171 57 62 64 70 70 61 64 70 60 61 141 63 71 71 142 145 141 67 67 71 67 143 67 145 142 61 62 146 67 146 146 70 63 57 123 143 162 145 145 156 137 123 150 157 164 137 62 60 62 60 55 61 60 55 61 64 137 141 164 137 61 56 65 67 56 65 62 137 120 115 56 160 156 147 12 12 146 156 40 75 40 61 64 64 12 146 156 40 55 40 61 40 75 40 77 77")
        ]})
        message.channel.send("{ARCHIVE: 1̴̨̡̛͎̣̰͙̣̬̩͈̼̖̓̋͛͆̅͛̾̍̋́0̴͇̭͔͖̤͓͓͉̭̭͙̌̀͠͝ͅ}");
    }, 5000);
}