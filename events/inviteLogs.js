require('../index')

const Discord = require('discord.js')
const client = require('../index')

client.on('inviteCreate', (invite) => {
    const channelLog = invite.guild.channels.cache.get('1061721180614168688')
    const convite = {
        url: invite.url,
        canal: invite.channel,
        timeExpires: invite.expiresAt,
        member: invite.inviter,
        maxUses: invite.maxUses
    }
    if (convite.maxUses === 0) convite.maxUses = 'Ilimitado'
    if (!convite.timeExpires) {
        convite.timeExpires = '\`Nunca\`'
    } else {
        convite.timeExpires = `<t:${Math.floor(convite.timeExpires / 1000)}:R>`
    }
    const embed = new Discord.EmbedBuilder()
    .setColor('#000000')
    .setTitle('Convite Criado')
    .addFields(
        {
            name: `><:990307714217414666:1188492725385961492> Dono do Convite:`,
            value: `${convite.member} | ${convite.member.id}`,
            inline: false
        },
        {
            name: `><:1099786144532664501:1190726037961703454> Canal do Convite:`,
            value: `${convite.canal} | ${convite.canal.id}`,
            inline: false
        },
        {
            name: `><:819973607290962001:1190726034929238066> URL do Convite:`,
            value: `${convite.url}`,
            inline: false
        },
        {
            name: `><:UgrARU4:1190652059654045736> Máximo de usos do Convite:`,
            value: `\`${convite.maxUses}\``,
            inline: false
        },
        {
            name: `><:999075969920929893:1188492750144933898> Tempo de uso do Convite:`,
            value: convite.timeExpires,
            inline: false
        }
    )

    channelLog.send({ embeds: [embed] })
})

client.on('inviteDelete', (invite) => {
    console.log(invite)
    const channelLog = invite.guild.channels.cache.get('1061721180614168688')
    const convite = {
        url: invite.url,
        canal: invite.channel,
        timeCreate: invite.createdAt,
        member: invite.inviter,
        memberCount: invite.presenceCount
    }
    const embed = new Discord.EmbedBuilder()
    .setColor('#000000')
    .setTitle('Convite Expirado')
    .addFields(
        {
            name: `> Canal do Convite:`,
            value: `${convite.canal} | ${convite.canal.id}`,
            inline: false
        },
        {
            name: `> URL do Convite:`,
            value: `${convite.url}`,
            inline: false
        }
    )

    channelLog.send({ embeds: [embed] })
})