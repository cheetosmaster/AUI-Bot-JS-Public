const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that..");
    let wUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!wUser) return message.reply("Couldn't find the User..");
    let warnlevel = warns[wUser.id].warns;

    message.reply(`<@${wUser.id}> has ${warnlevel} warning(s)..`)

}

module.exports.help = {
    name: "warnlevel"
}