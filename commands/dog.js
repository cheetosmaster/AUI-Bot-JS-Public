const Discord = require("discord.js");
const superagent = require("superagent");

// module.exports.run = async (bot, message, args) => {

//     let {body} = await superagent 
//     .get(`https://random.dog/woof.json`);

//     let dogembed = new Discord.MessageEmbed()
//     .setColor("#ff9900")
//     .setTitle("Doggo!")
//     .setImage(body.url);

// message.channel.send(dogembed)

// }

// module.exports.help = {
//     name: "dog"
//}




module.exports = {
    name: 'dog',
    aliases: [],
    permission: "MUTE_MEMBERS",
    description: 'Tag a member and kick them (but not really).',
    args: false,
    usage: "<Mention or User ID {Reason}>",
    async execute(message, args) {
        let {body} = await superagent 
        .get(`https://random.dog/woof.json`);

        let dogembed = new Discord.MessageEmbed()
        .setColor("#ff9900")
        .setTitle("Doggo!")
        .setImage(body.url);

    message.channel.send(dogembed)
    }
}