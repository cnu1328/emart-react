import { emailLogIn, emailSignup, googleAuth, logout, tokenRefresh } from "../Controllers/authControllers.js";
import express from "express";

const router = express.Router();

router.get("/", googleAuth);
router.post("/logout", logout);
router.post("/token", tokenRefresh);
router.post("/register", emailSignup);
router.post("/login", emailLogIn);

export default router;