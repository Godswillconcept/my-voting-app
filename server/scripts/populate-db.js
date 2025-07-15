require('dotenv').config();
const { faker } = require('@faker-js/faker');
const { Sequelize } = require('sequelize');
const { User, Platform, Poll, PollPlatform, Candidate, Vote, Review } = require('../models/index');
const { generate: generateUser } = require('../fakers/user');
const { generate: generatePlatform } = require('../fakers/platform');
const { generate: generatePoll } = require('../fakers/poll');
const { generate: generatePollPlatform } = require('../fakers/poll-platform');
const { generate: generateCandidate } = require('../fakers/candidate');
const { generate: generateVote } = require('../fakers/vote');
const { generate: generateReview } = require('../fakers/review');

// Initialize Sequelize connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_voting_app_development',
  logging: console.log
});

async function populateDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Create users
    const users = Array.from({ length: 10 }, () => generateUser());
    const createdUsers = await User.bulkCreate(users, { returning: true });

    // Create platforms
    const platforms = Array.from({ length: 5 }, () => generatePlatform());
    const createdPlatforms = await Platform.bulkCreate(platforms, { returning: true });

    // Create polls
    const polls = Array.from({ length: 3 }, () => generatePoll());
    const createdPolls = await Poll.bulkCreate(polls, { returning: true });

    // Create poll-platform relationships
    const pollPlatforms = createdPolls.flatMap(poll =>
      createdPlatforms.map(platform => generatePollPlatform(platform.id, poll.id))
    );
    await PollPlatform.bulkCreate(pollPlatforms);

    // Create candidates
    const candidates = [];
    createdPolls.forEach(poll => {
      // Create candidates for each platform in this poll
      const platformIds = createdPlatforms.map(platform => platform.id);
      candidates.push(...Array.from({ length: 3 }, () => generateCandidate(platformIds[Math.floor(Math.random() * platformIds.length)], poll.id)));
      
      // Create some independent candidates
      candidates.push(...Array.from({ length: 2 }, () => generateCandidate(null, poll.id)));
    });
    const createdCandidates = await Candidate.bulkCreate(candidates, { returning: true });

    // Create votes
    const votes = [];
    createdPolls.forEach(poll => {
      const pollCandidates = createdCandidates.filter(candidate => candidate.poll_id === poll.id);
      if (pollCandidates.length > 0) {
        createdUsers.forEach(user => {
          // Each user votes in each poll
          const randomCandidate = pollCandidates[Math.floor(Math.random() * pollCandidates.length)];
          votes.push(generateVote(user.id, poll.id, randomCandidate.id));
        });
      }
    });
    await Vote.bulkCreate(votes);

    // Create reviews (skip if table doesn't exist)
    try {
      const reviews = [];
      createdPolls.forEach(poll => {
        // Some users leave reviews for each poll
        createdUsers.forEach(user => {
          if (Math.random() < 0.4) { // 40% chance of leaving a review
            reviews.push(generateReview(user.id, poll.id));
          }
        });
      });
      await Review.bulkCreate(reviews);
    } catch (error) {
      console.log('Skipping reviews - table may not exist:', error.message);
    }

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

populateDatabase();
