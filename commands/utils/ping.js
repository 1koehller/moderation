const Discord = require("discord.js")

module.exports = {
  name: "ping",
  description: "[🟢 User ] Veja o ping do bot.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let ping = client.ws.ping;

    let embed_1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`<:UgrARU4:1190652059654045736> Olá ${interaction.user}, meu ping está em \`calculando...\`.`)
    .setColor("#000000")
    .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
    .setTimestamp()
    .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

    let embed_2 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`<:UgrARU4:1190652059654045736> Olá ${interaction.user}, meu ping está em \`${ping}ms\``)
    .setColor("#000000")
    .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
    .setTimestamp()
    .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

    interaction.reply({ embeds: [embed_1] }).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2] })
        }, 2000)
    })
  }
}