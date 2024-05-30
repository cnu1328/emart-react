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
app.use(cors({ 
  origin : ["https://rgukt-emart.vercel.app"],
  methods: ["POST", "GET"]
}));
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


app.use("/", (req, res, next) => {
  res.json("It is working fine");
});

app.use("/test", (req, res, next) => {
  res.send("It is working fine");
});


app.use("/oauth", authRouter);
app.use("/user", userRouter);
app.use("/sell", productRouter);
app.use("/search", searchRouter);



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => app.listen(8080))
    .then(() => console.log("Server running at PORT : 2157  And MongoDB Database is connected."))
    .catch((err) => console.log(err));


export default app;


