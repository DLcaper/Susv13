module.exports = {
  name: "baucua",
  aliases: ["bc"],
  cooldown: 0,
  run: async (client, message, args) => {
    let thu = [
      ":hatched_chick:",
      ":deer:",
      ":lobster:",
      ":squid:",
      ":crab:",
      ":tropical_fish:"
    ]

    let thuString = {
      ":hatched_chick:": "**Gà**",
      ":deer:": "**Nai**",
      ":lobster:": "**Tôm**",
      ":squid:": "**Bầu**",
      ":crab:": "**Cua**",
      ":tropical_fish:": "**Cá**"
    }
    let con1 = thu[Math.floor(Math.random() * thu.length)]
    let con2 = thu[Math.floor(Math.random() * thu.length)]
    let con3 = thu[Math.floor(Math.random() * thu.length)]
    let thuS1 = thuString[con1]
    let thuS2 = thuString[con2]
    let thuS3 = thuString[con3]
    let msg = await message.reply(`**lắc nè lắc nè**`).catch(e => console.log(e))
    await msg.edit(`<a:xocdia:1057615352525238303> <a:xocdia:1057615352525238303> <a:xocdia:1057615352525238303>`)
    await client.sleep(1000)
    await msg.edit(`${con1} <a:xocdia:1057615352525238303> <a:xocdia:1057615352525238303>`)
    await client.sleep(1000)
    await msg.edit(`${con1} ${con2} <a:xocdia:1057615352525238303>`)
    await client.sleep(1000)
    await msg.edit(`${con1} ${con2} ${con3}`)
    await message.channel.send(`Kết quả: __${thuS1} • ${thuS2} • ${thuS3}__`,).catch(e => console.log(e))
  }
};
