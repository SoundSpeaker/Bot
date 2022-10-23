const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel } = require("@discordjs/voice");
const { EmbedBuilder, SlashCommandBuilder, ChannelType } = require('discord.js')
const { colors } = require('../../config');
const db = global.db

const languages = [
    "af-ZA", "am-ET", "hy-AM", "az-AZ", "id-ID", "ms-MY", "bn-BD", "bn-IN", "ca-ES", "cs-CZ", "da-DK", "de-DE",
    "en-AU", "en-CA", "en-GH", "en-GB", "en-IN", "en-IE", "en-KE", "en-NZ", "en-NG", "en-PH", "en-SG", "en-ZA",
    "en-TZ", "en-US", "es-AR", "es-BO", "es-CL", "es-CO", "es-CR", "es-EC", "es-SV", "es-ES", "es-US", "es-GT",
    "es-HN", "es-MX", "es-NI", "es-PA", "es-PY", "es-PE", "es-PR", "es-DO", "es-UY", "es-VE", "eu-ES", "fil-PH",
    "fr-CA", "fr-FR", "gl-ES", "ka-GE", "gu-IN", "hr-HR", "zu-ZA", "is-IS", "it-IT", "jv-ID", "kn-IN", "km-KH",
    "lo-LA", "lv-LV", "lt-LT", "hu-HU", "ml-IN", "mr-IN", "nl-NL", "ne-NP", "nb-NO", "pl-PL", "pt-BR", "pt-PT",
    "ro-RO", "si-LK", "sk-SK", "sl-SI", "su-ID", "sw-TZ", "sw-KE", "fi-FI", "sv-SE", "ta-IN", "ta-SG", "ta-LK",
    "ta-MY", "te-IN", "vi-VN", "tr-TR", "ur-PK", "ur-IN", "el-GR", "bg-BG", "ru-RU", "sr-RS", "uk-UA", "he-IL",
    "ar-IL", "ar-JO", "ar-AE", "ar-BH", "ar-DZ", "ar-SA", "ar-IQ", "ar-KW", "ar-MA", "ar-TN", "ar-OM", "ar-PS",
    "ar-QA", "ar-LB", "ar-EG", "fa-IR", "hi-IN", "th-TH", "ko-KR", "zh-TW", "yue-Hant-HK", "ja-JP", "zh-HK", "zh"
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setguildlanguage')
        .setDescription('Sets Guild language.')
        .addStringOption((option) =>
            option.setName("language")
                .setDescription("Enter language. Default: en")
        ),
    async execute(interaction, translate) {

        const lang = interaction.options.getString('language');
        db.set(`voice-${interaction.user.id}.language`, lang);

        if (languages.some(i => i.includes(lang))) {
            const success = new EmbedBuilder()
                .setTitle("Success")
                .setDescription("Guild voice language has been set to `" + lang + "`.")
                .setColor(colors.green)
                .setTimestamp()
            return interaction.reply({ embeds: [success], ephemeral: true })
        } else {
            const error = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("`" + lang + "` is not a language.")
            .setColor(colors.red)
            .setTimestamp()
        return interaction.reply({ embeds: [error], ephemeral: true }) 
        }



    }
}