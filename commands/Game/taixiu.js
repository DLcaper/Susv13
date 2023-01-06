module.exports = {
    name: "taixiu",
    aliases: ["tx"],
    cooldown: 0,
    run: async (client, message, args) => {
        let thu = [
            "<:tai1:1057615150494011452>",
            "<:tai2:1057615180743319643>",
            "<:tai3:1057615213047844864>",
            "<:tai4:1057615242919686214>",
            "<:tai5:1057615274372763709>",
            "<:tai6:1057615307969146890>",
        ]
        let thuString = {
            "<:tai1:1057615150494011452>": "**Một**",
            "<:tai2:1057615180743319643>": "**Hai**",
            "<:tai3:1057615213047844864>": "**Ba**",
            "<:tai4:1057615242919686214>": "**Bốn**",
            "<:tai5:1057615274372763709>": "**Năm**",
            "<:tai6:1057615307969146890>": "**Sáu**"
        }
        let con1 = thu[Math.floor(Math.random() * thu.length)]
        let con2 = thu[Math.floor(Math.random() * thu.length)]
        let con3 = thu[Math.floor(Math.random() * thu.length)]
        let thuS1 = thuString[con1]
        let thuS2 = thuString[con2]
        let thuS3 = thuString[con3]
        let msg = await message.reply(`**lắc nè lắc nè**`).catch(e => console.log(e))
        await msg.edit(`<a:lac:1057615115375087616> <a:lac:1057615115375087616> <a:lac:1057615115375087616>`)
        await client.sleep(1000)
        await msg.edit(`${con1} <a:lac:1057615115375087616> <a:lac:1057615115375087616>`)
        await client.sleep(1000)
        await msg.edit(`${con1} ${con2} <a:lac:1057615115375087616>`)
        await client.sleep(1000)
        await msg.edit(`${con1} ${con2} ${con3}`)
        let quan = {
            "<:tai1:1057615150494011452>": 1,
            "<:tai2:1057615180743319643>": 2,
            "<:tai3:1057615213047844864>": 3,
            "<:tai4:1057615242919686214>": 4,
            "<:tai5:1057615274372763709>": 5,
            "<:tai6:1057615307969146890>": 6
        }
        let so1 = quan[con1]
        let so2 = quan[con2]
        let so3 = quan[con3]
        let tong = so1 + so2 + so3
        let ketqua
        let ketqua2
        if (tong >= 11) ketqua = "**Tài**"
        else if (tong < 11) ketqua = "**Xỉu**"
        if (tong % 2 == 0) ketqua2 = "**Chẵn**"
        else ketqua2 = "**Lẻ**"
        let ketquaString = `__${ketqua} ${ketqua2}__`
        await message.channel.send(`Kết quả: __${thuS1} • ${thuS2} • ${thuS3}
      ${ketquaString}`,).catch(e => console.log(e))
    }
};
