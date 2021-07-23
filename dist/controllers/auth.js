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
exports.verifyTokenUser = void 0;
//imports
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
//load env
dotenv_1.default.config();
//define prisma
const prisma = new client_1.PrismaClient();
//verify token user
const verifyTokenUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null)
            return res.status(401).send('Invalid Token');
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY);
            const user = yield prisma.user.findUnique({
                where: {
                    id: Number(decoded.id)
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                }
            });
            if (user) {
                return res.status(200).json({ user });
            }
        }
        catch (e) {
            return res.status(401).send('Unauthorized');
        }
        return res.status(404).send('User with the specified ID does not exist');
    }
    return res.send(500);
});
exports.verifyTokenUser = verifyTokenUser;
