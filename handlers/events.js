const fs = require('node:fs');
const path = require('node:path');
module.exports = (client) => {
  const eventFolder = fs.readdirSync('./events');
  for(const folder of eventFolder ) {
  const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    let pull = require(`../events/${folder}/${file}`);
    if (pull.name) {
      console.log('loaded event')
    }

    const event = require(`../events/${folder}/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    }
    else {
      client.on(event.name, (...args) => event.execute(...args));
    }

  }

  }
}