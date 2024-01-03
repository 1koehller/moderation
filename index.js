const Discord = require("discord.js")

const config = require("./config.json")

const { QuickDB } = require('quick.db')
global.db = new QuickDB()

const { EmbedBuilder } = require('discord.js')

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildWebhooks
  ],
  partials: [
    Partials.Message,
    Partials.GuildMessages,
    Partials.Reaction,
    Partials.User,
    Partials.Channel,
  ],
  ws: {
    properties: {
      $browser: "Discord iOS"
    }
  }
});

module.exports = client

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

const fs = require('fs');

fs.readdir('./Events', (err, file) => {
  file.forEach(event => {
    require(`./Events/${event}`)
  })
})



fs.readdir('./console', (err, file) => {
  file.forEach(event => {
    require(`./console/${event}`)
  })
})

client.on("ready", () => {
  let canalPing = client.channels.cache.get(`1188708523417292912`);
  if (!canalPing) return console.log(`Canal de ping do bot não encontrado`);
  setInterval(() => {
    canalPing.setName(`📡 Ping: ${client.ws.ping}ms`);
  }, 1000 * 60 * 4); 
})

client.on("ready", () => {
  let users = client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)
  const compact = users.toLocaleString("pt-BR", { notation: 'compact' });
  let membro = client.channels.cache.get(`1188708565091885166`);
  if (!membro) return console.log(`Canal de membros do bot não encontrado`);
  setInterval(() => {
    membro.setName(`📡 Membros: ${compact}`);
  }, 1000 * 60 * 4);
})

client.on("ready", () => {
  let guilds = client.guilds.cache.size
  let sv = client.channels.cache.get(`1188708613754208276`);
  if (!sv) return console.log(`Canal de servidores do bot não encontrado`);
  setInterval(() => {
    sv.setName(`📡 Servidores: ${guilds}`);
  }, 1000 * 60 * 4);
})


client.on("interactionCreate", async(interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "formulario") {
      if (!interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`))) return interaction.reply({ content: `O sistema está desativado.`, ephemeral: true })
      const modal = new Discord.ModalBuilder()
      .setCustomId("modal")
      .setTitle("Formulário");

      const pergunta1 = new Discord.TextInputBuilder()
      .setCustomId("pergunta1") // Coloque o ID da pergunta
      .setLabel("Qual é o seu nome completo ?") // Coloque a pergunta
      .setMaxLength(200) // Máximo de caracteres para a resposta
      .setPlaceholder("Resposta") // Mensagem que fica antes de escrever a resposta
      .setRequired(true) // Deixar para responder obrigatório (true | false)
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)

      const pergunta2 = new Discord.TextInputBuilder()
      .setCustomId("pergunta2") // Coloque o ID da pergunta
      .setLabel("Qual é sua idade?") // Coloque a pergunta
      .setMaxLength(200) // Máximo de caracteres para a resposta
      .setPlaceholder("Resposta") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      const pergunta3 = new Discord.TextInputBuilder()
      .setCustomId("pergunta3") // Coloque o ID da pergunta
      .setLabel("Qual é a sua carga horária disponível?") // Coloque a pergunta
      .setPlaceholder("Resposta") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      const pergunta4 = new Discord.TextInputBuilder()
      .setCustomId("pergunta4") // Coloque o ID da pergunta
      .setLabel("Por que você deseja adentrar em nossa equipe?") // Coloque a pergunta
      .setMaxLength(1000)
      .setPlaceholder("Resposta") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Paragraph) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      const pergunta5 = new Discord.TextInputBuilder()
      .setCustomId("pergunta5") // Coloque o ID da pergunta
      .setLabel("Por que você deve ser aprovado?") // Coloque a pergunta
      .setMaxLength(1000)
      .setPlaceholder("Resposta") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Paragraph) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)


      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(pergunta1),
        new Discord.ActionRowBuilder().addComponents(pergunta2),
        new Discord.ActionRowBuilder().addComponents(pergunta3),
        new Discord.ActionRowBuilder().addComponents(pergunta4),
        new Discord.ActionRowBuilder().addComponents(pergunta5)

      )

      await interaction.showModal(modal)
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modal") {
      let resposta1 = interaction.fields.getTextInputValue("pergunta1")
      let resposta2 = interaction.fields.getTextInputValue("pergunta2")
      let resposta3 = interaction.fields.getTextInputValue("pergunta3")
      let resposta4 = interaction.fields.getTextInputValue("pergunta4")
      let resposta5 = interaction.fields.getTextInputValue("pergunta5")


      if (!resposta1) resposta1 = "Não informado."
      if (!resposta2) resposta2 = "Não informado."
      if (!resposta3) resposta3 = "Não informado."
      if (!resposta4) resposta4 = "Não informado."
      if (!resposta5) resposta5 = "Não informado."


      let embed = new Discord.EmbedBuilder()
      .setColor("#000000")
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`**<:999075969920929893:1188492750144933898> Usuario:** ${interaction.user}\n**<:999075935624102040:1188492743417282560> ID:** \`${interaction.user.id}\``)
      .addFields(
        {
          name: `<:990307739290976276:1188492735913664542>Nome`,
          value: `\`\`\`${resposta1}\`\`\``,
          inline: true
        },
        {
          name: `<:990307739290976276:1188492735913664542>Idade`,
          value: `\`\`\`${resposta2}\`\`\``,
          inline: true
        },
        {
          name: `<:990307739290976276:1188492735913664542>Horarios`,
          value: `\`\`\`${resposta3}\`\`\``,
          inline: true
        },
        {
          name: `<:990307739290976276:1188492735913664542>Por que você deseja adentrar em nossa equipe?`,
          value: `\`\`\`${resposta4}\`\`\``,
          inline: false
        },
        {
          name: `<:990307739290976276:1188492735913664542>Por que você deve ser aprovado?`,
          value: `\`\`\`${resposta5}\`\`\``,
          inline: false
        },
      );

      interaction.reply({ embeds: [ new Discord.EmbedBuilder().setDescription(`**${interaction.user},** Seu formulário foi enviado com sucesso. Aguarde a resposta no seu privado!`)
                .setColor("#000000")
        ],
        ephemeral: true,
    })
      await interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`)).send({ embeds: [embed] })
    }
  }
})