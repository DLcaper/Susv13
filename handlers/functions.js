const overrideWithinDay = false
const coinSchema = require('../models/coin');
const cooldownSchema = require('../models/cooldownSchema')
const DO = require('../config/do.json');
module.exports = (client) => {
  client.emo = DO.emo
  client.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  client.timeout = (id, cmd) => {
    cooldownSchema.findOne({ key: `${id}.${cmd}` }, async (err, data) => {
      if (err) throw err
      if (data) {
        data.cooldown = Date.now();
      } else {
        data = new cooldownSchema({ key: `${id}.${cmd}`, cooldown: Date.now() })
      }
      data.save();
    }
    );
  }
  client.cd = (id, cmd) => new Promise(async ful => {
    const data = await cooldownSchema.findOne({ key: `${id}.${cmd}` });
    if (!data) return ful(null);
    ful(data.cooldown);
  })
  client.checkcd = function(date, cd) {
    let timeout = date + cd;
    let temp = Math.trunc(((timeout - Date.now())) / 1000);
    let seconds = temp % 60;
    temp = Math.trunc(temp / 60);
    let minutes = temp % 60
    temp = Math.trunc(temp / 60);
    let hours = temp % 24;
    temp = Math.trunc(temp / 24);
    let days = temp;

    /* If there is no data */
    if (!date) return { after: true, s: seconds, m: minutes, h: hours, d: days };
    let diff = Date.now() - timeout
    /* Not past midnight */
    if (diff <= 0) return { after: false, diff: diff, s: seconds, m: minutes, h: hours, d: days };
    else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), s: seconds, m: minutes, h: hours, d: days };
  }
  client.newday = async function(date) {
    let now = new Date(Date.now() + 25200000);
    let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(Date.now() + 25200000));

    /* Calculate time until midnight */
    let temp = Math.trunc(((midnight - now) + 86400000) / 1000);
    let seconds = temp % 60;
    temp = Math.trunc(temp / 60);
    let minutes = temp % 60
    temp = Math.trunc(temp / 60);
    let hours = temp % 24;
    temp = Math.trunc(temp / 24);
    let days = temp;

    /* If there is no data */
    if (!date) return { after: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

    let pDate = new Date(date + 25200000);
    let diff = midnight - pDate;

    /* Not past midnight */
    if (diff <= 0) return { after: false, diff: diff, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

    /* Within 1 day */
    else if (diff <= 172810000) return { after: true, diff: diff, withinDay: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

    else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), seconds: seconds, minutes: minutes, hours: hours, days: days, now };
  }
}
