const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel } = require("@discordjs/voice");
const { EmbedBuilder, SlashCommandBuilder, ChannelType } = require('discord.js')
const { colors } = require('../../config');
const db = global.db

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setchannel')
    .setDescription('sets channel which every written message will be readed.')
    .addChannelOption((option) => option.setName("channel").setDescription("Enter Text channel.").setRequired(true)),
    
  async execute (interaction, translate) {

    const channel = interaction.options.getChannel("channel")

    if(channel.type !== ChannelType.GuildText) {
        const error = new EmbedBuilder()
        .setTitle(translate("setChannel.errorTitle"))
        .setDescription(translate("setChannel.errorNotATextChannel").replace("{{channel}}", `<#${channel.id}>`))
        .setColor(colors.red)
        .setTimestamp()
       return interaction.reply({ embeds: [error], ephemeral: true });
    }

    if(channel) {

        db.set(`textchannel-${interaction.guild.id}.channel`, channel.id)
        db.set(`textchannel-${interaction.guild.id}.enabled`, true)

      const success = new EmbedBuilder()
        .setTitle(translate("setChannel.successTitle"))
        .setDescription(translate("setChannel.successDescription").replace("{{channel}}", `<#${channel.id}>`))
        .setColor(colors.green)
        .setTimestamp()
      return interaction.reply({ embeds: [success] })

    } else {
        const error = new EmbedBuilder()
         .setTitle(translate("setVhannel.errorTitle"))
         .setDescription(translate("setChannel.errorNoChannelFound"))
         .setColor(colors.red)
         .setTimestamp()
        return interaction.reply({ embeds: [error], ephemeral: true });
    }
  }
}