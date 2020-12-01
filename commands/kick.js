const Discord = require("discord.js");
 
module.exports = {
    name: 'kick',
    aliases: [],
    permission: [ "KICK_MEMBERS" ],
    description: 'Tag a member and kick them (but not really).',
    args: true,
    usage: "<Mention or User ID {Reason}>",
    execute(message, args) {
        let kUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        //if(!kUser) return message.channel.send("Couldn't find User..");
        let kReason = args.slice(1).join(" ");
 
        const reportEmbed = new Discord.MessageEmbed()
            .setDescription("Kick!")
            .setColor("#15f153")
            .addField("Kicked User: ", `${kUser} with ID: ${kUser.id}`)
            .addField("Kicked By: ", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel: ", message.channel)
            .addField("Time: ", message.createdAt)
            .addField("Reason: ", kReason);             
    
        let reportsChannel = message.guild.channels.cache.find(channel => channel.name === "aui-reports");
        if(!reportsChannel) return message.channel.send("Can't find aui-reports channel.");
 
        message.delete();
        reportsChannel.send(reportEmbed);

        kUser.kick({ reason: kReason})

    }
};