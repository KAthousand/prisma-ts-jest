"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
const posts_1 = require("./routes/posts");
const comments_1 = require("./routes/comments");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(morgan_1.default('tiny'));
app.use('/api', auth_1.router);
app.use('/api', users_1.router);
app.use('/api', posts_1.router);
app.use('/api', comments_1.router);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));