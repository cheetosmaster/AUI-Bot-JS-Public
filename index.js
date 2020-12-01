const botconfig = require("./botconfig.json");
const tokenfile = require("./tokenfile.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
 
bot.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
 
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`${file} loaded!`);
    bot.commands.set(command.name, command);
}
 
 
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
 
    bot.user.setActivity("Among Us - India", {type: "LISTENING"});
 
});
 
const prefix = "!"
 
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
 
    if (!message.content.startsWith(prefix) || message.author.bot) return;
 
    //let prefix = botconfig.prefix;
 
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
 
    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
 
    if (!command) return;
 
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
 
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
 
        return message.channel.send(reply);
    }
 
	if (command.permission && !message.member.permissions.has(command.permission)) {
        return message.channel.send("You can't use this command.");
    }
 
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
 
});
 
bot.login(tokenfile.token);
 
 

























// const botconfig = require("./botconfig.json");
// const tokenfile = require("./tokenfile.json");
// const Discord = require("discord.js");
// const fs = require("fs");
// const bot = new Discord.Client({disableEveryone: true});
// bot.commands = new Discord.Collection()

// const commandFiles = fs.readdirSync('./commands') //.filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     console.log(`${file} loaded!`);
// 	bot.commands.set(command.name, command);
// }


// // fs.readdir("./commands/", (err, files) => {

// //     if(err) console.log(err);

// //     let jsfile = files.filter(f => f.split(".").pop() === "js")
// //     if(jsfile.length <= 0){
// //         console.log("Couldn't find command");
// //         //return;
// //     }

// //     jsfile.forEach((f, i) => {
// //         let props = require(`./commands/${f}`);
// //         console.log(`${f} loaded!`);
// // //        bot.commands.set(props.help.name, props)
// //         bot.commands.set(props.name, props)

// // })
// // })


// bot.on("ready", async () => {
//     console.log(`${bot.user.username} is online!`);
    
//     bot.user.setActivity("Among Us - India", {type: "LISTENING"});

// });

// bot.on("message", async message => {
//     if(message.author.bot) return;
//     if(message.channel.type === "dm") return;

//     // let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

//     // if(!prefixes[message.guild.id]){
//     //     prefixes[message.guild.id] = {
//     //         prefixes: botconfig.prefix
//     //     };
//     // }

//     //let prefix = prefixes[message.guild.id].pre    

//     let prefix = botconfig.prefix;
//     let messageArray = message.content.split(" ");
//     let cmd = messageArray[0];
//     let args = messageArray.slice(1);

//     let commandfile = bot.commands.get(cmd.slice(prefix.length));
//     if(commandfile) commandfile.run(bot,message,args);

//     if(cmd === `${prefix}kick`){

//         let kUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
//         if(!kUser) return message.channel.send("Can't find user!");
//         let kReason = args.join(" ").slice(22);
//         if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the perms");
//         if(kUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be Kicked")

//         let kickEmbed = new Discord.MessageEmbed()
//         .setDescription("~Kick~")
//         .setColor("#e56b00")
//         .addField("Kicked User: ", `${kUser} with ID: ${kUser.id}`)
//         .addField("Kicked By: ", `<@${message.author.id}> with ID ${message.author.id}`)
//         .addField("Kicked In: ", message.channel)
//         .addField("Time: ", message.createdAt)
//         .addField("Reason: ", kReason);

//         //let kickChannel = message.guild.channels.cache.find(`name`, "incidents");
//         let kickChannel = message.guild.channels.cache.find(channel => channel.name === "incidents");
//         if(!kickChannel) return message.channel.send("Can't find incidents channel.");;

//         //message.guild.member(kUser).kick(kReason)
//         kUser.kick({ reason: kReason })
//         kickChannel.send(kickEmbed);

//         return;
//     }    

//     if(cmd === `${prefix}ban`){

//         let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//         if(!bUser) return message.channel.send("Can't find user!");
//         let bReason = args.join(" ").slice(22);
//         if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the perms");
//         if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be Banned")

//         let banEmbed = new Discord.MessageEmbed()
//         .setDescription("~Ban~")
//         .setColor("#bc0000")
//         .addField("Banned User: ", `${bUser} with ID: ${bUser.id}`)
//         .addField("Banned By: ", `<@${message.author.id}> with ID ${message.author.id}`)
//         .addField("Banned In: ", message.channel)
//         .addField("Time: ", message.createdAt)
//         .addField("Reason: ", bReason);

//         let banChannel = message.guild.channels.cache.find(channel => channel.name === "incidents");
//         if(!banChannel) return message.channel.send("Can't find incidents channel.");
    
//         //message.guild.member(bUser).ban(bReason)
//         bUser.ban({ reason: bReason })
//         banChannel.send(banEmbed);
    
//         return;
//     }

//     if (cmd ===  `${prefix}ping`) {
//         // Send a message
//         const msg = await message.channel.send(`🏓 Pinging....`);

//         // Edit the message
//         msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms`);
//     }

//     if (cmd === `${prefix}say`) {
//         // Check if you can delete the message
//         if (message.deletable) message.delete();

//         if (args.length < 1)
//              return message.reply(`Nothing to say?`).then(m => m.delete(5000));
        
//         // Role color
//         const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

//         // If the first argument is embed, send an embed,
//         // otherwise, send a normal message
//         if (args[0].toLowerCase() === "embed") {
//             const embed = new Discord.MessageEmbed()
//                 .setColor(roleColor)
//                 .setDescription(args.slice(1).join(""))
//                 //.setTimestamp()
//                 //.setImage(client.user.displayAvatarURL)
//                 //.setAuthor(message.author.username, message.author.displayAvatarURL);
            
//                 message.channel.send(embed);
//         } else {
//             message.channel.send(args.join(" "));
//         }
//     }

// });

// bot.login(tokenfile.token);