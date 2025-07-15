const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PollPlatform = sequelize.define('PollPlatform', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  platform_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Platform',
      key: 'id'
    }
  },
  poll_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Poll',
      key: 'id'
    }
  }
}, {
  tableName: 'PollPlatform',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = PollPlatform;
