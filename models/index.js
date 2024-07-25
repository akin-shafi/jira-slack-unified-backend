// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SlackMessage = require("./SlackMessage");
const JiraIssue = require("./JiraIssue");

module.exports = {
	sequelize,
	SlackMessage,
	JiraIssue,
};
