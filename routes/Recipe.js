import express from "express";
import { User_Recipes, All, Add,Delete,uploadImage } from "../Functions/Recipe/Functions.js";
import multer from "multer";
const router = express.Router();
// Define the get data route
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

router.get("/All", async (req, res) => {
  const recipes = await All();
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
  const data = req.body;
  const response = await Add(data);

  res.status(200).json({
    status: 200,
    message: "Recipe added successfully",
    data: response.data,
  });
});
router.post("/Delete", async (req, res) => {
  const id = req.body.recipe_id;
  const response = await Delete(id);
  if (response.success) {
    res.status(200).json({
      status: 200,
      message: "Recipe deleted successfully",
      data: response.data,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Failed to delete recipe",
    });
  }
});

router.post("/User_Recipes", async (req, res) => {
  const id = req.body.id;
  const recipes = await User_Recipes(id);
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
// Route to handle file upload
router.post('/UploadImage', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 400, message: 'No file uploaded.' });
    }
    const response = await uploadImage(req.file);
    if (response.success) {
      res.status(200).json({
        status: 200,
        data: response.data,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: 'Failed to upload image',
      });
    }
  } catch (error) {
    console.error('Error uploading image:', error); 
    res.status(500).json({
      status: 500,
      message: 'An error occurred',
      error,
    });
  }
});
export default router;