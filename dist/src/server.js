"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
const posts_1 = require("./routes/posts");
const comments_1 = require("./routes/comments");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
exports.app = express_1.default();
exports.app.use(express_1.default.json());
exports.app.use(cors_1.default());
exports.app.use(morgan_1.default('tiny'));
exports.app.use('/api', auth_1.router);
exports.app.use('/api', users_1.router);
exports.app.use('/api', posts_1.router);
exports.app.use('/api', comments_1.router);
//# sourceMappingURL=server.js.map