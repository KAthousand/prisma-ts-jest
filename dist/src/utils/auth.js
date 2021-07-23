"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.comparePass = exports.generateToken = exports.hashPassword = void 0;
//imports
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
//load env
dotenv_1.default.config();
//hash user's passwords (when creating user)
const hashPassword = (pass) => {
    const hashedPassword = bcrypt_1.default.hash(pass, 10);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
//generate a json web token (when creating user)
const generateToken = (user) => {
    const accessToken = jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: '24h' });
    return accessToken;
};
exports.generateToken = generateToken;
//compare bcrypted pass with entered pass
const comparePass = (pass, userPass) => {
    return bcrypt_1.default.compare(pass, userPass);
};
exports.comparePass = comparePass;
//authenticate token in header
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).send('Invalid Token');
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err)
            return res.status(403).send(err.message);
        req.body.user = user;
        next();
    });
});
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map