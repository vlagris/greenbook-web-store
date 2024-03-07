import express from "express";
import * as genresController from "../controllers/genres.controller.js";

const router = express.Router();

router.get("/", genresController.getAll);


export default router;