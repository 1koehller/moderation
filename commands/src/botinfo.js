const Discord = require("discord.js")

module.exports = {
  name: "botinfo",
  description: "[🟢 User ] Fornece informações sobre o bot.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let dono = "898225338709069945";
    let membros = client.users.cache.size;
    let servidores = client.guilds.cache.size;
    let canais = client.channels.cache.size;
    let bot = client.user.tag;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let linguagem = "JavaScript";
    let livraria = "Discord.Js";
    let ping = client.ws.ping;

    let embed = new Discord.EmbedBuilder()
    .setColor("#000000")
    .setAuthor({ name: bot, iconURL: avatar_bot })
    .setFooter({ text: bot, iconURL: avatar_bot })
    .setTimestamp(new Date())
    .setThumbnail(avatar_bot)
    .setDescription(`<:UgrARU4:1190652059654045736> Olá ${interaction.user}, veja minhas informações abaixo:\n\n> <:990307714217414666:1188492725385961492> Nome: \`${bot}\`.\n> <:990307714217414666:1188492725385961492> Dono: ${client.users.cache.get(dono)}.
\n> <:UgrARU4:1190652059654045736> Membros: \`${membros}\`.\n> <:989629096558469192:1188492717983006822> Servidores: \`${servidores}\`.\n> <:999075933073969173:1188492741194297344> Canais: \`${canais}\`.\n> <:1099786144532664501:1190726037961703454> Ping: \`${ping}\`.
\n> <:806694039432069130:1188492708432576522> Linguagem de programação: \`${linguagem}\`.\n> <:972284851812188160:1188492711209218158> Livraria: \`${livraria}\`.`);

    interaction.reply({ embeds: [embed] })


  }
}