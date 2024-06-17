import express from "express";
import { addToCart, addWishlist, cartProducts, checkCart, getPaymentProcess, deleteProduct, getProducts, getPublishKey, getSecretKey, getUser, getWishlist, removeFromCart, removeWishlist, viewProducts, getAllUsers, getAdminProductDetails, getProductUserDetails } from "../Controllers/userControllers.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.get("/test", (req, res, next) => { res.send("It is working")});

router.get("/:userId", getUser);

router.patch("/:productId", isAuthenticated, addToCart);


router.get("/check/:productId", isAuthenticated, checkCart);

router.get("/products/myProducts", isAuthenticated,  viewProducts);

router.get("/products/mycart", isAuthenticated, cartProducts);


router.post("/:productId/delete", isAuthenticated, deleteProduct );

router.post("/:productId/removecart", isAuthenticated, removeFromCart);

router.post("/products", getProducts);

router.post("/wishlist/add", isAuthenticated, addWishlist);

router.post("/wishlist/remove", isAuthenticated, removeWishlist);

router.get("/wishlist/get", isAuthenticated, getWishlist);


router.get("/payment/publishable-key", getPublishKey);

router.post("/payment/create-payment-intent", getSecretKey);

router.post("/payment/create-checkout-session", getPaymentProcess);


router.get("/admin/users", getAllUsers);

router.get("/admin/products", getAdminProductDetails);

router.get("/admin/product/:productId", getProductUserDetails);

export default router;