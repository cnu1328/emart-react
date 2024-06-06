import { Schema, model } from "mongoose";
const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
});
export default model("tokens", tokenSchema);
//# sourceMappingURL=Token.js.map