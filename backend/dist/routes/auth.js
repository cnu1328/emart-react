import { googleAuth, logout, tokenRefresh } from "../Controllers/authControllers.js";
import express from "express";
const router = express.Router();
router.get("/", googleAuth);
router.post("/logout", logout);
router.post("/token", tokenRefresh);
export default router;
//# sourceMappingURL=auth.js.map