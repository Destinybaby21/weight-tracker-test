const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017//weight-tracker", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Define Weight Schema
const weightSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Weight = mongoose.model("Weight", weightSchema);

// API Endpoints

// Login endpoint
const validEmail = "test@example.com";
const validPassword = "password123";

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

// GET /weights - Fetch all weights
app.get("/weights", async (req, res) => {
  try {
    const weights = await Weight.find();
    res.status(200).json(weights);
  } catch (error) {
    console.error("Error fetching weights:", error);
    res.status(500).json({ message: "Error fetching weights", error });
  }
});


// GET /weights/:id - Fetch a specific weight by ID
app.get("/weights/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const weight = await Weight.findById(id);
    if (!weight) {
      return res.status(404).json({ message: "Weight entry not found" });
    }
    res.status(200).json(weight);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weight", error });
  }
});

// POST /weights - Add a new weight
app.post("/weights", async (req, res) => {
  const { weight } = req.body;

  if (!weight) {
    return res.status(400).json({ message: "Weight is required" });
  }

  try {
    const newWeight = new Weight({ weight });
    await newWeight.save();
    res.status(201).json(newWeight);
  } catch (error) {
    res.status(500).json({ message: "Error adding weight", error });
  }
});

// PUT /weights/:id - Update a weight entry
app.put("/weights/:id", async (req, res) => {
  const { id } = req.params;
  const { weight } = req.body;

  try {
    const updatedWeight = await Weight.findByIdAndUpdate(
      id,
      { weight },
      { new: true, runValidators: true }
    );

    if (!updatedWeight) {
      return res.status(404).json({ message: "Weight entry not found" });
    }

    res.status(200).json(updatedWeight);
  } catch (error) {
    res.status(500).json({ message: "Error updating weight", error });
  }
});

// DELETE /weights/:id - Delete a weight entry
app.delete("/weights/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWeight = await Weight.findByIdAndDelete(id);

    if (!deletedWeight) {
      return res.status(404).json({ message: "Weight entry not found" });
    }

    res.status(200).json({ message: "Weight entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting weight", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
