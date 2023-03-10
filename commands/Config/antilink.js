const antilinkModel = require("../../models/antilink");
const antilink = require('../../events/guild/antilink');
const { Permissions } = require('discord.js')
module.exports = {
  name: "antilink",
  description: "Setup antilink per server!",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply(`${client.emo.fail} | Bạn phải có quyền \`ADMINISTRATOR\` để cài đặt lệnh trong guild này!`)
    if (!args[0]) {
      return message.channel.send(
        `Usage: \`${message.client.antilink} antilink <on|off>\``
      );
    }
    if (args[0] === "On" || args[0] === "on") {
      const data = await antilinkModel.findOne({
        GuildID: message.guild.id,
      });

      if (data) {
        await antilinkModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        message.channel.send(`Antilink is now active!`);

        let newData = new antilinkModel({
          GuildID: message.guild.id,
        });
        newData.save();
      } else if (!data) {
        message.channel.send(`Antilink is now active`);

        let newData = new antilinkModel({
          GuildID: message.guild.id,
        });
        newData.save();
      }
    } else if (args[0] === "off" || args[0] === "Off") {
      const data2 = await antilinkModel.findOne({
        GuildID: message.guild.id,
      });

      if (data2) {
        await antilinkModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        return message.channel.send(`Antilink has been turned off!`);
      } else if (!data2) {
        return message.channel.send(`Antilink isn't setup!`);
      }
    }
  },
};