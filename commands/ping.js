module.exports = {
    name: 'ping',
    aliases: [],
    description: 'Tag a member and kick them (but not really).',
    args: false,
    usage: "<Mention or User ID {Reason}>",
    async execute(message, args) {
        //Send a message
        const msg = await message.channel.send(`🏓 Pinging....`);

        // Edit the message
        msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms`);
    }
}