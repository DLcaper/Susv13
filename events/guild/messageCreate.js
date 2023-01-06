const { Permissions } = require('discord.js')
const client = require('../../index')
const config = require('../../botconfig/config.json')
const { QuickDB } = require('quick.db')
const db = new QuickDB()
module.exports = {
  name: 'messageCreate',
  async execute(message) {
    let prefix = await db.get(`${message.guildId}_prefix`)
    let defaultprefix = client.config.prefix
    if (!prefix) prefix = defaultprefix
    if (!message.content.toLowerCase(defaultprefix).startsWith(defaultprefix) && !message.content.toLowerCase(prefix).startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const args2 = message.content.slice(defaultprefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase()
    const cmd2 = args2.shift().toLowerCase()
    if (cmd.length === 0 || cmd2.length === 0) return;
    let command =
      client.commands.get(cmd) || client.commands.get(cmd2) ||
      client.commands.find((command) => command.aliases && command.aliases.includes(cmd)) || client.commands.find((command) => command.aliases && command.aliases.includes(cmd2));
    if (command) {
      if (!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return message.reply(`Tôi chưa có quyền gửi Embed Link!`)
      if (!message.guild.me.permissions.has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) return message.reply(`Tôi chưa có quyền gửi emoji bên ngoài server!`)
      let timeout = command.cooldown
      let lastused = await db.get(`CD${command.name}_${message.author.id}`)
      let used = client.checkcd(lastused, timeout)
      let canUse = used.after
      if (!canUse) {
        if (!command.error) {
          const delay = await message.channel.send(`${client.emo.fail} | **${message.author.username}**, từ từ nào, hãy chờ : \`${used.h + `:` + used.m + `:` + used.s}s\` để sử dụng lệnh tiếp`).catch((e) => console.log(e))
          await client.sleep(timeout - (Date.now() - lastused))
          await delay.delete()
        } else {
          const delay = await message.channel.send(`${client.emo.fail} | **${message.author.username}**, ${command.error}, xin hãy chờ : \`${used.h + `:` + used.m + `:` + used.s}s\` để sử dụng lệnh ${command.name}!`).catch((e) => console.log(e))
          await client.sleep(timeout - (Date.now() - lastused))
          await delay.delete()
        }
      }
      else {
        if (!command) return
        let a = await db.get(`${message.channel.id}_${command.name}`)
        if (a == `false`) return message.reply(`:x: | Lệnh đã bị vô hiệu hóa tại ${message.channel.name} ! `).then(async msg => {
          await client.sleep(4000)
          await msg.delete()
        })
        let runn = await command.run(client, message, args).catch((e) => console.log(e));
        await db.set(`CD${command.name}_${message.author.id}`, Date.now())
      };
    }
  }
}