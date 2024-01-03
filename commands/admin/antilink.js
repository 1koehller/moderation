const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB();

module.exports = {
  name: "antilink",
  description: "[👑 ADM ] Ative ou desativee o sistema de antilink no servidor.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let embed_g = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setDescription(`<:UgrARU4:1190652059654045736> Olá ${interaction.user}, o sistema de antilink do servidor foi \`ativado\`.`)
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        let embed_r = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setDescription(`<:UgrARU4:1190652059654045736> Olá ${interaction.user}, o sistema de antilink do servidor foi \`desativado\`.`)
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        let confirm = await db.get(`antilink_${interaction.guild.id}`);

        if (confirm === null || confirm === false) {
            interaction.reply({ embeds: [embed_g] })
            await db.set(`antilink_${interaction.guild.id}`, true)
        } else if (confirm === true) {
            interaction.reply({ embeds: [embed_r] })
            await db.set(`antilink_${interaction.guild.id}`, false)
        }
    }

  }
}