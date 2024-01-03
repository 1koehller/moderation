require('../index')

const Discord = require('discord.js')
const client = require('../index')

client.on("guildMemberAdd", (member) => {
    let canal_logs = "1061721180614168688";
    const cargo = '1056397485603565619';
    member.roles.add(cargo)
    if (!canal_logs) return;

    const data = new Date();
  
    let embed = new Discord.EmbedBuilder()
    .setColor("#000000")
    .setTitle("<:1099786144532664501:1190726037961703454> Novo membro no servidor")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`
       
       **> Olá ${member}!\nSeja Bem-Vindo(a) ao servidor \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.**
       `)
    .addFields(
        { name: '<:999076028179812363:1188492752472784966> Tag', value: member.user.tag, inline: true },
        { name: '<:999075935624102040:1188492743417282560> ID', value: member.user.id, inline: true },
        { name: '<:999075969920929893:1188492750144933898> Conta criada em', value: member.user.createdAt.toLocaleString(), inline: false },
        { name: 'Data', value: `<:Ywd6d3g:1190652058026643486> <t:${Math.floor(data.getTime() / 1000)}:F>` }
    );
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` })
  })
  
  client.on("guildMemberRemove", (member) => {
    let canal_logs = "1061721180614168688";
    if (!canal_logs) return;

    const data = new Date();
  
    let embed = new Discord.EmbedBuilder()
    .setColor("#000000")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`<:1099786144532664501:1190726037961703454> Adeus ${member.user.username}....`)
    .setDescription(`
    
        **> O usuário ${member} saiu do servidor!\n> Espero que retorne um dia.\n> Nos sobrou apenas \`${member.guild.memberCount}\` membros.**
        `)
    .addFields(
        { name: '<:999076028179812363:1188492752472784966> Tag', value: member.user.tag, inline: true },
        { name: '<:999075935624102040:1188492743417282560> ID', value: member.user.id, inline: true },
        { name: '<:999075969920929893:1188492750144933898> Conta criada em', value: member.user.createdAt.toLocaleString(), inline: false },
        { name: 'Data', value: `<:Ywd6d3g:1190652058026643486> <t:${Math.floor(data.getTime() / 1000)}:F>` }
    );
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` })
  })
  
  