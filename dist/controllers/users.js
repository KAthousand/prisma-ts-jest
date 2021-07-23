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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = exports.getUserById = exports.getAllUsers = void 0;
//imports
const client_1 = require("@prisma/client");
//import functions
const auth_1 = require("../utils/auth");
//define prisma
const prisma = new client_1.PrismaClient();
//GET ALL
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({});
        res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getAllUsers = getAllUsers;
//GET ONE 
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const users = yield prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                username: true,
                email: true
            }
        });
        res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getUserById = getUserById;
//REGISTER USER, REQUIRES AUTH
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield auth_1.hashPassword(req.body.password);
        const user = yield prisma.user.create({
            data: Object.assign(Object.assign({}, req.body), { password: hashedPassword }),
            select: {
                id: true,
                uuid: true,
                email: true,
                username: true
            }
        });
        const accessToken = auth_1.generateToken(user);
        res.status(200).json({ accessToken: accessToken, user: user });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.registerUser = registerUser;
//LOGIN USER, REQUIRES AUTH
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { email: req.body.email },
    });
    if (user == null) {
        return res.status(400).json({ error: "Cannot find user" });
    }
    try {
        const passwordMatch = yield auth_1.comparePass(req.body.password, user.password);
        if (passwordMatch) {
            const accessToken = auth_1.generateToken(user);
            res.status(200);
            res.json({ accessToken: accessToken });
        }
        else {
            res.status(401).send("Incorrect Email or Password");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.loginUser = loginUser;
//UPDATE USER
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prisma.user.update({
            where: { id: Number(id) },
            data: req.body
        });
        if (user) {
            const updatedUser = yield prisma.user.findUnique({
                where: { id: Number(id) },
                select: {
                    username: true,
                    email: true
                }
            });
            return res.status(200).json(updatedUser);
        }
        throw new Error('User not found');
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.updateUser = updateUser;
//DELETE USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield prisma.user.delete({
            where: { id: Number(id) }
        });
        if (deleted) {
            return res.status(204).send('User deleted');
        }
        throw new Error('User not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
