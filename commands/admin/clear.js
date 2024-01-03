const Discord = require("discord.js")

module.exports = {
    name: "clear",
    description: "[👑 ADM ] Limpe o canal de texto",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        let numero = interaction.options.getNumber('quantidade')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            if (parseInt(numero) > 99 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("#000000")
                    .setDescription(`\`/clear [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                let embed = new Discord.EmbedBuilder()
                    .setColor("#000000")
                    .setDescription(`<:UgrARU4:1190652059654045736> O canal de texo ${interaction.channel} teve \`${numero}\` mensagens deletadas por \`${interaction.user.username}\`.`)
                    .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                    .setTimestamp()
                    .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

                interaction.reply({ embeds: [embed] })

                let apagar_mensagem = "nao"

                if (apagar_mensagem === "sim") {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                } else if (apagar_mensagem === "nao") {
                    return;
                }

            }

        }

    }
}