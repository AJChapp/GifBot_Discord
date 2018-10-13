require("dotenv").config();
const keys = require(`./keys.js`)
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request')


client.login(keys.bot.botToken)


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    // function Declaration
    const sendPic = function (file) {
        msg.channel.send(new Discord.Attachment(`./Assets/${file}`))
            .catch(console.error);
    }

    const gifGenerator = function (search) {
        console.log(search)
        const APIkey = '&api_key=' + 'dc6zaTOxFJmzC&tag';
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${search + APIkey}&limit=1`
        request(queryURL, function (err, response, body) {
            if (err) throw err
            const results = JSON.parse(body)
            const gifURL = results.data[0].images.fixed_height.url
            msg.channel.send(gifURL)
                .catch(console.error);
        });
    }


    if (msg.content.includes('{') && msg.content.includes('}')) {
        const note = msg.content;
        const start = msg.content.indexOf('{') + 1;
        const end = msg.content.indexOf('}');
        const commandArray = [];
        for (let i = start; i < end; i++) {
            if(note[i]==" "){
                commandArray.push('+')
            }
            else{
                commandArray.push(note[i])
            }
        }
        const command = commandArray.join('')

        switch (command) {
            case msg.content.includes('{'): {
            }

            case "cactus": {
                return sendPic('cactus.jpg')

            }

            case "pout": {
                return sendPic('astolfoPout.gif')
            }

            default :{
               return gifGenerator(command)
            }
        }
    }
});


// var search = ''
//     if (process.argv.length > 4) {
//         for (i = 3; i < process.argv.length; i++) {
//             if (i == process.argv.length - 1) {
//                 search += process.argv[i]

//             }
//             else {

//                 search += process.argv[i] + ' '
//             }
//         }
//     }