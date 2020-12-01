const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let {body} = await superagent 
    .get(`http://aws.random.cat/meow.php`);

    let dogembed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Cat!")
    .setImage(body.url);

message.channel.send(dogembed)

}

module.exports.help = {
    name: "cat"
}