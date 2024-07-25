const {
	fetchChannelId,
	fetchSlackMessages,
} = require("../services/slackService");
const SlackMessage = require("../models/SlackMessage");

const saveSlackMessages = async (req, res) => {
	try {
		const channelId = await fetchChannelId();
		if (channelId) {
			const messages = await fetchSlackMessages(channelId);
			if (Array.isArray(messages) && messages.length > 0) {
				for (const message of messages) {
					// Check if the message already exists in the database
					const existingMessage = await SlackMessage.findOne({
						where: { text: message.text },
					});

					if (existingMessage) {
						// Check if the existing message needs to be updated
						if (
							new Date(existingMessage.updatedAt).getTime() <
							new Date(message.updatedAt).getTime()
						) {
							await existingMessage.update(message);
							console.log(`Updated message: ${message.text}`);
						} else {
							console.log(`No update needed for message: ${message.text}`);
						}
					} else {
						// Create a new message if it doesn't exist
						await SlackMessage.create(message);
						console.log(`Created new message: ${message.text}`);
					}
				}
				res.json({ message: "Messages processed successfully" });
			} else {
				res
					.status(404)
					.json({ message: "No messages found or bot not in channel" });
			}
		} else {
			res
				.status(404)
				.json({ message: "Channel not found or bot not in channel" });
		}
	} catch (error) {
		console.error("Error saving Slack messages:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getMessages = async (req, res) => {
	try {
		const messages = await SlackMessage.findAll();
		res.status(200).json(messages);
	} catch (error) {
		console.error("Error fetching messages:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { saveSlackMessages, getMessages };
