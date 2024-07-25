require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const dataRoutes = require("./routes/dataRoutes");
const setupSwagger = require("./swagger");

// Configure CORS to allow local ports for React, Angular, Vue, and Vite
app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"http://localhost:4200",
			"http://localhost:8080",
			"http://localhost:5173",
		],
	})
);

app.use(express.json());
app.use("/api", dataRoutes);

// Setup Swagger documentation
setupSwagger(app);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
