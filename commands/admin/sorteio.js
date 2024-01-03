const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "sorteio",
  description: "[👑 ADM ] crie um sorteio",
  options: [
    {
      name: "premio",
      type: Discord.ApplicationCommandOptionType.String,
      description: "qual sera o premio?",
      required: true,
    },
    {
      name: "regras",
      type: Discord.ApplicationCommandOptionType.String,
      description: "descrição do sorteio",
      required: true,
    },
    {
      name: "tempo",
      type: Discord.ApplicationCommandOptionType.String,
      description: "escolha o tempo do sorteio",
      required: true,
      choices: [
        {
          name: "30 Segundos",
          value: "30s",
        },
        {
          name: "1 Minuto",
          value: "1m",
        },
        {
          name: "5 Minutos",
          value: "5m",
        },
        {
          name: "10 Minutos",
          value: "10m",
        },
        {
          name: "15 Minutos",
          value: "15m",
        },
        {
          name: "30 Minutos",
          value: "30m",
        },
        {
          name: "45 Minutos",
          value: "45m",
        },
        {
          name: "1 Hora",
          value: "1h",
        },
        {
          name: "2 Horas",
          value: "2h",
        },
        {
          name: "5 Horas",
          value: "5h",
        },
        {
          name: "12 Horas",
          value: "12h",
        },
        {
          name: "24 Horas",
          value: "24h",
        },
        {
          name: "1 Dia",
          value: "24h",
        },
        {
          name: "3 dias",
          value: "72h",
        },
        {
          name: "1 Semana",
          value: "168h",
        },
      ],
    },
  ],

  run: async (client, interaction, args) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ModerateMembers
      )
    ) {
      return interaction.reply({
        content: `**❌ | ${interaction.user}, Você precisa da permissão de \`MODERATE_MEMBERS\` para usar este comando!**`,
        ephemeral: true,
      });
    } else {
      let premio = interaction.options.getString("premio");
      let tempo = interaction.options.getString("tempo");
      let desc = interaction.options.getString("regras");

      let duracao = ms(tempo);

      const button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("botao")
          .setEmoji("<a:interao:1130986851293986888>")
          .setStyle(2)
      );

      let click = [];

      const embed = new Discord.EmbedBuilder()
        .setTitle(`<a:blue_raiocr:1100212609023750144> **Sorteio**`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(
          `> <:z_pontoazulcr:1130989563272241162> *Sorteio enviado por* ${interaction.user}\n\n > <:z_pontoazulcr:1130989563272241162> *Premio:* **${premio}**\n\n > <:z_pontoazulcr:1130989563272241162> *Regras do sorteio:* **${desc}** \n\n\ > <:z_pontoazulcr:1130989563272241162> *Duração:* **${tempo}**  \n\n\ *clique no botão a baixo para participar!*`
        )
        .setTimestamp(Date.now() - ms(tempo))
        .setFooter({ text: "Coding by Hide#0548" })
        .setColor(`#000000`);

      let erro = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setDescription(`Não foi possível iniciar o soteio!`);

      const msg = await interaction
        .reply({
          embeds: [embed],
          components: [button],
        })
        .catch((e) => {
          interaction.reply({ embeds: [erro] });
        });

      const coletor = msg.createMessageComponentCollector({
        time: ms(tempo),
      });

      coletor.on("end", (i) => {
        interaction.editReply({
          components: [],
        });
      });

      coletor.on("collect", (i) => {
        if (i.customId === "botao") {
          if (click.includes(i.user.id))
            
          
          return i.reply({
              content: `<a:BB_MS_errado:1130991410821214248> *Ola ${interaction.user}, Você já está participando do sorteio!*`,
              ephemeral: true,
            });
          click.push(i.user.id);
          interaction.editReply({
            embeds: [embed],
          });
          i.reply({
            content: `<a:verificado1:1130990792643715092> *Ola ${interaction.user}, Você acaba de entrar no sorteio e concorrer ao ${premio}*`,
            ephemeral: true,
          });
        }
      });

      setTimeout(() => {
        let ganhador = click[Math.floor(Math.random() * click.length)];

        if (click.length == 0) {

        let cancelado = new Discord.EmbedBuilder()
        .setTitle('<a:BB_MS_errado:1130991410821214248> **Cancelado**')
        .setDescription(`<:red_ponto:1130266858596081794> *O sorteio foi cancelado pois não houve participantes o suficiente*`)
        .setColor("#000000")

        
        return interaction.channel.send({ embeds: [cancelado], content: `@everyone`})};

          let embedganhador = new Discord.EmbedBuilder()
          .setTitle('<a:estrela:1130987392698945637> **Parabens**')
          .setDescription(`<:PontoReal:1130993518681272531> *Parabens ${interaction.user} \`${interaction.user.tag}\`, voce acaba de ganhar um* **${premio}**`)
          .setColor("#000000")
          .setThumbnail('https://gifs.eco.br/wp-content/uploads/2022/09/gifs-de-presentes-9.gif')
          interaction.channel.send({embeds: [embedganhador], content: `${interaction.user}` })
          
    }, duracao);
    }
  },
};

