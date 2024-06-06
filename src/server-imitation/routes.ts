import {router} from "@/server-imitation/utils/router.ts"
import {getAll} from "@/server-imitation/controllers/genres.controller.ts";
import {getBooksFilters, getByGenre, getRecommended} from "@/server-imitation/controllers/books.controller.ts";
import {login, logout, refreshToken, signup} from "@/server-imitation/controllers/auth.controller.ts";
import {createCart, getCart, addItem, removeItem, updateItem} from "@/server-imitation/controllers/cart.controller.ts";


router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/logout", logout);
router.get("/auth/token", refreshToken);


router.get("/books/", getByGenre)
router.get("/books/filters", getBooksFilters);
router.get("/books/recommended", getRecommended);


router.get("/genres/", getAll);


router.post("/cart/", createCart);
router.get("/cart/", getCart);
router.post("/cart/:id", addItem);
router.patch("/cart/", updateItem);
router.delete("/cart/:id", removeItem);




export const routes = router.routes