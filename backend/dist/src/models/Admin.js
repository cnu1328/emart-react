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
    }
}, { timestamps: true });
export default model("Admin", userSchema);
//# sourceMappingURL=Admin.js.map