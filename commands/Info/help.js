const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")

const config = require("../../botconfig/config.json")
module.exports = {
  name: "help",
  cooldown: 1000 * 10,
  run: async (client, message, args) => {
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Select Menu')

          .addOptions([
            {
              label: 'Main Menu',
              description: 'show all command main menu',
              emoji: "📄",
              value: '0',
            },
            {
              label: 'Config Commands',
              description: 'show all command config commands',
              emoji: "<a:config:1049688320046792796>",
              value: '1',
            },
            {
              label: 'Giveaway Commands',
              description: 'xem tất cả giveaway commands',
              emoji: "<:giveaway:1007921209909977209>",
              value: '2',
            },
            {
              label: 'Info Commands',
              description: 'xem tất cả information commands',
              emoji: "<a:thongbao:1049688020611235890>",
              value: '3',
            }
          ]),
      );

    const embed = new MessageEmbed()
      .setTitle("**HELP MENU**")
      .setDescription(`Choose a total command to see more command.\n\n> \`\Prefix\`\: ${config.prefix}\n> source bot King Devil`)
      .setImage("https://cdn.discordapp.com/attachments/1026644688180088922/1049642440539263056/giveaway.png")
      .setColor("#f4c2c2")


    let sendmsg = message.channel.send({ embeds: [embed], components: [row] })

    let embed1 = new MessageEmbed()
      .setColor('#FFFFFF')
      .setTitle('**HELP MENU**')
      .addFields(
        { name: "**CONFIG COMMANDS**", value: "`antilink`" })
      .setImage("https://cdn.discordapp.com/attachments/1026644688180088922/1049642440539263056/giveaway.png")
      .setColor("#f4c2c2")
      .setFooter('trang 1')

    let embed2 = new MessageEmbed()
      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields({ name: "**GIVEAWAYS COMMANDS**", value: " `start`, `end`, `reroll`, `edit`, `list`" })
      .setImage("https://cdn.discordapp.com/attachments/1026644688180088922/1049642440539263056/giveaway.png")
      .setColor("#f4c2c2")
      .setFooter('page 5')

    let embed3 = new MessageEmbed()
      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields(
        { name: "**INFO COMMANDS**", value: "`help`, `invite`, `embed`, `whois`" })
      .setImage("https://cdn.discordapp.com/attachments/1026644688180088922/1049642440539263056/giveaway.png")
      .setColor("#f4c2c2")
      .setFooter('page 6')


    const filter = i => i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 40000,
      componentType: "SELECT_MENU"
    });


    collector.on("collect", async (collected) => {
      const value = collected.values[0]
      if (value === "0") {
        collected.update({ embeds: [embed], components: [row] })
      }
      if (value === "1") {
        collected.update({ embeds: [embed1], components: [row] })
      }
      if (value === "2") {
        collected.update({ embeds: [embed2], components: [row] })
      }

    })


  }
}