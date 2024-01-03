const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const config = require('../../config.json')
const moment = require('moment-timezone');

module.exports = {
  name: "reportar",
  description: "[🟢 User ] Reporte um bug do bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "bug",
      description: "Digite sobre o bug",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "link",
      description: "digite o link de uma imagem do bug",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "imagem",
      description: "Envie uma imagem do bug",
      type: ApplicationCommandOptionType.Attachment,
      required: false,
    }
  ],

  run: async (bot, interaction) => {
    const bug = interaction.options.getString("bug");
    const link = interaction.options.getString("link");
    const img = interaction.options.getAttachment("imagem");
    const user = interaction.user;
      
      const embed = new EmbedBuilder()
        .setColor("#000000")
        .setTitle(`❌ |  Novo Bug descoberto!`)
        .addFields(
            {
                name: '⭐ | Denunciante:',
                value: `\`\`\`${interaction.user.username}\`\`\``,
                inline: false
            },
            {
                name: '🚧 | Bug denunciado:',
                value: `\`\`\`${bug}\`\`\``,
                inline: true
            },
            {
                name: '🕐 | Data de emissão',
                value: `\`\`\`${moment().utc().tz('America/Sao_Paulo').format('DD/MM/Y - HH:mm:ss')}\`\`\``
            },
        )
      if(link) {
        embed.setImage(link);
      }

      if(img) {
        embed.setImage(img.url);
      }
      try {
        await bot.channels.cache
          .get(config.log_servidor)
          .send({ embeds: [embed] });
        await interaction.reply({
          content: "Bug reportado com sucesso!",
          ephemeral: true,
        });
      } catch(error) {
        console.error(error);
        await interaction.reply({
          content:
            "Houve um erro ao enviar seu relatório. Tente novamente mais tarde.",
          ephemeral: true,
        });
      }


    }
}