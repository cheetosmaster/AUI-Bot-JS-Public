const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: 'warn',
    aliases: [],
    description: 'Tag a member and kick them (but not really).',
    args: true,
    usage: "<Mention or User ID {Reason}>",
    async execute(message, args) {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("You do not have the perms..");
    let wUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!wUser) return message.reply("Couldn't find the User..")
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("That person is a Staff member and moreover they're cool! I dont feel like disturbing them..");
    let reason = args.join(" ").slice(22);


    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new Discord.MessageEmbed()
    .setDescription("Warn!")
    .setColor("#fc6400")
    .addField("Warned User: ", `${wUser} with ID: ${wUser.id}`)
    .addField("Warned By: ", `${message.author} with ID: ${message.author.id}`)
    .addField("Warned In: ", message.channel)
    .addField("Number of Warns: ", warns[wUser.id].warns)
    .addField("Reason: ", reason)
    .addField("Time: ", message.createdAt);

    let warnchannel = message.guild.channels.cache.find(channel => channel.name === "aui-warn-logs");
    if(!warnchannel) return message.channel.send("Can't find aui-warn-logs channel.");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 1){
        //const warnEmbed1 = new Discord.MessageEmbed()
        //.addField(`<@${wUser}> has been warned & the warn has been logged under <#781464225343995934> [next warn will result in a 2hrs Mute]`)
        //message.channel.send(warnEmbed1)
        message.channel.send(`${wUser} has been warned & the warn has been logged under <#781464225343995934> [next warn will result in a 2hrs Mute]`)
        wUser.send(`You have been Warned in Among Us - India, Reason: ${reason}. The next warn would result you being muted for 2hrs`)    
    }

    if(warns[wUser.id].warns == 2){
        let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if(!muterole) return message.reply("There's no role called Muted");

        let mutetime = "7200s";
        await wUser.roles.add(muterole.id)
        message.channel.send(`<@${wUser.id}> has been muted for 2hrs & the warn has been logged under <#781464225343995934> [next warn will result to a 6hrs Mute]`);
        wUser.send(`You have been Warned in Among Us - India, Reason: ${reason}. The next warn would result you being muted for 6hrs`)    
        setTimeout(function(){
            wUser.roles.remove(muterole.id)
            message.channel.send(`<@${wUser.id}> has been Unmuted.`)
        }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 3){
        let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if(!muterole) return message.reply("There's no role called Muted");

        let mutetime = "21600s";
        await wUser.roles.add(muterole.id)
        message.channel.send(`<@${wUser.id}> has been muted for 6hrs & the warn has been logged under <#781464225343995934> [next warn will result to a 12hrs Mute]`);
        wUser.send(`You have been Warned in Among Us - India, Reason: ${reason}. The next warn would result you being muted for 12hrs`)    
        setTimeout(function(){
            wUser.roles.remove(muterole.id)
            message.channel.send(`<@${wUser.id}> has been Unmuted.`)
        }, ms(mutetime))
   }
    if(warns[wUser.id].warns == 4){
        let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if(!muterole) return message.reply("There's no role called Muted");

        let mutetime = "43200s";
        await wUser.roles.add(muterole.id)
        message.channel.send(`<@${wUser.id}> has been muted for 12hrs and the warn has been logged under <#781464225343995934> [next warn will result to a BAN!]`);
        wUser.send(`You have been Warned in Among Us - India, Reason: ${reason}. The next warn would result you being Banned from the server`)    
        setTimeout(function(){
            wUser.roles.remove(muterole.id)
            message.channel.send(`<@${wUser.id}> has been Unmuted.`)
       }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 5){
    //message.member(wUser).ban(reason);
    wUser.ban({ reason: reason})
    message.channel.send(`<@${wUser.id}> has been Banned!`)
    wUser.send(`You have been Banned from Among Us - India for completing 5 warns, Reason: ${reason}`)
    }
    }
}