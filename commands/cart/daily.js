const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const ms = require("ms")
const cooldowns = {}

module.exports =  {
    name: "daily",
    description: "[🟢 User ] Resgate suas moedas diárias.",
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async (client, interaction, args) => {

        if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
        let timeout = ms("1 day")
        if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
        if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

        let embed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("❌ Daily já resgatado!")
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`<:UgrARU4:1190652059654045736> Espere \`${time}\` para resgatar seu daily novamente!`)
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        interaction.reply({ embeds: [embed], ephemeral:true });return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};

        let quantia = Math.ceil(Math.random()* 5000);
        if (quantia < 1000) quantia = quantia + 1000;

        await db.add(`carteira_${interaction.user.id}`, quantia);

        let embed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("💰 Daily Resgatado!")
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`<:UgrARU4:1190652059654045736> Você resgatou \`${quantia} moedas\` em seu daily.\nUtilize o comando \`/carteira\` para ver seu total de moedas.`)
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTimestamp()
        .setFooter({text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true, size: 2048})});

        interaction.reply({ embeds: [embed] })


    }
}