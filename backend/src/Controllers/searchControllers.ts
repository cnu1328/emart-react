import asyncHandler from "express-async-handler";
import { getProductsWithUser } from "./productController.js";
import Product from "../models/Product.js";


export const querySearch = asyncHandler(async (req, res, next) => {
    const { query } = req.params;

    const regex = new RegExp(`${query}`, "i");

    const products = await getProductsWithUser(
        Product.find({
            $or: [
                { name: regex },
                { description: regex},
                { category: regex}
            ],
        }),
    );

    res.send(products);
});