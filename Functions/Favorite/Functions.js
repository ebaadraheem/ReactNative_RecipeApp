import Fav_Schema from "../../model/Fav_Schema.js";
import RecipeSchema from "../../model/Recipe_Schema.js";
export const All = async (id) => {
  try {
    // Check if the user has any favorites saved
    const userFavorites = await Fav_Schema.findOne({ user_id: id });

    if (userFavorites && userFavorites.recipe_ids.length > 0) {
      // Find the recipes that are in the user's favorites
      const recipes = (
        await Promise.all(
          userFavorites.recipe_ids.map(async (id) => {
            const res = await RecipeSchema.findOne({ recipe_id: id });
            return res || null; // Return null if not found
          })
        )
      ).filter(recipe => recipe !== null); // Filter out null recipes


      if (recipes.length > 0) {
        return { success: true, data: recipes };
      } else {
        return { success: false, message: "No recipes found" };
      }
    } else {
      return { success: false, message: "No favorites found" };
    }
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    return { success: false, message: "Error retrieving favorites" };
  }
};

export const Add = async (id, recipe_id) => {
  try {
    let userFavorites = await Fav_Schema.findOne({ user_id: id });

    if (userFavorites) {
      const existingFavorite = userFavorites.recipe_ids.find(
        (element) => element.toString() === recipe_id.toString()
      );
      if (existingFavorite) {
        return { success: false, message: "Favourite already exists" };
      }

      userFavorites.recipe_ids.push(recipe_id);
      await userFavorites.save();
      return { success: true, data: userFavorites };
    } else {
      const newFavorite = await Fav_Schema.create({
        user_id: id,
        recipe_ids: [recipe_id],
      });
      return { success: true, data: newFavorite };
    }
  } catch (error) {
    console.error("Error adding favourite:", error);
    return { success: false, message: error.message };
  }
};

export const Remove = async (id, recipe_id) => {
  try {
    let userFavorites = await Fav_Schema.findOne({ user_id: id });
    if (!userFavorites) {
      return { success: false, message: "No favourites found" };
    }
    const existingFavoriteIndex = userFavorites.recipe_ids.findIndex(
      (element) => element.toString() === recipe_id.toString()
    );
    if (existingFavoriteIndex === -1) {
      return { success: false, message: "Favourite not found" };
    }
    userFavorites.recipe_ids.splice(existingFavoriteIndex, 1);
    await userFavorites.save();
    return { success: true, data: userFavorites };
  } catch (error) {
    console.error("Error removing favourite:", error);
    return { success: false, message: error.message };
  }
};
