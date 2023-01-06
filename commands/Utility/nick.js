const { Permissions } = require('discord.js')
module.exports = {
  name: "nickname",
  aliases: ['nick', 'name', 'user'],
  run: async(client, message, args) => {
    if(!message.guild.me.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) return message.reply(`I don't have premission change nickname!`);
    if(!args[0]) {
      message.channel.send("No user provided");
    }
    
    let member;
    try {
        member = message.mentions.members.first() || await message.guild.members.fetch({ user: args[0], force: true });
    } catch {
        message.channel.send('Please provide a valid user')
    }

    if (!member) message.reply("Please specify a member!");

    const arguments = args.slice(1).join(" ");

    if (!arguments) {
        try {
            member.setNickname(null);

            message.channel.send(`Nickname for **${member.user.tag}** reset`)

          } catch (err) {
            console.log(err);
          }
    }

    if (arguments) {
      try{
      member.setNickname(arguments)
      
      message.channel.send(`Nickname set to \`${arguments}\`.`)




    } catch (error) {
      console.log(error);

    }
}
  }
}