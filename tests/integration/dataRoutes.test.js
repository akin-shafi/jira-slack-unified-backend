const request = require("supertest");
const express = require("express");
const dataRoutes = require("../../routes/dataRoutes");
const { sequelize, SlackMessage, JiraIssue } = require("../../models");

const app = express();
app.use(express.json());
app.use("/api", dataRoutes);

beforeAll(async () => {
	await sequelize.sync({ force: true });
	// Seed the database with test data
	await SlackMessage.bulkCreate([
		{ text: "Test message 1" },
		{ text: "Test message 2" },
	]);
});

afterAll(async () => {
	await sequelize.close();
});

describe("Data Routes Integration Tests", () => {
	// it("should fetch and save Slack messages", async () => {
	// 	const response = await request(app).get("/api/slack");
	// 	expect(response.status).toBe(200);
	// 	const messages = await SlackMessage.findAll();
	// 	expect(messages.length).toBeGreaterThan(0);
	// });

	it("should fetch and save Jira issues", async () => {
		const response = await request(app).get("/api/jira?projectKey=BES");
		expect(response.status).toBe(200);
		const issues = await JiraIssue.findAll();
		expect(issues.length).toBeGreaterThan(0);
	});

	it("should fetch combined data from Slack and Jira", async () => {
		const response = await request(app).get("/api/combined");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("slackMessages");
		expect(response.body).toHaveProperty("jiraIssues");
	});
});
