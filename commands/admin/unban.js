const Discord = require("discord.js")

module.exports = {
  name: "unban",
  description: "[👑 ADM ] Desbanir um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "user",
        description: "Mencione um usuário para ser desbanido.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Insira um motivo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`Você não possui poermissão para utilizar este comando.`);
    } else {
        let user = interaction.options.getUser("user");
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "Não definido.";

        let embed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setDescription(`<:UgrARU4:1190652059654045736> O usuário ${user} (\`${user.id}\`) foi desbanido com sucesso!`)
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        let erro = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setDescription(`<:UgrARU4:1190652059654045736> Não foi possível desbanir o usuário ${user} (\`${user.id}\`) do servidor!`)
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        interaction.guild.members.unban(user.id, motivo).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [erro] })
        })
    }

  }
}