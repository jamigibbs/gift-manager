const Sequelize = require('sequelize')
const db = require('../db')

const Gift = db.define('gift', {
  purchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Gift
