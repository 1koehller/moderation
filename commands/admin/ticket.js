const Discord = require("discord.js");

module.exports = {
  name: "painel-ticket", 
  description: '[👑 ADM ] Envie o painel de tikcet.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "chat",
        description: "Mencione um canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
],
  
    run: async(client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
        return interaction.reply({
            content: `**❌ - ${interaction.user}, Você precisa da permissão \`Administrador\` para usar este comando!**`,
            ephemeral: true,
      }); else {

        let chat = interaction.options.getChannel("chat")

        if (!chat.send)
        return interaction.reply({
            content: `**❌ - ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,
            ephemeral: true,
        })

        let rowTicket = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.SelectMenuBuilder()
                .setCustomId('select2')
                .setPlaceholder('🎫 - selecionar Opção!')
                .addOptions(
                    {
                        label: ' - Ticket',
                        description: 'Clique aqui para abrir o Ticket (Denúncias e Suporte Geral).',
                        emoji: '<:990307739290976276:1188492735913664542>',
                        value: 'ticket',
                    },
                    {
                        label: ' - Tenho Dúvidas',
                        description: 'Clique aqui caso haja alguma dúvida.',
                        emoji: '<:990307739290976276:1188492735913664542>',
                        value: 'duvida',
                    },
                    
                ),
                
           )

          
        let embedTicket = new Discord.EmbedBuilder()
         .setTitle(`<:990307718545940610:1188492727529246781> - Ticket`)
         .setDescription(`<:1099786144532664501:1190726037961703454>  *Selecione uma opção de suporte abaixo!* \n \n <:UgrARU4:1190652059654045736>  *Nosso horário de atendimento é de 24 horas!* \n \n <:UgrARU4:1190652059654045736>  *Respondemos entre 5 a 15 minutos.* \n \n <:999075969920929893:1188492750144933898> *Em dias mais movimentados pode ocorrer um atraso nos tickets! ( Entre 10 a 20 minutos )* \n \n <:990307739290976276:1188492735913664542>  *Nossa equipe agradece o contato!*`)
         .setColor('#000000')
         .setAuthor({ name: `${interaction.user.username}`, iconURL: `${(interaction.user.displayAvatarURL({ dinamyc: true, format: "png" }))}`})
         .setFooter({ text: `Sistema feito por: Hide#0548`, iconURL: `${client.user.displayAvatarURL()}`})
         .setThumbnail(`${interaction.guild.iconURL()}`)
         .setImage(`${interaction.guild.iconURL({ size: 2048})}`)
         

         interaction.reply({ content: `✅ - Feito! Ticket enviado no canal ${chat}!`, ephemeral: true})
         chat.send({ components: [rowTicket], embeds: [embedTicket] })
              
    

      } 

  }
}