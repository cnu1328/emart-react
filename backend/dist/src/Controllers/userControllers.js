var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import asyncHandler from 'express-async-handler';
import User from "../models/User.js";
import ServerError from "../utils/ServerError.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
});
// Get user details
export const getUser = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield User.findOne({ _id: userId });
    if (!user)
        throw new ServerError(400, "User doesn't exist");
    res.json(user);
}));
// Add to Cart(add a product to the user cart list)
export const addToCart = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { productId } = req.params;
    const user = yield User.findById(userId);
    if (!user)
        throw new ServerError(400, "User doesn't exit");
    const product = yield Product.findById(productId);
    if (!product)
        throw new ServerError(400, "Product Not Found");
    const isProductInCart = user.cart.includes(product._id);
    if (isProductInCart) {
        res.status(400).json({ message: 'Product already in cart' });
        return;
    }
    user.cart.push(product._id);
    yield user.save();
    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
}));
export const checkCart = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { productId } = req.params;
    const user = yield User.findById(userId);
    if (!user)
        throw new ServerError(400, "User doesn't exit");
    const product = yield Product.findById(productId);
    if (!product)
        throw new ServerError(400, "Product Not Found");
    const isProductInCart = user.cart.includes(product._id);
    if (isProductInCart) {
        res.status(200).json({ message: 'Product already in cart', cart: user.cart });
    }
    return;
}));
export const viewProducts = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    // Find the user by ID and populate the 'sell' field
    const user = yield User.findById(userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const userData = yield User.findById(userId).populate('sell').exec();
    console.log(userData);
    // Send the sell products
    res.json(userData.sell);
}));
export const cartProducts = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    // Find the user by ID and populate the 'sell' field
    const user = yield User.findById(userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const userData = yield User.findById(userId).populate('cart').exec();
    console.log(userData);
    // Send the sell products
    res.json(userData.cart);
}));
export const deleteProduct = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { productId } = req.params;
    const user = yield User.findById(userId);
    if (!user)
        throw new ServerError(400, "User doesn't exist");
    // Remove productId from user's sell array
    user.sell = user.sell.filter(id => id.toString() !== productId);
    // Save the updated user document
    yield user.save();
    // Delete the product from the products collection
    const product = yield Product.findById(productId);
    if (!product)
        throw new ServerError(400, "Product doesn't exist");
    product.isAvailable = false;
    yield product.save();
    const userData = yield User.findById(userId).populate('sell').exec();
    // Return the updated sell array
    res.json(userData.sell);
}));
export const removeFromCart = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { productId } = req.params;
    const user = yield User.findById(userId);
    if (!user)
        throw new ServerError(400, "User doesn't exist");
    // Remove productId from user's sell array
    user.cart = user.cart.filter(id => id.toString() !== productId);
    // Save the updated user document
    yield user.save();
    const userData = yield User.findById(userId).populate('cart').exec();
    // Return the updated sell array
    res.json(userData.cart);
}));
export const getProducts = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productIds } = req.body;
    console.log(productIds);
    const products = yield Product.find({ _id: { $in: productIds } });
    res.json(products);
}));
export const addWishlist = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { productId } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        throw new ServerError(400, "User doesn't exist");
    if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        yield user.save();
        res.status(200).json({ success: true, message: "Product added to Wishlist" });
    }
    else
        res.status(400).json({ success: false, message: "Product was already in wishlist" });
}));
export const removeWishlist = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { productId } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        throw new ServerError(400, "User doesn't exist");
    user.wishlist = user.wishlist.filter((id) => id && id.toString() !== productId);
    yield user.save();
    res.status(200).json({ success: true, message: 'Product removed from wishlist' });
}));
export const getWishlist = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const user = yield User.findById(userId);
    if (!user)
        throw new ServerError(400, "User doesn't exist");
    res.json(user.wishlist);
}));
export const getPublishKey = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ publishable_key: process.env.STRIPE_PUBLISHABLE_KEY });
}));
export const getSecretKey = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: 100, // Amount in smallest currency unit, e.g., paise for INR
        currency: 'inr',
        payment_method_types: ['card'],
    });
    res.json({ client_secret: paymentIntent.client_secret });
}));
export const getPaymentProcess = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = req.body;
    const lineItem = {
        price_data: {
            currency: "inr",
            product_data: {
                name: products.name,
                // Uncomment and ensure products.images is an array or a string that can be split into an array
                // images: products.images ? products.images.split(",") : []
            },
            unit_amount: products.price * 100,
        },
        quantity: 1,
    };
    const customer = yield stripe.customers.create({
        name: 'Jenny Rosen',
        address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'IN',
        },
    });
    // Ensure lineItem is wrapped in an array
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [lineItem],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        // shipping: {
        //   name: customerName,
        //   address: {
        //     line1: customerAddress.line1,
        //     line2: customerAddress.line2,
        //     city: customerAddress.city,
        //     state: customerAddress.state,
        //     postal_code: customerAddress.postal_code,
        //     country: customerAddress.country,
        //   },
        // },
    });
    res.json({ id: session.id });
}));
export const getAllUsers = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.find({});
    if (users.length === 0) {
        throw new ServerError(400, "NO users are there");
    }
    res.send(users);
}));
export const getAdminProductDetails = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'seller',
            },
        },
        {
            $unwind: '$seller',
        },
        {
            $project: {
                name: 1,
                price: 1,
                description: 1,
                category: 1,
                isAvailable: 1,
                sellerName: '$seller.name',
                sellerEmail: '$seller.email',
            },
        },
        {
            $lookup: {
                from: 'users',
                let: { productId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $in: ['$$productId', '$wishlist'] } } },
                    { $count: 'wishlistCount' },
                ],
                as: 'wishlistUsers',
            },
        },
        {
            $lookup: {
                from: 'users',
                let: { productId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $in: ['$$productId', '$cart'] } } },
                    { $count: 'cartCount' },
                ],
                as: 'cartUsers',
            },
        },
        {
            $lookup: {
                from: 'users',
                let: { productId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $in: ['$$productId', '$buy'] } } },
                    { $count: 'orderCount' },
                ],
                as: 'orderUsers',
            },
        },
        {
            $addFields: {
                wishlistCount: { $arrayElemAt: ['$wishlistUsers.wishlistCount', 0] },
                cartCount: { $arrayElemAt: ['$cartUsers.cartCount', 0] },
                orderCount: { $arrayElemAt: ['$orderUsers.orderCount', 0] },
                totalCount: {
                    $sum: [
                        { $ifNull: [{ $arrayElemAt: ['$wishlistUsers.wishlistCount', 0] }, 0] },
                        { $ifNull: [{ $arrayElemAt: ['$cartUsers.cartCount', 0] }, 0] },
                        { $ifNull: [{ $arrayElemAt: ['$orderUsers.orderCount', 0] }, 0] }
                    ]
                }
            },
        },
        {
            $project: {
                wishlistUsers: 0,
                cartUsers: 0,
                orderUsers: 0,
            },
        },
        {
            $sort: { totalCount: -1 }
        }
    ]);
    res.status(200).send({ success: true, data: products });
}));
export const getProductUserDetails = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    // Convert productId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);
    // Check if the product exists
    const product = yield Product.findOne({ _id: productObjectId });
    if (!product) {
        throw new ServerError(400, "No such Product exists");
    }
    // Aggregate query to get the product details along with user details
    const productDetails = yield Product.aggregate([
        // Match the specific product by ID
        {
            $match: {
                _id: productObjectId,
            },
        },
        // Lookup for the seller (product owner)
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'seller',
            },
        },
        {
            $unwind: '$seller',
        },
        // Lookup for users who have added the product to their wishlist
        {
            $lookup: {
                from: 'users',
                let: { productId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $in: ['$$productId', '$wishlist'] } } },
                    { $project: { _id: 1, name: 1, email: 1, avatar: 1 } },
                ],
                as: 'wishlistUsers',
            },
        },
        // Lookup for users who have added the product to their cart
        {
            $lookup: {
                from: 'users',
                let: { productId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $in: ['$$productId', '$cart'] } } },
                    { $project: { _id: 1, name: 1, email: 1, avatar: 1 } },
                ],
                as: 'cartUsers',
            },
        },
        // Lookup for users who have ordered the product
        {
            $lookup: {
                from: 'users',
                let: { productId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $in: ['$$productId', '$buy'] } } },
                    { $project: { _id: 1, name: 1, email: 1, avatar: 1 } },
                ],
                as: 'orderUsers',
            },
        },
        {
            $project: {
                name: 1,
                price: 1,
                description: 1,
                category: 1,
                images: 1,
                isAvailable: 1,
                'seller._id': 1,
                'seller.name': 1,
                'seller.email': 1,
                'seller.avatar': 1,
                wishlistUsers: 1,
                cartUsers: 1,
                orderUsers: 1,
            },
        },
    ]);
    res.status(200).json({ success: true, data: productDetails });
}));
//# sourceMappingURL=userControllers.js.map