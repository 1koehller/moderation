const Discord = require("discord.js")

module.exports = {
  name: "sugerir",
  description: "[🟢 User ] Faça sua sugestão.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "sugestão",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    let canal = interaction.guild.channels.cache.get("1061721180614168688")
    if (!canal) {
        interaction.reply(`Olá ${interaction.user}, o canal de sugestões ainda não foi configurado no script!`)
    } else {
        let sugestao = interaction.options.getString("sugestão");
        let embed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle("Nova sugestão!")
        .setDescription(`**Sugestão de ${interaction.user}:**\n${sugestao}`)
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        canal.send({ embeds: [embed] }).then( () => {
            interaction.reply({ content: `Olá ${interaction.user}, sua sugestão foi publicada em ${canal} com sucesso.` })
        }).catch( () => {
            interaction.reply({ content: `Ops ${interaction.user}, algo deu errado!` })
        })
    }


  }
}