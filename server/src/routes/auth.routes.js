import express from "express";
import { registerValidator, loginValidator } from "../middleware/validations.js";
import * as authController from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", registerValidator, authController.signup);
router.post("/login", loginValidator, authController.login);
router.get("/logout", authController.logout);
router.get("/token", authController.refreshToken);

export default router;