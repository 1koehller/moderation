const Discord = require("discord.js");
const { link } = require("fs");

module.exports = {
  name: "serverinfo",
  description: "[🟢 User ] Envia as informações do atual servidor.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const nome = interaction.guild.name;
    const id = interaction.guild.id;
    const icon = interaction.guild.iconURL({ dynamic: true });
    const membros = interaction.guild.memberCount;

    const criacao = interaction.guild.createdAt.toLocaleDateString("pt-br");
    
    const canais_total = interaction.guild.channels.cache.size;
    const canais_texto = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildText).size;
    const canais_voz = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildVoice).size;
    const canais_categoria = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildCategory).size;

    const color = "#000000";

    const embed1 = new Discord.EmbedBuilder()
    .setColor("#000000")
    .setAuthor({ name: nome, iconURL: icon })
    .setThumbnail(icon)
    .addFields(
        {
            name: `<:990307714217414666:1188492725385961492> Nome:`,
            value: `\`${nome}\``,
            inline: true
        },
        {
            name: `<:999075935624102040:1188492743417282560> ID:`,
            value: `\`${id}\``,
            inline: true
        },
        {
            name: `<:123324523452652345:1188492704397672569> Membros:`,
            value: `\`${membros}\``,
            inline: true
        },
        {
            name: `<:990307739290976276:1188492735913664542> Criação:`,
            value: `\`${criacao}\``,
            inline: true
        },
        {
            name: `<:990307739290976276:1188492735913664542> Canais Totais:`,
            value: `\`${canais_total}\``,
            inline: true
        },
        {
            name: `<:999075935624102040:1188492743417282560> Canais de Texto:`,
            value: `\`${canais_texto}\``,
            inline: false
        },
        {
            name: `<:999075933073969173:1188492741194297344> Canais de Voz:`,
            value: `\`${canais_voz}\``,
            inline: false
        },
        {
            name: `<:999075935624102040:1188492743417282560> Categorias:`,
            value: `\`${canais_categoria}\``,
            inline: false
        }
        
    );

    const botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setURL(icon)
        .setLabel("Ícone do servidor")
        .setStyle(Discord.ButtonStyle.Link)
        
    )

    interaction.reply({ embeds: [embed1], components: [botao] })
  }
}