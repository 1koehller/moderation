const Discord = require("discord.js")

module.exports = {
  name: "userinfo",
  description: "[🟢 User ] Veja informações de um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuário",
        description: "Mencione um usuário.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    }
],

  run: async (client, interaction) => {

    let user = interaction.options.getUser("usuário");
    let data_conta = user.createdAt.toLocaleString();
    let id = user.id;
    let tag = user.tag;
    let is_bot = user.bot;

    if (is_bot === true) is_bot = "Sim";
    if (is_bot === false) is_bot = "Não";

    let embed = new Discord.EmbedBuilder()
    .setColor("#000000")
    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setTitle("Informações do Usuário:")
    .addFields(
        {
            name: `<:990307714217414666:1188492725385961492>  Tag:`,
            value: `\`${tag}\`.`,
            inline: false
        },
        {
            name: `<:999075935624102040:1188492743417282560>  Id:`,
            value: `\`${id}\`.`,
            inline: false
        },
        {
            name: `<:123324523452652345:1188492704397672569>  Criação da conta:`,
            value: `\`${data_conta}\`.`,
            inline: false
        },
        {
            name: `<:989614012020953218:1188492715311247360> É um bot?`,
            value: `\`${is_bot}\`.`,
            inline: false
        }
    );

    let botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setURL(user.displayAvatarURL({ dynamic: true }))
        .setEmoji("📎")
        .setStyle(Discord.ButtonStyle.Link)
        .setLabel(`Avatar de ${user.username}.`)
        
    )

    interaction.reply({ embeds: [embed], components: [botao] })


    
  }
}