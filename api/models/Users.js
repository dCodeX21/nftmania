const mongoose = require('mongoose')
mongoose.pluralize(null);

const usersSchema = new mongoose.Schema({
  address: String
}, {timestamps: true})

module.exports = mongoose.model('users', usersSchema)