import express from "express";
import { config } from "dotenv";
import oauthRouter from './src/routes/oauth.js';
import requestRouter from './src/routes/request.js';
import authRouter from "./src/routes/auth.js";
import userRouter from "./src/routes/user.js";
import productRouter from "./src/routes/product.js";
import searchRouter from "./src/routes/search.js";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import isAuthenticated from "./src/middleware/auth.js";
// import adminRouter from "./src/routes/admin.js";

config();

const app = express();

// Middlewares
const corsOptions = {
  // origin: 'https://rgukt-emart.vercel.app',
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser(process.env.COOKIE_SECRET,)) //It is used to send the cookies from backend to frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}


// app.use("/", (req, res, next) => {
//   res.json("It is working fine");
// });

app.use("/test", (req, res, next) => {
  res.send("It is working fine");
});


app.use("/oauth", authRouter);
app.use("/user", userRouter);
app.use("/sell", productRouter);
app.use("/search", searchRouter);
// app.use("/admin", adminRouter);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT))
  .then(() => console.log("Server running at PORT : 5000  And MongoDB Database is connected."))
  .catch((err) => console.log(err));


export default app;


