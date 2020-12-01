// const Discord = require("discord.js");

// module.exports.run = async (bot, message, args) => {

//     if(!args[2]) return message.reply("Please ask a full question!")
//     let replies = ["Yes.", "No"];

//     let result = Math.floor((Math.random() * replies.length))
//     let question = args.slice(1).join(" ");

//     let ballembed = new Discord.MessageEmbed()
//     .setAuthor(message.author.tag)
//     .setColor("#ff9900")
//     .addField("Quesiton", question)
//     .addField("Answer", replies[result]);

//     message.channel.send(ballembed);

// }

// module.exports.help = {
//     name: "ama"
// }