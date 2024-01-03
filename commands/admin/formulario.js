const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "formulário",
  description: "[👑 ADM ] Abra o painel do formulário para os membros.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal_formulário",
        description: "Canal para enviar o formulário para os membros.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
    {
        name: "canal_logs",
        description: "Canal para enviar as logs dos formulários recebidos.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        const canal_formulario = interaction.options.getChannel("canal_formulário")
        const canal_logs = interaction.options.getChannel("canal_logs")

        if (canal_formulario.type !== Discord.ChannelType.GuildText) {
            interaction.reply({ content: `O canal ${canal_formulario} não é um canal de texto.`, ephemeral: true })
        } else if (canal_logs.type !== Discord.ChannelType.GuildText) {
            interaction.reply({ content: `O canal ${canal_logs} não é um canal de texto.`, ephemeral: true })
        } else {
            await db.set(`canal_formulario_${interaction.guild.id}`, canal_formulario.id)
            await db.set(`canal_logs_${interaction.guild.id}`, canal_logs.id)

            let embed = new Discord.EmbedBuilder()
            .setDescription("Random")
            .setColor('#000000')
            .setTitle("**> <:1099786144532664501:1190726037961703454> Canais Configurados!**")
            .setDescription(`> <:999075935624102040:1188492743417282560> Canal do Formulário: ${canal_formulario}.\n> <:999075935624102040:1188492743417282560> Canal de Logs: ${canal_logs}.`)

            interaction.reply({ embeds: [embed], ephemeral: true }).then( () => {
                let embed_formulario = new Discord.EmbedBuilder()
                .setColor("#000000")
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setImage("https://cdn.discordapp.com/icons/1019199534917754911/4ab479758508933e4e2ca5ec13210e87.webp")
                .setTitle(`<:1099786144532664501:1190726037961703454> Formulário pra ingressar em nossa equipe!`)
                .setDescription(`Caso queira virar um membro da equipe preencha o \`formulario\` \n \n *> <:UgrARU4:1190652059654045736> Requisitos:* \n \n*> <:819973607290962001:1190726034929238066> Ter no mínimo 16 anos.* \n \n *> <:819973607290962001:1190726034929238066> Ter maturidade.* \n \n *> <:819973607290962001:1190726034929238066> Ter respeito.* \n \n *> <:819973607290962001:1190726034929238066> Entender sobre Hierarquia.* \n \n *> <:819973607290962001:1190726034929238066> Cumprir com suas responsabilidades.*`);

                let botao = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId("formulario")
                    .setEmoji("📋")
                    .setDisabled(false)
                    .setLabel("Formulário")
                    .setStyle(Discord.ButtonStyle.Secondary)
                );

                canal_formulario.send({ embeds: [embed_formulario], components: [botao] })
            })
        } 
    }
  }
}