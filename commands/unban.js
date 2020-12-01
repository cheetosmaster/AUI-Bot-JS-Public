const { Client } = require("discord.js");

module.exports = {
    name: 'unban',
    aliases: [],
    description: 'Tag a member and kick them (but not really).',
    args: true,
    usage: "<Mention or User ID {Reason}>",
    async execute(message, args) {
        let toBan = await Client.users.cache.fetch(args[0])

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!") 
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot need permissions!") 

        const reason = args[1] || "There was no reason!";

        message.guild.members.unban(toBan, reason)

        message.channel.send(`${toBan} has been unbanned from the server!`)
    }
}