import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
});

const Tags = mongoose.models.Tags || mongoose.model("Tags", tagsSchema);

export default Tags;
