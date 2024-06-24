import express from "express";
import * as userController from "../controllers/user.controller.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.use(checkAuth);

router.get("/", userController.getUser);
router.patch("/", userController.updateUser);
router.patch("/email", userController.updateEmail);
router.patch("/password", userController.updatePassword);


export default router;