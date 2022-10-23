const { GatewayIntentBits, OAuth2Scopes } = require('discord.js')

module.exports = {
    bot: {
        token: "",
        appId: "",
        guildId: "",
        ownerId: "",
        handlerMode: "Global", 
        intents: [
            GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution 
        ],
        scopes: [
            OAuth2Scopes.Bot, 
            OAuth2Scopes.ApplicationsCommands,
        ]
    },
    
    colors: { 
       red: "#B11C25",
       green: "#1bed0c",
       orange: "#e69138",
       blue: "#0f7ccf",
       gray: "#999999",
       white: "#ffffff",
    },
}