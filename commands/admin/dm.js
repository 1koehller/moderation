const Discord = require("discord.js")

module.exports = {
  name: "dm",
  description: "[👑 ADM ] Envie uma mensagem no privado de um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuário",
        description: "Mencione um usuário.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "mensagem",
        description: "Escreva algo para ser enviado.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando!`, ephemeral: true })
    } else {
        let user = interaction.options.getUser("usuário");
        let msg = interaction.options.getString("mensagem");

        let embed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${msg}`);

        user.send({ embeds: [embed] }).then( () => {
            let emb = new Discord.EmbedBuilder()
            .setColor("#000000")
            .setDescription(`<:UgrARU4:1190652059654045736> Olá ${interaction.user}, a mensagem foi enviada para ${user} com sucesso!`)
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTimestamp()
            .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

            interaction.reply({ embeds: [emb] })
        }).catch(e => {
            let emb = new Discord.EmbedBuilder()
            .setColor("#000000")
            .setDescription(`<:UgrARU4:1190652059654045736> Olá ${interaction.user}, a mensagem não foi enviada para ${user}, pois o usuário está com a DM fechada!`)
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTimestamp()
            .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

            interaction.reply({ embeds: [emb] })
        })
    }


  }
}