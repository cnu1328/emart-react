import asyncHandler from "express-async-handler";
import ServerError from "../utils/ServerError.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// Add The product

export const addProduct = asyncHandler(async (req, res, next) => {
    const { userId } = req;
    const { 
        product,
        description,
        price,
        category,
        image, 
    } = req.body;


    const user = await User.findOne({_id: userId});

    if(!user) new ServerError(400, "User Not Found");
    
    const newProduct = new Product({
        name: product,
        description: description,
        price: price,
        category: category,
        images: image,
        userId: userId,
    });

    const pro = await newProduct.save();

    user.sell.push(pro._id);

    await user.save();
   
    res.send(pro);
    
});



export const updateProduct = asyncHandler(async (req, res, next) => {
    
    const { 
        name,
        description,
        price,
        category,
        image, 
        productId,
    } = req.body;


    const prod = await Product.findByIdAndUpdate(
        productId,
        {name, description, category, price},
        { new : true}
    );

    if(!prod) new ServerError(400, "Product Not Found");
    
    res.status(200).json({ success: true, product: prod });
    
});


// Home page Products

export const getHomeProducts = asyncHandler(async (req, res, next) => {

    const products = await getProductsWithUser(
        Product.find({ isAvailable: true }),
    );

    console.log(products);

    res.send(products);
});

export async function getProductsWithUser(q : any) {
    const products = await q.sort({ name : -1 });

    return Promise.all(
        products.map(async (product: any) => {
            const user = await User.findOne({ _id : product.userId });
            return { product, user};
        })
    );
}


// Get particular Product Details

export const getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findOne({ _id : req.params.productId });

    if(!product) throw new ServerError(400, "No such product Found!");

    const user = await User.findOne({ _id: product.userId });
    
    res.send({ product, user });
});
