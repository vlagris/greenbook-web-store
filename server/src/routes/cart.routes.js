import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import checkAuth from "../middleware/checkAuth.js";


const router = express.Router();

router.use(checkAuth);

router.post("/", cartController.createCart);
router.get("/", cartController.getCart);
router.post("/:id", cartController.addItem);
router.patch("/:id", cartController.updateItem);
router.delete("/:id", cartController.removeItem);


export default router;