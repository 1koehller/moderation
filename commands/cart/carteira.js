const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports =  {
    name: "carteira",
    description: "[🟢 User ] Veja a quantidade de moedas em sua carteira.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Veja a carteira de um usuário.",
            required: false 
        }
    ],
    
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("usuário");
        if (!user) user = interaction.user;

        let carteira = await db.get(`carteira_${user.id}`)
        if (carteira === null) carteira = 0;

        if (user.id === interaction.user.id) {
            let embed = new Discord.EmbedBuilder()
            .setColor("#000000")
            .setTitle("💸 Carteira")
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setDescription(`<:UgrARU4:1190652059654045736> Você possui \`${carteira} moedas\` em sua carteira.`)
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTimestamp()
            .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

            interaction.reply({ embeds: [embed] })
        } else {
            let embed = new Discord.EmbedBuilder()
            .setColor("#000000")
            .setTitle("💸 Carteira")
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setDescription(`<:UgrARU4:1190652059654045736> O usuário ${user} (${user.id}) possui \`${carteira} moedas\` em sua carteira.`)
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTimestamp()
            .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

            interaction.reply({ embeds: [embed] })
        }
        
    }
}