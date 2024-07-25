const axios = require("axios");

const jiraBaseUrl = "https://sandsifyscrum.atlassian.net/rest/api/3";
const jiraAuth = {
	username: "sakinropo@gmail.com",
	password:
		"ATATT3xFfGF0JFnnsswC5LGMDFvKqCb8wfPBvT6-d24IgsncTE63Gdw09xEaMdOya3cP9cJ3Bh-3Hiz9k1hfvKWZEKvef49KrB_zLgzXTSTrW3DBqnt3e_l6Yq97PU7CUBbweJO6rQcfUQb-oC-iaFlw433aI7opKj3EvY53rIt4t-jBkZ7zmDo=010EAD4A",
};

const fetchJiraIssues = async (projectKey) => {
	const authString = `${jiraAuth.username}:${jiraAuth.password}`;
	const authHeader = `Basic ${Buffer.from(authString).toString("base64")}`;

	try {
		const response = await axios.get(`${jiraBaseUrl}/search`, {
			params: {
				jql: `project = "${projectKey}"`,
			},
			headers: {
				Accept: "application/json",
				Authorization: authHeader,
			},
		});
		// console.log("Jira issues fetched successfully:", response.data.issues);
		// Map the issues to the format expected by Sequelize
		const formattedIssues = response.data.issues.map((issue) => ({
			id: issue.id,
			key: issue.key,
			summary: issue.fields.summary,
			description: issue.fields.description,
			assignee: issue.fields.assignee ? issue.fields.assignee.displayName : "",
			status: issue.fields.status ? issue.fields.status.name : "",
			createdAt: issue.fields.created,
			updatedAt: issue.fields.updated,
		}));
		return formattedIssues;
	} catch (error) {
		console.error(
			"Error fetching Jira issues:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

module.exports = {
	fetchJiraIssues,
};
