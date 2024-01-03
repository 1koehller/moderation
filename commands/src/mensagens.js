const Discord = require("discord.js")
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
  name: 'mensagens',
  description: '[🟢 User ] Contador de mensagens.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: 'usuário',
        description: 'Veja a quantidade de mensagens deste usuário.',
        type: Discord.ApplicationCommandOptionType.User,
        required: false,
    }
],

  run: async (client, interaction) => {

    let user = interaction.options.getUser('usuário')
    if (!user) user = interaction.user

    let member = interaction.guild.members.cache.get(user.id)

    if (!member) {
        const embed = new Discord.EmbedBuilder()
        .setColor('#000000')
        .setDescription(`O usuário mencionado não está no servidor!`)
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        interaction.reply({ embeds: [embed] })
    } else {
        let messageCounter = await db.get(`messageCounter_${member.user.id}`)
        if (!messageCounter) messageCounter = 0

        const embed = new Discord.EmbedBuilder()
        .setColor('#000000')
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`O usuário ${member} (${member.user.id}) possui \`${messageCounter}\` mensagens neste servidor.`)
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        interaction.reply({ embeds: [embed] })
    }
  }
}