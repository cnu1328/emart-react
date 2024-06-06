var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { OAuth2Client } from 'google-auth-library';
const router = express.Router();
router.post('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
        res.header("Access-Control-Allow-Credentials", 'true');
        res.header("Referrer-Policy", "no-referrer-when-downgrade");
        const redirectURL = 'http://localhost:5000/oauth';
        const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectURL);
        //Generate the url that will be used for consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
            prompt: 'consent'
        });
        res.json({ url: authorizeUrl });
    });
});
export default router;
//# sourceMappingURL=request.js.map