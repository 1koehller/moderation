const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  name: "avatar",
  description: "[🟢 User ] Mostra o avatar de alguém ou o seu.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'user',
      description: 'O usuário que deseja ver o avatar.',
      type: ApplicationCommandOptionType.User,
      required: false,
    }
  ],

  run: async (client, interaction) => {
        let user = interaction.options.getUser('user');
        if (!user) user = interaction.user;

        const replyEmbed = new EmbedBuilder()
            .setColor("#000000")
            .setTitle(`${user.username}`)
            .setImage(user.avatarURL())
            .setTimestamp()
            .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        const viewer = new ButtonBuilder()
            .setLabel('Abrir foto')
            .setURL(user.avatarURL({dynamic: true, size: 2048}))
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(viewer);

        await interaction.reply({embeds: [replyEmbed], components: [row]});

      }
}