import express from "express";
import * as booksController from "../controllers/books.controller.js";

const router = express.Router();

router.get("/", booksController.getByGenre);
router.get("/filters", booksController.getBooksFilters);

router.get("/recommended", booksController.getRecommended);



export default router;