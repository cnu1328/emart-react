import express from "express";
import { addToCart, checkCart, deleteProduct, getUser, viewProducts } from "../Controllers/userControllers.js";
import isAuthenticated from "../middleware/auth.js";
const router = express.Router();
router.get("/test", (req, res, next) => { res.send("It is working"); });
router.get("/:userId", getUser);
router.patch("/:productId", isAuthenticated, addToCart);
router.get("/check/:productId", isAuthenticated, checkCart);
router.get("/products/myProducts", isAuthenticated, viewProducts);
router.post("/:productId/delete", isAuthenticated, deleteProduct);
export default router;
//# sourceMappingURL=user.js.map