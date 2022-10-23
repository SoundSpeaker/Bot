const { loadLanguages, getTranslations } = require('../../language/languageCore')

module.exports = {
  name: 'interactionCreate',
  execute (interaction) {

    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)
    const translate = getTranslations(interaction.locale)
    if (!command) return

    try {
      command.execute(interaction, translate)
    } catch (error) {
      console.error(error)
      return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }

    console.log(`${interaction.user.tag} triggered /${interaction.commandName} in #${interaction.channel.name}/${interaction.guild.name}.`)
  }
}
