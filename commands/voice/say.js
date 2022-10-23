const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel } = require("@discordjs/voice");
const { EmbedBuilder, SlashCommandBuilder, ChannelType } = require('discord.js')
const { colors } = require('../../config');
const { VoiceCore } = require('../../handlers/VoiceCore')
const tts = new VoiceCore();
let audioPlayer = new AudioPlayer();
let voiceConnection;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Joins voice channel.')
    .addStringOption((option) => option.setName("text").setDescription("Enter text which is bot going to read. Example: en").setRequired(true))
    .addStringOption((option) => 
             option.setName("language")
                   .setDescription("Enter language. Default: en")
                   ),

  async execute (interaction, translate) {

    const str = interaction.options.getString("text");
    const lang = interaction.options.getString("language") || "en"

    if(str.length >= 200) {
        const error = new EmbedBuilder()
          .setTitle('Error')
          .setDescription("you cannot say longer than 200 characters.")
          .setColor(colors.red)
          .setTimestamp()
        return interaction.reply({ embeds: [error], ephemeral: true })
    }

    const stream = await tts.getVoiceStream(`${interaction.user.username} Said, ${str}`, { lang: db.get(`voice-${interaction.user.id}.language`) || db.get(`voice-${interaction.guild.id}.language`) || "en" })
    const audioResource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume:true })

    if(!voiceConnection || voiceConnection?.status === VoiceConnectionStatus.Disconnected){
        voiceConnection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
    }
    


    if(voiceConnection.status===VoiceConnectionStatus.Connected){
        voiceConnection.subscribe(audioPlayer);
        audioPlayer.play(audioResource);
    }

    const success = new EmbedBuilder()
     .setTitle('success')
     .setDescription('Your interaction now playing...')
     .setColor(colors.green)
     .setTimestamp()
    return interaction.reply({ embeds: [success], ephemeral: true })
 }
}