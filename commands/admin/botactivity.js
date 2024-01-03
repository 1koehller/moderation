const Discord = require('discord.js');

module.exports = {
    name: 'set-bot-activity',
    description: '[👑 ADM ] Set Bot activity',
    dev: true,
    defaultPermission: false,
    options: [
        {
            name: 'type',
            description: 'Choose activity type',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: `Remover`, value: `0` },
                { name: `Playing`, value: `Playing` }, // Jogando
                { name: `Streaming`, value: `Streaming` }, // Transmissão
                { name: `Listening`, value: `Listening` }, // Ouvindo
                { name: `Watching`, value: `Watching` }, // Assistindo
                { name: `Competing`, value: `Competing` } // Competindo
            ]
        },
        {
            name: 'activity',
            description: 'Set new activity, max 128 characters',
            type: Discord.ApplicationCommandOptionType.String,
            minLength: 3,
            maxLength: 128,
            required: true
        }
    ],
    
    run: async (client, interaction) => {
        const activityType = interaction.options.getString('type');
        const activityName = interaction.options.getString('activity');
        
        const embed = new Discord.EmbedBuilder()
            .setColor('#000000')
            .setTitle('Bot Activity Updated!')

        client.user.setPresence({
            activities: [{
                type: Discord.ActivityType[activityType],
                url: 'https://www.twitch.tv/iamsrhell',
                name: activityName
            }]
        });
        
        interaction.reply({ embeds: [embed], ephemeral: true });
    },
};