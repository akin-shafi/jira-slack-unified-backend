const { saveSlackMessages } = require("../controllers/slackController");
const SlackMessage = require("../models/SlackMessage");
jest.mock("../services/slackService");
jest.mock("../models/SlackMessage");

describe("Slack Controller", () => {
	it("should save Slack messages to the database", async () => {
		const mockMessages = [{ text: "Test message", updatedAt: new Date() }];
		const req = {};
		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		// Mock the Slack service functions
		const slackService = require("../services/slackService");
		slackService.fetchSlackMessages.mockResolvedValue(mockMessages);
		slackService.fetchChannelId.mockResolvedValue("C123");

		// Mock the SlackMessage model functions
		SlackMessage.findOne = jest.fn().mockResolvedValue(null);
		SlackMessage.create = jest.fn().mockResolvedValue(mockMessages[0]);

		await saveSlackMessages(req, res);

		expect(res.json).toHaveBeenCalledWith({
			message: "Messages processed successfully",
		});
		expect(SlackMessage.create).toHaveBeenCalledWith(mockMessages[0]);
	});
});