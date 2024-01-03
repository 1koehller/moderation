require('../index')

const Discord = require('discord.js')
const client = require('../index')

const { QuickDB } = require("quick.db")
const discordTranscripts = require('discord-html-transcripts')
const db = new QuickDB();

client.on("interactionCreate", async interaction => {
  if (interaction.isSelectMenu()) {
     let choice = interaction.values[0]
     const member = interaction.member
     const guild = interaction.guild
   if(choice == 'duvida') {
       let embedDuvida = new Discord.EmbedBuilder()
        .setColor('#000000')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setDescription(`- **Caso haja alguma dúvida em relação ao Ticket, abra ele e nós vamos retira-la!**`)
       interaction.reply({ embeds: [embedDuvida], ephemeral: true})
   } 
     
    else if (choice == 'ticket') {     
       if (interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.id}`)) {
           let canal = interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.id}`);

let jaTem = new Discord.EmbedBuilder()
.setDescription(`❌ **Calma! Você já tem um ticket criado em: ${canal}.**`)
.setColor('#000000')
         
interaction.reply({ embeds: [jaTem], ephemeral: true })
       } else {

           let cargoTicket = await db.get("cargoModerate.cargoM");
           let CategoriaTicket = await db.get('Categoria.Categoria')
          
           guild.channels.create({
             
               name: `ticket-${member.id}`,
               type: 0, 
               parent: `${CategoriaTicket.id}`,
               topic: interaction.user.id, 
               permissionOverwrites: [
                   {
                       id: interaction.guild.id,
                       deny: ["ViewChannel"]
                   },
                   {
                       id: member.id,
                       allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
                   },
                  {
                       id: cargoTicket.id, 
                       allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
                   }
               ]
               
             }).then( (ca) => {
               interaction.reply({ content: `**💾 - Criando Ticket...**`, ephemeral: true }).then( () => {
                   setTimeout( () => {
                       let direciandoaocanal = new Discord.ActionRowBuilder().addComponents(
                           new Discord.ButtonBuilder()
                           .setLabel(` - Ticket`)
                           .setEmoji(`🎫`)
                           .setStyle(5)
                           .setURL(`https://discord.com/channels/${interaction.guild.id}/${ca.id}`)
                       )
                       interaction.editReply({ content: `**💾 - Ticket criado na categoria!**`, ephemeral: true, components: [direciandoaocanal] })
                   }, 670)
               })

                let embedCanalTicket = new Discord.EmbedBuilder()
                 .setColor('#000000')
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                 .setThumbnail(`${client.user.displayAvatarURL()}`)
                 .setDescription(`*Fale, o que você precisa?*`)
                 .addFields(
                   {
                       name: '\`\`\`Denúncias - Modelo:\`\`\`',
                       value: `*Seu nome:*\n*Nome do Envolvido:*\n*Descrição do Ocorrido:*\n*Data e hora:*\n*Provas:*\n`,
                       inline: false,
                   },
                   {
                       name: '\`\`\`Suporte Geral - Modelo:\`\`\`',
                       value: `*Seu nome:*\n*Motivo de abrir o Ticket:*\n*Descrição do Ocorrido:*\n*Data e hora:*\n`,
                       inline: false,
                   },
                 )
                 .setTimestamp()


                 let FecharTicket = new Discord.ActionRowBuilder().addComponents(
                   new Discord.ButtonBuilder()
                   .setLabel(` - Fechar & Salvar`)
                   .setEmoji(`🔒`)
                   .setCustomId('fechar')
                   .setStyle(Discord.ButtonStyle.Primary),
                   new Discord.ButtonBuilder()
                   .setLabel(` - Lock`)
                   .setEmoji(`🔐`)
                   .setCustomId('lock')
                   .setStyle(Discord.ButtonStyle.Danger),
                   new Discord.ButtonBuilder()
                   .setLabel(` - Unlock`)
                   .setEmoji(`🔓`)
                   .setCustomId('unlock')
                   .setStyle(Discord.ButtonStyle.Success)
               )                
                 
                 ca.send({ embeds: [embedCanalTicket], components: [FecharTicket] })
              })                 
       }
       
   }
} 
if(interaction.isButton) {
 if(interaction.customId === "fechar") {
   const modalTicket = new Discord.ModalBuilder()
         .setCustomId('modal_ticket')
         .setTitle(`Fechar - Ticket`)
       const resposta1 = new Discord.TextInputBuilder()
         .setCustomId('resposta')
         .setLabel('Diga-nos a razão de fechar o ticket:')
         .setStyle(Discord.TextInputStyle.Paragraph)
 
       const firstActionRow = new Discord.ActionRowBuilder().addComponents(resposta1);
       modalTicket.addComponents(firstActionRow)
       await interaction.showModal(modalTicket);
 } else if(interaction.customId === "lock") {
   const cliente = interaction.guild.members.cache.get(
       interaction.channel.topic.slice(0, 18)
   );
    let cargoTicket2 = await db.get("cargoModerate.cargoM");          
       if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
           interaction.reply({ content: `**❌ - Apenas STAFF's podem selecionar esta opção!**`, ephemeral: true })
       } else {
           interaction.channel.permissionOverwrites.edit(cliente.user, {
               ViewChannel: false
             })
         interaction.reply(`**🔐 - Canal trancado, permissão de visualizar canal fechada para ${cliente.user}!**`)
  
       }            
 } else if(interaction.customId === "unlock") {
   const cliente = interaction.guild.members.cache.get(
       interaction.channel.topic.slice(0, 18)
   );
   let cargoTicket2 = await db.get("cargoModerate.cargoM");
   if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
       interaction.reply({ content: `**❌ - Apenas STAFF's podem selecionar esta opção!**`, ephemeral: true })
   } else {
       interaction.channel.permissionOverwrites.edit(cliente.user, {
           ViewChannel: true
         })
     interaction.reply(`**🔑 - 🔓 - Canal destrancado, permissão de visualizar canal concedida para ${cliente.user}!**`)
   }

 }
};
if (!interaction.isModalSubmit()) return;
if (interaction.customId === 'modal_ticket') {         
 const respostaFinal = interaction.fields.getTextInputValue('resposta');

 interaction.reply({
   content: `**✅ - Resposta enviada, canal será deletado em 3s**`, ephemeral: true
 }).then ( (aviso) => {
    setTimeout( () => {
       interaction.editReply({
           content: `**✅ - Resposta enviada, canal será deletado em 2s**`, ephemeral: true
       }, 1000).then ( (aviso1) => {
           setTimeout( () => {
              interaction.editReply({
                   content: `**✅ - Resposta enviada, canal será deletado em 1s**`, ephemeral: true
               })
           }, 1000);
        })
         .then( () => {
           setTimeout(async () => {
               const cliente = interaction.guild.members.cache.get(
                   interaction.channel.topic.slice(0, 18)
               );

               let channel = interaction.channel;
               const attachment = await discordTranscripts.createTranscript(channel, {
                  fileName: `${channel.name}.html`,
                });
               
               interaction.channel.delete();
               const channelDeleted = interaction.channel.name;

               let embedLog = new Discord.EmbedBuilder()
               
                .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}`})
                .setColor('#000000')
                .setTitle(`${channelDeleted}`)
                .setDescription(`*Ticket fechado, informações:* \n**(Transcripts Anexados)**\n`)
                .addFields(
                   {
                       name: `🆔 - ID de quem fechou:`,
                       value: `\`\`\`${interaction.user.id}\`\`\``,
                       inline: true,
                   },
                   {
                       name: `🆔 - ID de quem abriu:`,
                       value: `\`\`\`${cliente.id}\`\`\``,
                       inline: true,
                   },
                   {
                       name: `💬 - Quem fechou:`,
                       value: `${interaction.user}`,
                       inline: false,
                   },
                   {
                       name: `💬 - Quem abriu:`,
                       value: `${cliente.user}`,
                       inline: false,
                   },
                   {
                       name: `🎫 - Ticket:`,
                       value: `${channelDeleted}`,
                       inline: true,
                   },
                   {
                      name: '📕 - Motivo do Fechamento:',
                      value: `\`\`\`${respostaFinal}\`\`\``,
                      inline: false,
                   },
                )
                .setTimestamp()
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)

                let embedLogUser = new Discord.EmbedBuilder()
               
                .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}`})
                .setColor('#000000')
                .setTitle(`Ticket Fechado!`)
                .setDescription(`*Ticket fechado, informações:*`)
                .addFields(
                   {
                       name: `💬 - Quem fechou:`,
                       value: `${interaction.user}`,
                       inline: false,
                   },
                   {
                       name: `💬 - Quem abriu:`,
                       value: `${cliente.user}`,
                       inline: false,
                   },
                   {
                      name: '📕 - Motivo do Fechamento:',
                      value: `\`\`\`${respostaFinal}\`\`\``,
                      inline: false,
                   },
                )
                .setTimestamp()
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

                let canalLogsT = await db.get('channelLogTicket.channel')


                cliente.user.send({ embeds: [embedLogUser] })
                await  interaction.guild.channels.cache.get(`${canalLogsT.id}`).send({ content: `\`💾 - Transcript ⤵\``, files: [attachment] ,embeds: [embedLog] })
           }, 1000);
        });
    });
 });
};
});