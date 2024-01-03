const Discord = require("discord.js")

module.exports = {
  name: '', // nome do comando
  description: '', // descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: '',
        description: '',
        type: Discord.ApplicationCommandOptionType,
        required: true,
    }
],

  run: async (client, interaction) => {

    // cod
    
  }
}