import express from "express";
import authRoutes from "./auth.routes.js";
import cartRoutes from "./cart.routes.js";
import booksRoutes from "./books.routes.js";
import genresRoutes from "./genres.routes.js";


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/books', booksRoutes);
router.use('/genres', genresRoutes);
router.use('/cart', cartRoutes);

export default router;
