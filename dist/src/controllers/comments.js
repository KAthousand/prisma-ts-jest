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
exports.deleteComment = exports.updateComment = exports.createComment = exports.getCommentById = exports.getAllComments = void 0;
//imports
const client_1 = __importDefault(require("../client"));
// GET ALL
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield client_1.default.comment.findMany({
            select: {
                content: true,
                user: {
                    select: {
                        username: true,
                    }
                },
                post: true
            }
        });
        res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getAllComments = getAllComments;
//GET ONE
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comments = yield client_1.default.comment.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                content: true,
            }
        });
        res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getCommentById = getCommentById;
//CREATE COMMENT
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield client_1.default.comment.create({
            data: Object.assign({}, req.body)
        });
        res.status(200).json(comment);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createComment = createComment;
//UPDATE COMMENT
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comment = yield client_1.default.comment.update({
            where: { id: Number(id) },
            data: req.body
        });
        if (comment) {
            const updatedComment = yield client_1.default.comment.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json(updatedComment);
        }
        throw new Error('Comment not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateComment = updateComment;
//DELETE COMMENT
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield client_1.default.comment.delete({
            where: { id: Number(id) }
        });
        if (deleted) {
            return res.status(204).send('Comment deleted');
        }
        throw new Error('Comment not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteComment = deleteComment;
//# sourceMappingURL=comments.js.map