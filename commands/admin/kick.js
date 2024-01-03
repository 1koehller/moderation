const Discord = require("discord.js")

module.exports = {
  name: "kick",
  description: "[👑 ADM ] Expulse um membro do servidor.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "membro",
        description: "Mencione um membro.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Descreva o motivo da expulsão.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, epemeral: true })
    } else {
        const user = interaction.options.getUser("membro")
        const membro = interaction.guild.members.cache.get(user.id)

        let motivo = interaction.options.getString("motivo")
        if (!motivo) motivo = "Não informado"

        let embed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setDescription(`<:UgrARU4:1190652059654045736> O usuário ${membro} foi expulso com sucesso!\n\n> Motivo: \`${motivo}\`.`)
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        let embed_erro = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setDescription(`<:UgrARU4:1190652059654045736> O usuário ${membro} não foi expulso do servidor!\nHouve um erro na hora de executar este comando, por favor tente novamente.`)
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        membro.kick(motivo).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [embed_erro] })
        })
    }


  }
}