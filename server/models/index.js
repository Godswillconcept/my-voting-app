const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import all models
const User = require('./User');
const Platform = require('./Platform');
const Poll = require('./Poll');
const PollPlatform = require('./PollPlatform');
const Candidate = require('./Candidate');
const Vote = require('./Vote');
const Review = require('./Review');

// Define associations
User.hasMany(Vote, { foreignKey: 'user_id' });
User.hasMany(Review, { foreignKey: 'user_id' });

Platform.hasMany(PollPlatform, { foreignKey: 'platform_id' });
Platform.hasMany(Poll, { foreignKey: 'platform_id' });
Platform.hasMany(Candidate, { foreignKey: 'platform_id' });

Poll.hasMany(PollPlatform, { foreignKey: 'poll_id' });
Poll.hasMany(Candidate, { foreignKey: 'poll_id' });
Poll.hasMany(Vote, { foreignKey: 'poll_id' });
Poll.hasMany(Review, { foreignKey: 'poll_id' });

PollPlatform.belongsTo(Platform, { foreignKey: 'platform_id' });
PollPlatform.belongsTo(Poll, { foreignKey: 'poll_id' });

Candidate.belongsTo(Platform, { foreignKey: 'platform_id' });
Candidate.belongsTo(Poll, { foreignKey: 'poll_id' });

Vote.belongsTo(User, { foreignKey: 'user_id' });
Vote.belongsTo(Poll, { foreignKey: 'poll_id' });
Vote.belongsTo(Candidate, { foreignKey: 'candidate_id' });

Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Poll, { foreignKey: 'poll_id' });

// Export all models
module.exports = {
  User,
  Platform,
  Poll,
  PollPlatform,
  Candidate,
  Vote,
  Review,
  sequelize,
  DataTypes
};
