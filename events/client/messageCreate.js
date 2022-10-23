const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel } = require("@discordjs/voice");
const { VoiceCore } = require('../../handlers/VoiceCore');
let audioPlayer = new AudioPlayer();
const tts = new VoiceCore();
const db = global.db;
let voiceConnection;

module.exports = {
    name: 'messageCreate',
    async execute (message) {
      if(message.author.bot) return

      if(db.get(`textchannel-${message.guild.id}.channel`) && db.get(`textchannel-${message.guild.id}.enabled`) === true) {
       if(db.get(`textchannel-${message.guild.id}.channel`) !== message.channel.id) return;
       if(message.content.length >= 200) return
 
        const stream = await tts.getVoiceStream(`${message.author.username} Said, ${message.content}`, { lang: db.get(`voice-${message.author.id}.language`) || db.get(`voice-${message.guild.id}.language`) || "en" })
        const audioResource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume:true })
    
        if(!voiceConnection || voiceConnection?.status === VoiceConnectionStatus.Disconnected){
            voiceConnection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
        }
        
        if(voiceConnection.status===VoiceConnectionStatus.Connected){
            voiceConnection.subscribe(audioPlayer);
            audioPlayer.play(audioResource);
        }
        
      } else return
    }
  }
  