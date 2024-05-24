import express from "express";
import { config } from "dotenv";
import oauthRouter from './routes/oauth.js';
import requestRouter from './routes/request.js';
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import searchRouter from "./routes/search.js";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import isAuthenticated from "./middleware/auth.js";

config();

const app = express();

// Middlewares
app.use(cors({ origin : "http://localhost:5173", credentials: true}));
app.use(cookieParser(process.env.COOKIE_SECRET, )) //It is used to send the cookies from backend to frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

app.use("/test", (req, res, next) => {
  res.send("It is working fine");
});


app.use("/oauth", authRouter);
app.use("/user", userRouter);
app.use("/sell", productRouter);
app.use("/search", searchRouter);



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT))
    .then(() => console.log("Server running at PORT : " + process.env.PORT + " And MongoDB Database is connected."))
    .catch((err) => console.log(err));


export default app;


