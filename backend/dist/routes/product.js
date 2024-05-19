import express from "express";
import { addProduct, getHomeProducts, getProduct } from "../Controllers/productController.js";
import isAuthenticated from "../middleware/auth.js";
import { querySearch } from "../Controllers/searchControllers.js";
const router = express.Router();
// Test This root is working or not
router.get("/test", (req, res, next) => { res.send("It is working"); });
// Add Products
router.post("/add", isAuthenticated, addProduct);
// Get Home page posts
router.get("/home", getHomeProducts);
// Search
router.post("/:query", querySearch);
// Get particular Product
router.get("/:productId", getProduct);
export default router;
//# sourceMappingURL=product.js.map