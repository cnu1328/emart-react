import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String, 
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        }  
    },
    { timestamps: true }
);

type userSchemaInferType = InferSchemaType<typeof userSchema>;
export default model<userSchemaInferType>("Admin", userSchema);