const express = require("express");
const router = express.Router();
const { saveSlackMessages } = require("../controllers/slackController");
const {
	saveJiraIssues,
	getCombinedData,
} = require("../controllers/jiraController");

/**
 * @swagger
 * /api/slack:
 *   get:
 *     summary: Fetch and save Slack messages
 *     responses:
 *       200:
 *         description: Successfully processed messages
 *       404:
 *         description: No messages found or bot not in channel
 *       500:
 *         description: Internal server error
 */
router.get("/slack", saveSlackMessages);

/**
 * @swagger
 * /api/jira:
 *   get:
 *     summary: Fetch and save Jira issues
 *     parameters:
 *       - in: query
 *         name: projectKey
 *         schema:
 *           type: string
 *           example: BES
 *         required: true
 *         description: Project key to fetch issues
 *     responses:
 *       200:
 *         description: Successfully processed issues
 *       400:
 *         description: Project key is required
 *       500:
 *         description: Internal server error
 */

router.get("/jira", saveJiraIssues);

/**
 * @swagger
 * /api/combined:
 *   get:
 *     summary: Fetch combined data from Slack and Jira
 *     responses:
 *       200:
 *         description: Successfully fetched combined data
 *       500:
 *         description: Internal server error
 */
router.get("/combined", getCombinedData);

module.exports = router;
