const mongoose = require("mongoose")

const antilinkSchema = mongoose.Schema({
    GuildID: String,
    UserID: String
});

const antilinkModel = module.exports = new mongoose.model('antilink', antilinkSchema)