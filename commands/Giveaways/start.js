const ms = require("ms");
const messages = require("../../events/giveaways/message");
module.exports = {
  name: 'start',
  aliases: ['starts', 'create'],
  run: async (client, message, args) => {

    let giveawayDuration = args[0];

    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
      return message.reply(":x: You have to specify a valid duration!");
    }

    let giveawayNumberWinners = parseInt(args[1]);

    if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
      return message.reply(
        ":x: You have to specify a valid number of winners!"
      );
    }

    let giveawayPrize = args.slice(2).join(" ");
    if (!giveawayPrize) {
      return message.reply(":x: You have to specify a valid prize!");
    }
    // Start the giveaway
    await client.giveawaysManager.start(message.channel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayNumberWinners),
      hostedBy: client.config.hostedBy ? message.author : null,
      messages
    });
  }
}