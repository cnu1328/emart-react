import ServerError from "../utils/ServerError.js";
import jwt from "jsonwebtoken";
const isAuthenticated = (req, res, next) => {
    const AuthToken = req.headers["authorization"]?.split(" ")[1];
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