import express from "express";
import * as userController from "../controllers/user.controller.js";
import checkAuth from "../middleware/checkAuth.js";


const router = express.Router();

router.get("/me", checkAuth, userController.getMe);

export default router;