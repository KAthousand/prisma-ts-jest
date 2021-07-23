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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
//imports
const client_1 = __importDefault(require("../client"));
//GET ALL
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield client_1.default.post.findMany({
            orderBy: [
                {
                    createdAt: 'desc'
                },
            ],
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                user: {
                    select: {
                        username: true,
                        id: true
                    }
                },
                _count: {
                    select: { comments: true }
                },
                comments: {
                    orderBy: [
                        {
                            createdAt: 'desc'
                        },
                    ],
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        user: true,
                    },
                },
            },
        });
        res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getAllPosts = getAllPosts;
//GET ONE POST
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const posts = yield client_1.default.post.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                comments: {
                    orderBy: [
                        {
                            createdAt: 'desc'
                        },
                    ],
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        user: true,
                    }
                },
                user: {
                    select: {
                        username: true,
                        id: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    },
                }
            }
        });
        res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getPostById = getPostById;
//CREATE POST
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield client_1.default.post.create({
            data: Object.assign({}, req.body)
        });
        res.status(200).json(post);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createPost = createPost;
//UPDATE POST
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield client_1.default.post.update({
            where: { id: Number(id) },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });
        if (post) {
            const updatedPost = yield client_1.default.post.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json(updatedPost);
        }
        throw new Error('Post not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updatePost = updatePost;
//DELETE POST
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield client_1.default.post.delete({
            where: { id: Number(id) }
        });
        if (deleted) {
            return res.status(204).send('Post deleted');
        }
        throw new Error('Post not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=posts.js.map