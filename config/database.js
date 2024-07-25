const { Sequelize } = require("sequelize");
const config = require("./config.json");
const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(config[env]);

// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log("Database connected...");
// 	})
// 	.catch((err) => {
// 		console.error("Error: " + err);
// 	});

// sequelize
// 	.sync({ force: false })
// 	.then(() => {
// 		console.log("Database & tables created!");
// 	})
// 	.catch((err) => {
// 		console.error("Error: " + err);
// 	});

module.exports = sequelize;
