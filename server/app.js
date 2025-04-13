const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/students");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 3001;
// Listen on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
	console.log(`Node.js server listening on port ${PORT}`);
});
