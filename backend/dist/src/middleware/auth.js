import ServerError from "../utils/ServerError.js";
import jwt from "jsonwebtoken";
const isAuthenticated = (req, res, next) => {
    var _a;
    const AuthToken = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!AuthToken)
        throw new ServerError(401, "Unauthorized");
    try {
        const decoded = jwt.verify(AuthToken, process.env.JWT_SECRET);
        req.userId = decoded._id;
        next();
    }
    catch (error) {
        throw new ServerError(401, "Unauthorized");
    }
};
export default isAuthenticated;
//# sourceMappingURL=auth.js.map