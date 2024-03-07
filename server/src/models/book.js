import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  genres: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Genre",
    required: true,
  },
  authors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Author",
    required: true,
  },
  rating: {
    rate: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true
    }
  },
}, {
  timestamps: true,
});

export default mongoose.model("Book", bookSchema);


