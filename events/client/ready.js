const client = require('../../index')
const mongoose = require('mongoose')
const config = require('../../botconfig/config.json')
client.on("ready", async () => {
    const mongo_url = client.config.mongo_url;
    
    mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(console.log(`Connected to MONGODB`));
    client.user.setActivity(`${client.guilds.cache.size} server`, {
      type: "STREAMING",
      url: "https://www.twitch.tv/dlcaper"
    })
  }
)