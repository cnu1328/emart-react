var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import asyncHandler from "express-async-handler";
import ServerError from "../utils/ServerError.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
// Add The product
export const addProduct = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { product, description, price, category, image, } = req.body;
    const user = yield User.findOne({ _id: userId });
    if (!user)
        new ServerError(400, "User Not Found");
    const newProduct = new Product({
        name: product,
        description: description,
        price: price,
        category: category,
        images: image,
        userId: userId,
    });
    const pro = yield newProduct.save();
    user.sell.push(pro._id);
    yield user.save();
    res.send(pro);
}));
export const updateProduct = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category, image, productId, } = req.body;
    const prod = yield Product.findByIdAndUpdate(productId, { name, description, category, price }, { new: true });
    if (!prod)
        new ServerError(400, "Product Not Found");
    res.status(200).json({ success: true, product: prod });
}));
// Home page Products
export const getHomeProducts = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield getProductsWithUser(Product.find({ isAvailable: true }));
    console.log(products);
    res.send(products);
}));
export function getProductsWithUser(q) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield q.sort({ name: -1 });
        return Promise.all(products.map((product) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findOne({ _id: product.userId });
            return { product, user };
        })));
    });
}
// Get particular Product Details
export const getProduct = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product.findOne({ _id: req.params.productId });
    if (!product)
        throw new ServerError(400, "No such product Found!");
    const user = yield User.findOne({ _id: product.userId });
    res.send({ product, user });
}));
//# sourceMappingURL=productController.js.map