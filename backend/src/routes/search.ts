import express from "express";
import { querySearch } from "../Controllers/searchControllers.js";

const router = express.Router();

router.get("/test", (req, res, next) => { res.send("It iw working")});

router.post("/:query", querySearch);

export default router;