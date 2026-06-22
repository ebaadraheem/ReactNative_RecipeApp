import RecipeSchema from "../../model/Recipe_Schema.js";
import fs from "fs"; // Required for file system operations
import multer from "multer"; // Required for file uploads
import s3 from "../../AWS/Setup.js";

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

export const Add = async (data) => {
  try {
    // Create a new instance of the RecipeSchema with the provided data
    const schema = new RecipeSchema(data);

    // Save the recipe to the database
    const res = await schema.save();

    // Check if the recipe was successfully saved and log the appropriate message
    if (res) {
      return { success: true, data: res };
    } else {
      return { success: false, message: "Failed to add recipe" };
    }
  } catch (error) {
    // Handle any potential errors during the saving process
    console.error("Error adding recipe:", error);
    return { success: false, message: error.message };
  }
};

export const Delete = async (id) => {
  try {
    // Find the recipe with the provided ID and delete it
    const res = await RecipeSchema.findOneAndDelete({ recipe_id: id });

    // Check if the recipe was successfully deleted and log the appropriate message
    if (res) {
      return { success: true, data: res };
    } else {
      return { success: false, message: "Failed to delete recipe" };
    }
  } catch (error) {
    // Handle any potential errors during the deletion process
    console.error("Error deleting recipe:", error);
    return { success: false, message: error.message };
  }
};

export const All = async () => {
  try {
    const recipes = await RecipeSchema.find();
    if (recipes) {
      return { success: true, data: recipes };
    } else {
      return { success: false, message: "Failed to fetch recipes" };
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { success: false, message: error.message };
  }
};

export const User_Recipes = async (id) => {
  try {
    // Find all recipes that have the provided user ID
    const res = await RecipeSchema.find({ user_id: id });

    // Check if any recipes were found and log the appropriate message
    if (res) {
      return { success: true, data: res };
    } else {
      return { success: false, message: "Failed to find recipes" };
    }
  } catch (error) {
    // Handle any potential errors during the search process
    console.error("Error finding recipes:", error);
    return { success: false, message: error.message };
  }
};

// Function to handle uploading file to S3
export const uploadImage = (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`, // Unique file name
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject({ success: false, error: err });
      } else {
        resolve({ success: true, data: data.Location });
      }
    });
  });
};

