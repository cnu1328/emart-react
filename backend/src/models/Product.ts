import { Schema, model, InferSchemaType } from "mongoose";


const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    chat: String,
}, { _id: false });

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema], // Array of reviews
    images: { type: String, requried: true}, // Array of image URLs
    category: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }, 
});

type userSchemaInferType = InferSchemaType<typeof productSchema>;
export default model<userSchemaInferType>("Product", productSchema);