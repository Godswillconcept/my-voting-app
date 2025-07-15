module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PollPlatform', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      platform_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Platform',
          key: 'id'
        }
      },
      poll_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Poll',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add unique constraint for platform_id and poll_id combination
    await queryInterface.addConstraint('PollPlatform', {
      fields: ['platform_id', 'poll_id'],
      type: 'unique',
      name: 'platform_poll_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove unique constraint first
    await queryInterface.removeConstraint('PollPlatform', 'platform_poll_unique');
    await queryInterface.dropTable('PollPlatform');
  }
};
