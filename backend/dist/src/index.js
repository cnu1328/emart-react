import express from "express";
import { config } from "dotenv";
import authRouter from "../routes/auth.js";
import userRouter from "../routes/user.js";
import productRouter from "../routes/product.js";
import cors from "cors";
import mongoose from "mongoose";
config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/test", (req, res, next) => {
    res.send("It is working fine");
});
app.use("/oauth", authRouter);
app.use("/user", userRouter);
app.use("/sell", productRouter);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT))
    .then(() => console.log("Server running at PORT : " + process.env.PORT + " And MongoDB Database is connected."))
    .catch((err) => console.log(err));
export default app;
//# sourceMappingURL=index.js.map