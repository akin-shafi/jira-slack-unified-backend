const { sequelize } = require("../models");

beforeAll(async () => {
	await sequelize.sync({ force: true });
});

afterAll(async () => {
	await sequelize.close();
});

test("database test placeholder", () => {
	expect(true).toBe(true);
});
