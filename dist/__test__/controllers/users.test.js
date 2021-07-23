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
//import app for correct routes and server to close after
const server_1 = require("../../src/server");
//import supertest to test HTTP req/res
const supertest_1 = __importDefault(require("supertest"));
const client_1 = __importDefault(require("../../src/client"));
// import axios from 'axios';
// import dotenv from 'dotenv';
const mockValidUser = {
    email: "testUser@email.com",
    username: "testUser",
    password: "123456"
};
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.$connect();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.$disconnect();
}));
describe('POST /api/users', function () {
    it('responds with json', function (done) {
        try {
            supertest_1.default(server_1.app)
                .post("/api/users")
                .send(mockValidUser)
                // .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                // .expect(200)
                .end(function (err, res) {
                if (err)
                    return done(err);
                return done();
            });
        }
        catch (e) {
            console.log('error', e);
        }
    });
});
//# sourceMappingURL=users.test.js.map