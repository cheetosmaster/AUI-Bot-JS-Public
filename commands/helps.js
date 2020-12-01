const Discord = require("discord.js");

module.exports.run = async (bot, message) => {

    let helpEmbed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Help Centre!")
    .addField("Prefix is `:`")
    .addField(" help: This command drops you here");

message.channel.send(helpEmbed)

}

module.exports.help = {
    name: "help"
}