// models/SlackMessage.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SlackMessage = sequelize.define(
	"SlackMessage",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "SlackMessages",
		timestamps: true,
	}
);

module.exports = SlackMessage;
