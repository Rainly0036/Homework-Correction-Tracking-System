const Discord, { MessageEmbed } = require('discord.js')
const client = new Discord.Client({
    partials: ["MESSAGE","CHANNEL","USER"],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})

client.on("messageUpdate", (oldMessage, newMessage) => {
    if (newMessage.member.user.bot) return;
    
    // CHANGE YOUR CHANNEL ID HERE
    if (newMessage.channelId === "YOUR-CHANNEL-ID") {

        var timeNow = Math.floor(new Date().getTime()/1000.0)

        // AND HERE TOO
        const channel = client.channels.cache.find(c => c.id === 'YOUR-CHANNEL-ID' && c.type === 'GUILD_TEXT');
        
        // MESSAGE THAT THE BOT ALREADY SENDED IN THAT CHANNEL
        channel.messages.fetch('BOT-MESSAGE-ID').then(msg => {
            
            let embed = new MessageEmbed()
            .setDescription(`
            **Homework Tracked since <t:${timeNow}:R>**
            `)
            .setFooter("Credit: Rainly36")
            .setColor("#6ab59a")

            msg.edit({
                content: null,
                embeds: [embed]
            })

        }).catch(err => {
            console.error(err);
        });
    }
})

client.on("messageCreate", message => {
    if (message.channel.type == "GUILD_DM" || message.author.bot) return;
    if (message.content === "$botMsg") {
        return message.channel.send({ content: "This is the message that the bot will change it in future." })
    }
})

client.login(env.botToken)