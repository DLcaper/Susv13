const config = require('../../botconfig/config.json')
module.exports = {
  giveaway:
    "<a:giveawayss:1019214157280723055> **GIVEAWAY** <a:giveawayss:1019214157280723055>",
  giveawayEnded:
    "<a:giveawayss:1019214157280723055> **GIVEAWAY ENDED** <a:giveawayss:1019214157280723055>",
  drawing:  `Ends: **{timestamp}**`,
  inviteToParticipate: `React with <a:giveawayss:1019214157280723055> to participate!`,
  winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "Giveaways",
  noWinner: "Giveaway cancelled, no valid participations.",
  hostedBy: "Hosted by: {this.hostedBy}",
  winners: "winner(s)",
  endedAt: "Ended at"
}