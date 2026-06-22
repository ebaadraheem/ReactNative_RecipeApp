import express from "express";
import { Add, Remove, All } from "../Functions/Favorite/Functions.js";
const router = express.Router();
// Define the get data route
router.post("/All", async (req, res) => {
  const Id = req.body.user_id;
  const recipes = await All(Id);
  if (recipes.success) {
    res.status(200).json({
      status: 200,
      data: recipes.data,
    });
  } else {
    res.status(404).json({

      status: 404,
      message: "Failed to fetch recipes",
    });
  }
});
// Define the post data route
router.post("/Add", async (req, res) => {
  const id = req.body.user_id;
  const recipe_id = req.body.recipe_id;
  const fav = await Add(id, recipe_id);
  if (fav.success) {
    res.status(200).json({
      status: 200,
      data: fav.data,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Failed to add favourite",
    });
  }
});
router.post("/Remove", async (req, res) => {
  const id = req.body.user_id;
  const recipe_id = req.body.recipe_id;
  const fav = await Remove(id, recipe_id);
  if (fav.success) {
    res.status(200).json({
      status: 200,
      data: fav.data,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Failed to remove favourite",
    });
  }
});

export default router;
