const { MessageActionRow, MessageEmbed , MessageButton} = require("discord.js") 

module.exports = {
  name: "invite",
  run: async(client,message,args) => {

const row = new MessageActionRow() 
    .addComponents(
      new MessageButton()
      .setLabel("Invite")
      
      .setStyle("LINK") 
.setEmoji("➕")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=1005462207024353344&permissions=2416232656&scope=bot"),
      new MessageButton()
      .setLabel("Invite admin")
      
      .setStyle("LINK") 
.setEmoji("❗")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=1005462207024353344&permissions=2416232656&scope=bot"),
    );

let embed = new MessageEmbed()
    .setTitle(`Invite Me!`)
    .setDescription(`invite ${client.user.username} join your server!`)
    .setFooter(client.user.tag, client.user.displayAvatarURL({dynamic:true}))
    .setColor("#f4c2c2")
    .setTimestamp()


    
    message.channel.send({embeds: [embed], components: [row]})
}
}