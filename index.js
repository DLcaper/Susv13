const { Client, Collection } = require('discord.js')
const client = new Client({ intents: 32767 });
module.exports = client;
client.snipes = new Collection();
client.anticrash = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.config = require('./botconfig/config.json');

const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  default: {
    botsCanWin: false,
    embedColor: "#2F3136",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: `🛑 **Last chance to enter** 🛑`,
      threshold: 5000,
      embedColor: '#FF0000'
    }
  }
});

const token = client.config.token
const fs = require('fs');
const path = require('path');
client.categories = fs.readdirSync(path.resolve('handlers'));
["commands", "events", "functions", "anticrash"].forEach(handlers => {
  console.log('loaded handlers')
  require(path.resolve(`handlers/${handlers}`))(client);
});

client.login(token)