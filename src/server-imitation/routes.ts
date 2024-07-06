import {router} from "@/server-imitation/utils/router.ts"
import {getAll} from "@/server-imitation/controllers/genres.controller.ts";
import {getBooksFilters, getByGenre, getRecommended} from "@/server-imitation/controllers/books.controller.ts";
import {login, logout, refreshToken, signup} from "@/server-imitation/controllers/auth.controller.ts";
import { getCart, addToCart, removeFromCart } from "@/server-imitation/controllers/cart.controller.ts";
import {getUser, updateEmail, updatePassword, updateUser} from "@/server-imitation/controllers/user.controller.ts";


router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/logout", logout);
router.get("/auth/token", refreshToken);


router.get("/user/", getUser);
router.patch("/user/", updateUser);
router.patch("/user/email", updateEmail);
router.patch("/user/password", updatePassword);


router.get("/books/", getByGenre)
router.get("/books/filters", getBooksFilters);
router.get("/books/recommended", getRecommended);


router.get("/genres/", getAll);


router.get("/cart/", getCart);
router.post("/cart/items", addToCart);
router.delete("/cart/items", removeFromCart);


export const routes = router.routes