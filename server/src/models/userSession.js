import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true,
  },
});

export default mongoose.model("UserSession", userSessionSchema);