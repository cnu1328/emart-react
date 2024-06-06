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
function getUserData(access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        console.log('response', response);
        const data = yield response.json();
        console.log('data', data);
    });
}
/* GET home page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.query.code;
        console.log(code);
        try {
            const redirectURL = "http://localhost:5000/oauth";
            const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectURL);
            const r = yield oAuth2Client.getToken(code);
            // Make sure to set the credentials on the OAuth2 client.
            yield oAuth2Client.setCredentials(r.tokens);
            console.info('Tokens acquired.');
            const user = oAuth2Client.credentials;
            console.log('credentials', user);
            yield getUserData(oAuth2Client.credentials.access_token);
        }
        catch (err) {
            console.log('Error logging in with OAuth2 user', err);
        }
        res.redirect(303, 'http://localhost:5173/user');
    });
});
export default router;
//# sourceMappingURL=oauth.js.map