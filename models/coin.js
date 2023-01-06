const monggoes = require('mongoose')
const cointSchema = new monggoes.Schema({
    id: String,
    coins: Number
})

module.exports = monggoes.model('cointSchema', cointSchema)