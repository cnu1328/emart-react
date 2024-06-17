import express from "express";

import { getAllUsers } from "../Controllers/userControllers"

const router = express();

router.get("/users", getAllUsers)


export default router;