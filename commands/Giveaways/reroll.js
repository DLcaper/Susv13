const ms = require('ms');
module.exports = {
    name: 'reroll',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.reply(':x: You need to have the manage messages permissions to reroll giveaways.');
        }
        if (!args[0]) {
            return message.reply(':x: You have to specify a valid message ID!');
        }
        let giveaway =
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        client.giveawaysManager.giveaways.find((g) => g.messageId == args[0]);
        if (!giveaway) {
            return message.reply('Unable to find a giveaway for `' + args.join(' ') + '`.');
        }
        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.reply('Giveaway rerolled!');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
                    message.reply('This giveaway is not ended!');
                } else {
                    console.error(e);
                    message.reply(e);
                }
            });

    }
}