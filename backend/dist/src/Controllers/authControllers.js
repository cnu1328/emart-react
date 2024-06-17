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
import axios from "axios";
import jwt from "jsonwebtoken";
import qs from "qs";
import User from "../models/User.js";
import Token from "../models/Token.js";
import ServerError from "../utils/ServerError.js";
import bcrypt from "bcryptjs";
export const tokenRefresh = asyncHandler((req, res, next) => {
    // console.log("It is coming here");
    // console.log("Refresh token", process.env.JWT_REFRESH_SECRECT);
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRECT);
    const access_token = jwt.sign({ _id: decoded._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    res.json({ access_token });
});
export const logout = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refresh_token } = req.body;
    // console.log(refresh_token);
    const loggedOut = yield Token.deleteOne({ token: refresh_token });
    if (!loggedOut.deletedCount)
        throw new ServerError(400, "Something went wrong!");
    res.json({ message: "logged out succesfully" });
}));
export const emailSignup = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    const user = yield User.findOne({ email: username });
    if (user) {
        throw new ServerError(400, "User already exist");
    }
    const hashedPassword = yield bcrypt.hash(password, 10);
    const newUser = new User({
        email: username,
        password: hashedPassword,
        name: "",
        avatar: "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a",
    });
    yield newUser.save();
    res.status(201).json({ status: 201, message: 'User created successfully' });
}));
export const emailLogIn = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User.findOne({ email: username });
    if (!user) {
        throw new ServerError(400, "User Not Exit, Please sign up first");
    }
    const isPasswordValid = yield bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ServerError(400, "Please Check Credentials");
    }
    // Generate JWT tokens
    const access_token_server = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30m",
    });
    const refresh_token_server = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRECT);
    const refToken = new Token({
        token: refresh_token_server,
    });
    yield refToken.save();
    // console.log("It is coming here");
    // res.redirect("/hello");
    // console.log(process.env.CLIENT_URL);
    res.status(200).json({
        status: 200,
        message: 'Login successful',
        access_token_server,
        refresh_token_server,
    });
}));
export const googleAuth = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id_token, access_token } = yield getUserFromCode(req.query.code);
    const user = yield userDetails(access_token, id_token);
    let isUser = yield User.findOne({ email: user.email });
    if (!isUser) {
        const temp = new User({
            name: user.name,
            email: user.email,
            avatar: (_a = user.picture) !== null && _a !== void 0 ? _a : "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a",
        });
        isUser = yield temp.save();
    }
    const access_token_server = jwt.sign({ _id: isUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30m",
    });
    const refresh_token_server = jwt.sign({ _id: isUser._id }, process.env.JWT_REFRESH_SECRECT);
    const refToken = new Token({
        token: refresh_token_server,
    });
    yield refToken.save();
    res.redirect(`${process.env.CLIENT_URL}/oauth/redirect?uid=${isUser._id}&access_token=${access_token_server}&refresh_token=${refresh_token_server}`);
}));
function getUserFromCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://oauth2.googleapis.com/token";
        const values = {
            code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URL,
            grant_type: "authorization_code",
        };
        console.log('Request values:', values);
        try {
            const res = yield axios.post(url, qs.stringify(values), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return res.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                // Axios specific error handling
                console.error("Axios error:", error.message);
                if (error.response) {
                    console.error("Status:", error.response.status);
                    console.error("Response data:", error.response.data);
                }
                else if (error.request) {
                    console.error("Request data:", error.request);
                }
            }
            else {
                // Generic error handling
                console.error("An unexpected error occurred:", error);
            }
        }
    });
}
function userDetails(access_token, id_token) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
//# sourceMappingURL=authControllers.js.map