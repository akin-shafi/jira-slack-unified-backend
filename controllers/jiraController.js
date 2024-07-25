const SlackMessage = require("../models/SlackMessage");
const JiraIssue = require("../models/JiraIssue");
const { fetchJiraIssues } = require("../services/jiraService");

const extractDescriptionText = (content) => {
	let text = "";
	content.forEach((item) => {
		if (item.type === "text" && item.text) {
			text += item.text + ", ";
		}
		if (item.content) {
			text += extractDescriptionText(item.content);
		}
	});
	return text;
};

const saveJiraIssues = async (req, res) => {
	const projectKey = req.query.projectKey;
	if (!projectKey) {
		return res.status(400).json({ message: "Project key is required" });
	}

	try {
		const issues = await fetchJiraIssues(projectKey);
		// console.log("Fetched issues:", issues);

		const formattedIssues = issues.map((issue) => {
			let description = "";

			if (typeof issue.description === "string") {
				description = issue.description;
			} else if (
				issue.description &&
				Array.isArray(issue.description.content)
			) {
				description = extractDescriptionText(issue.description.content).slice(
					0,
					-2
				); // Remove trailing comma and space
			}

			return {
				key: issue.key,
				summary: issue.summary || "",
				description,
				assignee: issue.assignee || "",
				status: issue.status || "",
				updatedAt: issue.updatedAt,
			};
		});

		// console.log("Formatted issues for insertion:", formattedIssues); // Log to verify formatted data

		for (const issue of formattedIssues) {
			// Check if the issue already exists in the database
			const existingIssue = await JiraIssue.findOne({
				where: { key: issue.key },
			});

			if (existingIssue) {
				// Check if the existing issue needs to be updated
				if (
					new Date(existingIssue.updatedAt).getTime() <
					new Date(issue.updatedAt).getTime()
				) {
					await existingIssue.update(issue);
					console.log(`Updated issue: ${issue.key}`);
				} else {
					console.log(`No update needed for issue: ${issue.key}`);
				}
			} else {
				// Create a new issue if it doesn't exist
				await JiraIssue.create(issue);
				console.log(`Created new issue: ${issue.key}`);
			}
		}

		res.json({ message: "Issues processed successfully" });
	} catch (error) {
		console.error("Error saving Jira issues:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getCombinedData = async (req, res) => {
	try {
		const messages = await SlackMessage.findAll();
		const issues = await JiraIssue.findAll();

		// Combining data for visualization
		const combinedData = {
			slackMessages: messages,
			jiraIssues: issues,
		};

		res.json(combinedData);
	} catch (error) {
		console.error("Error fetching combined data:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	// saveSlackMessages,
	saveJiraIssues,
	getCombinedData,
};
