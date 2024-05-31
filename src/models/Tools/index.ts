import mongoose from "mongoose";

const toolsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  src: { type: String, required: true },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tags", 
    required: true,
  },
  minMax:[Number,Number]
});

const Tools = mongoose.models.Tools || mongoose.model("Tools", toolsSchema);

export default Tools;
