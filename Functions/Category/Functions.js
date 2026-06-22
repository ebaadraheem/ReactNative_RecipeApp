import Category from "../../model/Category_Schema.js";
export const All = async () => {
  try {
      const res = await Category.find();
      if (res) {
      return { success: true, data: res };
      } else {
      return { success: false, message: "Failed to fetch Category" };
      }
  } catch (error) {
      console.error("Error fetching Category:", error);
      return { success: false, message: error.message };
  }
  }
  
export const Add = async (data) => {

  try {
    const schema = new Category(data);

    const res = await schema.save();

    if (res) {
      return { success: true, data: res };
    } else {
      return { success: false, message: "Failed to add Category" };
    }
  } catch (error) {
    console.error("Error adding Category:", error);
    return { success: false, message: error.message };
  }
};

export const Remove = async (data) => {
  try {
    const res = await Category.deleteOne({ category_id: data.category_id });
    if (res) {
      return { success: true, data: res };
    } else {
      return { success: false, message: "Failed to remove Category" };
    }
  } catch (error) {
    console.error("Error removing Category:", error);
    return { success: false, message: error.message };
  }
};