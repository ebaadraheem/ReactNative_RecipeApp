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

const port = 3000;
const db = mongoose.connection;
const uri = process.env.Mongoose_Connection_String;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to DB");
});
app.use(express.json());

app.use("/Recipe", Recipe);

app.use("/Favourites", Favourites);

app.use("/Category", Category);
app.get("/", (req, res) => {
  res.send("Recipe App server is running....");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

