const Discord = require("discord.js");

module.exports = {
    name: 'say',
    aliases: [],
    description: 'Tag a member and kick them (but not really).',
    permission: [ "MANAGE_ROLES" ],
    args: true,
    usage: "<text> || or you can also use :say embed <text> to send an embed message.",
    execute(message, args) {
        //Check if you can delete the message
        if (message.deletable) message.delete();

        if (args.length < 1)
             return message.reply(`Nothing to say?`).then(m => m.delete(5000));
        
        // Role color
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        // If the first argument is embed, send an embed,
        // otherwise, send a normal message
        if (args[0].toLowerCase() === "embed") {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(""))
                //.setTimestamp()
                //.setImage(client.user.displayAvatarURL)
                //.setAuthor(message.author.username, message.author.displayAvatarURL);
            
                message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}