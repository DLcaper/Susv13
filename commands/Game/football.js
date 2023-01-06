const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")

const Color = `#ffcc00`

module.exports = {
    name: 'football',
    category: "games",
    description: 'soccer game :D',
    usage: 'd?football',
    aliases: ['soccer'],
    timeout: 300,
    run : async (client, message, args) => {

    const positions = {
      LEFT: `sút bóng\n🥅🥅🥅\n🕴_ _\n\n_ _     ⚽`,
      MIDDLE: `sút bóng\n🥅🥅🥅\n_ _     🕴\n\n_ _     ⚽`,
      RIGHT: `sút bóng\n🥅🥅🥅\n_ _           🕴\n\n_ _     ⚽`
    }

    let randomized = Math.floor(Math.random() * Object.keys(positions).length);
    let gameEnded = false;
    let randomPos = positions[Object.keys(positions)[randomized]];

    let leftbutton = new MessageButton()
    .setCustomId('LEFT')
    .setLabel('Left')
    .setStyle('SECONDARY')

    let middlebutton = new MessageButton()
    .setCustomId('MIDDLE')
    .setLabel('Middle')
    .setStyle('SECONDARY')

    let rightbutton = new MessageButton()
    .setCustomId('RIGHT')
    .setLabel('Right')
    .setStyle('SECONDARY')

    const row = new MessageActionRow()
    .addComponents(
      leftbutton,
      middlebutton, 
      rightbutton
    )

    const disabledrow = new MessageActionRow()
    .addComponents(
      leftbutton.setDisabled(false).setStyle("DANGER"),
      middlebutton.setDisabled(false).setStyle("DANGER"),
      rightbutton.setDisabled(false).setStyle("DANGER")
    )

    const sentMsg = await message.channel.send({content: `${randomPos}`, components: [row]})


    function update() {
			randomized = Math.floor(Math.random() * Object.keys(positions).length);
			randomPos = positions[Object.keys(positions)[randomized]];

			sentMsg.edit({
				content: randomPos,
				components: [row],
			});
		}
    setInterval(() => {
      if(gameEnded == false) return update()
    }, 2000)

    let embedWin = new MessageEmbed()
    .setTitle(`bạn thắng!`)
    .setDescription(`${message.author.username} bạn thắng `)
    .setColor("F4C2C2")
    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic:true}))
    .setTimestamp()

    let embedLoose = new MessageEmbed()
    .setTitle(`bạn thua!`)
    .setDescription(`${message.author.username} bạn thua game ! hãy thử lại... `)
    .setColor(Color)
    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic:true}))
    .setTimestamp()

    const collector = message.channel.createMessageComponentCollector({max:1, time: 8000})

    collector.on('collect', async i => {
      if(i.user.id !== message.author.id) return i.reply({content: 'đây không phải game của bạn! muốn chơi ghi **?football**', ephemeral: true})

      if(i.customId !== Object.keys(positions)[randomized]) {
        gameEnded = true;
        i.update({components: [disabledrow]})
        message.reply({embeds: [embedWin], components: [], content: " "})
      } else if(i.customId == Object.keys(positions)[randomized]) {
        gameEnded = true;
        i.update({components: [disabledrow]})
        message.reply({embeds: [embedLoose], components: [], content: " "})
      }
    })

    collector.on('end', async i => {
      if(!i.size) return sentMsg.edit({components: [disabledrow]})
    })


}
      }