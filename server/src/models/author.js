import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

export default mongoose.model("Author",authorSchema);