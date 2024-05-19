import asyncHandler from 'express-async-handler';
import User from "../models/User.js";
import ServerError from "../utils/ServerError.js";
import Product from "../models/Product.js";
import { NextFunction, Request, Response } from "express";
// Get user details

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError(400, "User doesn't exist");
  res.json(user);
});

// Add to Cart(add a product to the user cart list)

export const addToCart = asyncHandler(async (req: Request, res : Response, next : NextFunction) => {
  
  const { userId } = req;
  const { productId } = req.params;

  
  const user = await User.findById(userId);

  if(!user) throw new ServerError(400, "User doesn't exit");

  const product = await Product.findById(productId);

  if(!product) throw new ServerError(400, "Product Not Found");
   
  const isProductInCart = user.cart.includes(product._id);
  
  if(isProductInCart) {
    res.status(400).json({ message: 'Product already in cart' });
    return;
  }

  user.cart.push(product._id);

  await user.save();

  res.status(200).json({ message: 'Product added to cart', cart: user.cart });

});


export const checkCart = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { productId } = req.params;

  const user = await User.findById(userId);

  if(!user) throw new ServerError(400, "User doesn't exit");

  const product = await Product.findById(productId);

  if(!product) throw new ServerError(400, "Product Not Found");
   
  const isProductInCart = user.cart.includes(product._id);

  if(isProductInCart) {
    res.status(200).json({ message: 'Product already in cart', cart: user.cart });
  }

  return;

})


export const viewProducts = asyncHandler(async (req, res, next) => {

  const { userId } = req;

  // Find the user by ID and populate the 'sell' field
  const user = await User.findById(userId);

  if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
  }

  const userData = await User.findById(userId).populate('sell').exec();
  console.log(userData);

  // Send the sell products
  res.json(userData.sell);

});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { productId } = req.params;

  const user = await User.findById(userId);

  if (!user) throw new ServerError(400, "User doesn't exist");

  // Remove productId from user's sell array
  user.sell = user.sell.filter(id => id.toString() !== productId);

  // Save the updated user document
  await user.save();

  // Delete the product from the products collection
  const product = await Product.findById(productId);
  if (!product) throw new ServerError(400, "Product doesn't exist");

  await product.deleteOne();

  // Return the updated sell array
  res.json(user.sell);
});