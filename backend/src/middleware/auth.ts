import { Request, Response, NextFunction } from "express";
import ServerError from "../utils/ServerError.js";
import jwt from "jsonwebtoken";

export interface JWTPayload {
  _id: string;
  iat: number;
}   

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const AuthToken = req.headers["authorization"]?.split(" ")[1];
    
  if (!AuthToken) throw new ServerError(401, "Unauthorized");
  try {
    const decoded = <JWTPayload>jwt.verify(AuthToken, process.env.JWT_SECRET);

    req.userId = decoded._id;
    next();
  }

  catch(error) {
    throw new ServerError(401, "Unauthorized");
  }
  

  
};

export default isAuthenticated;
