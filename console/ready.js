const { Client, GatewayIntentBits, ActivityType } = require('discord.js')

require('../index')

const Discord = require('discord.js')
const client = require('../index')

client.on("ready", () => {
  const ListMessages = [
      `🏆  https://github.com/1koehller/moderation`,
      `🏆 .gg/https://discord.gg/97GshjtjPN`,
      `🏆  2024 (R)`,
  ];

  let position = 0;
      setInterval(() => client.user.setPresence({
          activities: [{
              name: `${ListMessages[position++ % ListMessages.length]}`,
              type: Discord.ActivityType.Streaming,
              url: 'https://www.twitch.tv/titanlol1'
          }]
      }), 1000 * 10);
  
      client.user.setStatus("dnd");
  });

  client.once('ready', async () => {
    console.log(`${client.user.tag}`);

    await client.application?.commands.set([]);
  });