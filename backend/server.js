import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Recipe from "./routes/Recipe.js";
import Favourites from "./routes/Favourites.js";
import Category from "./routes/Category.js";

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use correct port (Azure assigns one)
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
const uri = process.env.Mongoose_Connection_String;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("✅ Connected to DB");
});

// ✅ Routes
app.use("/Recipe", Recipe);
app.use("/Favourites", Favourites);
app.use("/Category", Category);

app.get("/", (req, res) => {
  res.send("Recipe App server is running....");
});

// ✅ Listen on Azure’s dynamic port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
