const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'set-categoria-ticket',
    description: "[👑 ADM] Setar a categoria de Tickets (CATEGORIA).",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "categoria",
            description: "Escolha a categoria de ticket.",
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [
                Discord.ChannelType.GuildCategory,
            ],
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**❌ - Você não possui permissão para utilizar este comando.**`, ephemeral: true })
         } else {
            
            let Categoria = interaction.options.getChannel("categoria")

              

 
                await db.set('Categoria', {Categoria})
            
                let embedCategoriaSet = new Discord.EmbedBuilder()
                 .setDescription(`**✅ - Categoria ${Categoria} setado para Categoria de tickets!**`)
                 .setColor('#000000')
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                 .setTimestamp()
                 .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});
           
                 interaction.reply({ embeds: [embedCategoriaSet]})
                  
        }
        
 

 

    }
} 