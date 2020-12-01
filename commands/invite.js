module.exports = {
    name: 'invite',
    aliases: [],
    permission:"MUTE_MEMBERS",
    description: 'Tag a member and kick them (but not really).',
    args: false,
    usage: "<Mention or User ID {Reason}>",
    execute(message, args) {
        message.channel.send("discord.gg/amongusindia")
    }
}