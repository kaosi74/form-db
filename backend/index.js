import express from "express";
import mongoose from "mongoose";
import User from "./models/user.model.js";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like index.html) from the "frontend" folder
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cors({
  origin: ['http://localhost:5500'],
  

}))

// middleware
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.log("Please set the MONGODB_URI to your mongodb connection string");
  process.exit(1);
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("I'm working");
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.get("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// update user
app.put("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.delete("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

mongoose
  .connect(uri)
  .then(() => console.log("Connected successfully to the database"))
  .catch((e) => console.error(e));

app.listen(3000, () => console.log("Server is running on PORT 3000"));
