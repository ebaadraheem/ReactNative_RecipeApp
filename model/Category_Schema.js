import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
  category_id: {
    type: String,
  },
  category: {
    type: String,
  },
  image_url: {
    type: String,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
