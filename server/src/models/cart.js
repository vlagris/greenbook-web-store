import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  }
});



const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema]
}, {
  timestamps: true,
});




export const CartItemModel = mongoose.model("CartItem", cartItemSchema);
export default mongoose.model("Cart", cartSchema);