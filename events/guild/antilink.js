const antilinkData = require("../../models/antilink");
const ms = require('ms')
const client = require('../../index')
const { Permissions } = require('discord.js')

client.on('messageCreate', async message => {
  const antilink = await antilinkData.findOne({
    GuildID: message.guild.id,
    UserID: message.author.id,
  });
  if (antilink) {
    let UserID = await message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    if (
      message.content("https://discord.gg") ||
      message.content("discord.gg")
    ) {
      message.delete();
      let msg = message.channel.send("No links allowed while anti-link is active!").then((msg) => {
          let time = "2s";
          setTimeout(function () {
            msg.delete();
          }, ms(time));
        });
    } else if (UserID) return
  }
})
