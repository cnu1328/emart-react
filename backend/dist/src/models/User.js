import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    sell: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    buy: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });
export default model("User", userSchema);
//# sourceMappingURL=User.js.map