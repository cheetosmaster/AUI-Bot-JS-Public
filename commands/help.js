const Discord = require("discord.js");

module.exports = {
    name: 'help',
    aliases: [],
    description: 'Tag a member and kick them (but not really).',
    args: false,
    usage: "<Mention or User ID {Reason}>",
    execute(message, args) {
        // Your code
    let helpEmbed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Help Centre!")
    .addField("Prefix is `!`", "This can be changed though.. ")
    .addField("!help", "This command drops you here")
    .addField("!ping", "Use this to check my ping, however ik u don't really care what the ping is so just use it to check if im responding or not")
    .addField("!ban", "Use this command to ban a player")
    .addField("!warn", "Use this command to warn a player, this logs a warn for the user which keeps piling up.. ")
    .addField("!report", "Use this command to report any player in this server, Staff will look into it..")
    .addField("!say" , "Use this command to echo a message through me :wink: ")
    .addField("!dog", "Feeling low? Get checked up by a cute dog :dog: ")
    .addField("!invite", "Get this server's invite link!");
    
    message.channel.send(helpEmbed);

    }
}