import express from "express";
import { Add,Remove,All } from "../Functions/Category/Functions.js";

const router = express.Router();

router.get("/All", async (req, res) => {
  console.log("Received request for all categories");
  const categories = await All();

  if (categories.success) {
    res.status(200).json({
      status: 200,
      data: categories.data,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Failed to fetch categories",
    });
  }
});

router.post("/Add", async (req, res) => {
  const category = req.body;

  const newCategory = await Add(category);

  if (newCategory.success) {
    res.status(200).json({
      status: 200,
      data: newCategory.data,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Failed to add category",
    });
  }
});

router.post("/Remove", async (req, res) => {
  const category = req.body;
  const removedCategory = await Remove(category);
  if (removedCategory.success) {
    res.status(200).json({
      status: 200,
      data: removedCategory.data,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Failed to remove category",
    });
  }
});
export default router;
