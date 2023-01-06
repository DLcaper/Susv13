const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "dm",
  aliases: ['dms'],
  description: "Send DM message to a user",
  run: async (client, message, args) => {
    if (message.guild.id !== `your server id`) return
    message.delete();
    const userid = args[0];
    if (!userid) {
      return message.channel.send("Enter an ID");
    }
    const msg = args.slice(1).join(" ");
    if (!msg) {
      return message.channel.send("Enter the message");
    }
    const user = client.users.cache.get(`${userid}`);
    const embed = new MessageEmbed()
      .setTitle("ADMIN Devil DM!")
      .setDescription(`${msg}`)
      .setFooter("Regards, Infinity Mod Team")
      .setColor("RANDOM");

    user.send({ embeds: [embed] });
  },
  catch(error) {
    const errorlogs = client.channels.cache.get("1005683605781102632");
    message.channel.send("lỗi cmnr");
    errorlogs.send("lỗi ở lệnh dms\n lỗi ở :\n" + error);
  },
};
