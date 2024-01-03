require('../index')

const Discord = require('discord.js')
const client = require('../index')

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
  
    let mencoes = [`<@${client.user.id}>`, `<@!${client.user.id}>`]
  
    mencoes.forEach(element => {
      if (message.content === element) {
  
        //(message.content.includes(element))
  
        let embed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynaimc: true }) })
        .setDescription(`🛠 Olá ${message.author}, utilize \`/help\` para ver meus comandos!`)
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});
        
        message.reply({ embeds: [embed] })
      }
    })
  
})