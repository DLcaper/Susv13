const { Permissions } = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB()
module.exports = {
  name: "prefix",
  cooldown: 0,
  aliases: ["setprefix"],
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.ADMINISTRATOR)) return message.channel.send(`Bạn phải có quyền \`ADMINISTRATOR\` để cài đặt lệnh trong guild này!`)
    if (!args[0]) {
      return message.reply(`Bạn phải nhập prefix muốn đổi`)
    } else {
      let prefix = args[0]
      if (prefix.length > 2) return message.reply(`Chỉ được đặt tối đa 2 ký tự`)
      await db.set(`${message.guild.id}_prefix`, prefix)
      await message.reply(`${client.emo.done} Đã set prefix thành ${prefix}`)
    }
  }
}
