import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import checkAuth from "../middleware/checkAuth.js";



const router = express.Router();

router.use(checkAuth);

router.get("/", cartController.getCart);
router.post("/items", cartController.addToCart);
router.delete("/items", cartController.removeFromCart);


export default router;