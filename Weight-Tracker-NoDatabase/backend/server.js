const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Hardcoded login credentials
const validEmail = "test@example.com";
const validPassword = "password123";

// In-memory storage for weights
let weights = [];

weights = [
  { id: "1", weight: 90 },
  { id: "2", weight: 75 },
  { id: "3", weight: 50 },
];

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email === validEmail && password === validPassword) {
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid email or password" });
});

// Weight tracker endpoints

// GET /weights - Fetch all weights
app.get("/weights", (req, res) => {
  res.status(200).json(weights);
});

// GET /weights/:id - Fetch a specific weight by ID
app.get("/weights/:id", (req, res) => {
  const { id } = req.params;
  const weightEntry = weights.find((entry) => entry.id === id); // Match by UUID or number
  if (!weightEntry) {
    return res.status(404).json({ message: "Weight entry not found" });
  }
  res.status(200).json(weightEntry);
});

// POST /weights - Add a new weight
app.post("/weights", (req, res) => {
  const { weight } = req.body;

  if (!weight) {
    return res.status(400).json({ message: "Weight is required" });
  }

  const newWeight = { id: uuidv4(), weight };
  weights.push(newWeight);
  res.status(201).json(newWeight);
});

// PUT /weights/:id - Update a weight entry
app.put("/weights/:id", (req, res) => {
  const { id } = req.params;
  const { weight } = req.body;

  const weightEntry = weights.find((entry) => entry.id === id);
  if (!weightEntry) {
    return res.status(404).json({ message: "Weight entry not found" });
  }

  weightEntry.weight = weight || weightEntry.weight;
  res.status(200).json(weightEntry);
});

// DELETE /weights/:id - Delete a weight entry
app.delete("/weights/:id", (req, res) => {
  const { id } = req.params;

  const index = weights.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Weight entry not found" });
  }

  weights.splice(index, 1);
  res.status(200).json({ message: "Weight entry deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
