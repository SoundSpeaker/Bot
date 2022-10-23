const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel } = require("@discordjs/voice");
const { EmbedBuilder, SlashCommandBuilder, ChannelType } = require('discord.js')
const { colors } = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Joins voice channel.')
    .addChannelOption((option) => option.setName("channel").setDescription("Enter voice channel.").setRequired(true)),
    
  async execute (interaction, translate) {

    const channel = interaction.options.getChannel("channel")

    if(channel.type !== ChannelType.GuildVoice) {
        const error = new EmbedBuilder()
        .setTitle(translate("joinChannel.errorTitle"))
        .setDescription(translate("joinChannel.errorNotAVoiceChannel").replace("{{channel}}", `<#${channel.id}>`))
        .setColor(colors.red)
        .setTimestamp()
       return interaction.reply({ embeds: [error], ephemeral: true });
    }

    if(channel) {

      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });   

      const success = new EmbedBuilder()
        .setTitle(translate("joinChannel.successTitle"))
        .setDescription(translate("joinChannel.successDescription").replace("{{channel}}", `<#${channel.id}>`))
        .setColor(colors.green)
        .setTimestamp()
      return interaction.reply({ embeds: [success] })

    } else {
        const error = new EmbedBuilder()
         .setTitle(translate("joinVhannel.errorTitle"))
         .setDescription(translate("joinChannel.errorNoChannelFound"))
         .setColor(colors.red)
         .setTimestamp()
        return interaction.reply({ embeds: [error], ephemeral: true });
    }
  }
}