//chưa xong =))
const { Captcha } = require('captcha-canvas');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'captcha',
    run: async(client, message, args) => {
        //cmd đang sửa
        const capt = new Captcha()
        .drawTrace()
        .addDecoy()
        .drawCaptcha()
        .drawImage()
        const role = message.mentions.roles.first()
        if(!role) {
            return message.channel.send('please mention your role') //trong string ghi gì tùy tiếng việt cg dc
        }
    }
}