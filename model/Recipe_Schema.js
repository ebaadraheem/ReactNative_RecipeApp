import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = new Schema({
  user_id: { type: String },
  recipe_id: { type: String },
  title: { type: String },
  recipe: { type: String },
  ingredients: { type: Array },
  category: { type: String },
  type: { type: String },
  image_url: { type: String },
  posted_by: { type: String },
});
const RecipeSchema = mongoose.model("Recipe", schema);
export default RecipeSchema;
