import asyncHandler from "express-async-handler";
import axios from "axios";
import jwt from "jsonwebtoken";
import qs from "qs";
import User from "../models/User.js";
import Token from "../models/Token.js";
import ServerError from "../utils/ServerError.js";
export const tokenRefresh = asyncHandler((req, res, next) => {
    // console.log("It is coming here");
    // console.log("Refresh token", process.env.JWT_REFRESH_SECRECT);
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRECT);
    const access_token = jwt.sign({ _id: decoded._id }, process.env.JWT_SECRET, {
        expiresIn: "30m",
    });
    res.json({ access_token });
});
export const logout = asyncHandler(async (req, res, next) => {
    const { refresh_token } = req.body;
    // console.log(refresh_token);
    const loggedOut = await Token.deleteOne({ token: refresh_token });
    if (!loggedOut.deletedCount)
        throw new ServerError(400, "Something went wrong!");
    res.json({ message: "logged out succesfully" });
});
export const googleAuth = asyncHandler(async (req, res, next) => {
    const { id_token, access_token } = await getUserFromCode(req.query.code);
    const user = await userDetails(access_token, id_token);
    let isUser = await User.findOne({ email: user.email });
    if (!isUser) {
        const temp = new User({
            name: user.name,
            email: user.email,
            avatar: user.picture ??
                "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a",
        });
        isUser = await temp.save();
    }
    const access_token_server = jwt.sign({ _id: isUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30m",
    });
    const refresh_token_server = jwt.sign({ _id: isUser._id }, process.env.JWT_REFRESH_SECRECT);
    const refToken = new Token({
        token: refresh_token_server,
    });
    await refToken.save();
    res.redirect(`${process.env.CLIENT_URL}/oauth/redirect?uid=${isUser._id}&access_token=${access_token_server}&refresh_token=${refresh_token_server}`);
});
async function getUserFromCode(code) {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: "authorization_code",
    };
    try {
        const res = await axios.post(url, qs.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return res.data;
    }
    catch (error) {
        console.error("An Error Occured");
    }
}
async function userDetails(access_token, id_token) {
    return axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
            Authorization: `Bearer ${id_token}`,
        },
    })
        .then((res) => res.data)
        .catch((error) => {
        console.error(`Failed to fetch user`);
    });
}
//# sourceMappingURL=authControllers.js.map