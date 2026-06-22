import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
  user_id: { type: String },
  recipe_ids: [
    {
      type: String,
      required: true,
    },
  ],
});

const Fav_Schema = mongoose.model("Favourites", schema);
export default Fav_Schema;
