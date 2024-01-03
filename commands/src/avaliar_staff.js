const Discord = require("discord.js")

module.exports = {
  name: 'avaliar_staff',
  description: '[🟢 User ] Avalie um staff do servidor.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: 'staff',
        description: 'Qual o staff que você deseja avaliar?',
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: 'estrelas',
        description: 'Dê uma nota de 0 a 5 estrelas para o staff escolhido.',
        type: Discord.ApplicationCommandOptionType.Number,
        required: true,
    },
    {
        name: 'descrição',
        description: 'Descreva sua experiência com o staff escolhido.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    const staffRoleID = '1056397485603565619'
    const channelLogID = '1061721180614168688'
    const staffMember_Verification = interaction.options.getUser('staff')
    const staffMember = interaction.guild.members.cache.get(staffMember_Verification.id)
    const stars = interaction.options.getNumber('estrelas')
    const description = interaction.options.getString('descrição')

    function avaliarStaff(user, estrelas, desc) {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setColor('#000000')
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`><:990307714217414666:1188492725385961492> O membro ${interaction.user} (${interaction.user.id}) enviou uma avaliação.`)
        .addFields(
            {
                name: `> <:UgrARU4:1190652059654045736> Staff`,
                value: `${user} (${user.user.id})`,
                inline: false
            },
            {
                name: `> <:1099786144532664501:1190726037961703454> Estrelas`,
                value: `\`${estrelas}/5 Estrelas\``,
                inline: false
            },
            {
                name: `> <:999075969920929893:1188492750144933898> Descrição`,
                value: `${desc}`,
                inline: false
            }
        )
        try {
            interaction.guild.channels.cache.get(channelLogID).send({ embeds: [embed] }).then( () => {
                interaction.reply({ ephemeral: true, content: `Sucesso, sua avaliação foi enviada!\nDados:\n\`\`\`\n- [<:UgrARU4:1190652059654045736>] Staff: ${user.user.username} (${user.user.id})\n- [<:1099786144532664501:1190726037961703454>] Estrelas: ${estrelas}/5\n- [<:999075969920929893:1188492750144933898>] Descrição: ${desc}\n\`\`\`` })
            })
        } catch (err) {
            interaction.reply({ ephemeral: true, content: `Algo deu errado: \`\`\`\n${err}\n\`\`\`` })
        } 
    }

    if (!interaction.guild.roles.cache.get(staffRoleID)) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: O cargo de staff não existe ou foi configurado incorretamente.' })
    }
    else if (!interaction.guild.channels.cache.get(channelLogID)) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: O canal de logs não existe ou foi configurado incorretamente.' })
    }
    else if (!staffMember) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: O usuário mencionado não está no servidor.' })
    }
    else if (!staffMember.roles.cache.get(staffRoleID)) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: O usuário mencionado não é da staff.' })
    }
    else if (stars < 1 || stars > 5) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: Você só pode colocar estrelas de 1 a 5.' })
    }
    else {
        avaliarStaff(staffMember, stars, description)
    }
  }
}