module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("JiraIssue", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			key: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			fields: {
				type: Sequelize.JSONB,
			},
			// Add other columns here
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("JiraIssue");
	},
};
