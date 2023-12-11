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
exports.AuthController = void 0;
const createUser_dto_1 = require("../dto/createUser.dto");
const class_validator_1 = require("class-validator");
class AuthController {
    constructor(app, authService) {
        this.app = app;
        this.authService = authService;
    }
    registerEndpoints() {
        const app = this.app;
        const authService = this.authService;
        app.post("/auth", function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!req.body || !req.body.username || !req.body.password) {
                    return res.status(400).send("Please provide a username and password");
                }
                const accessToken = yield authService.authenticate(req.body.username, req.body.password);
                if (!accessToken)
                    return res.sendStatus(403);
                return res.status(200).send({
                    token: accessToken
                });
            });
        });
        app.post("/register", function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let createUser = new createUser_dto_1.CreateUserDto();
                    createUser.firstName = req.body.firstName;
                    createUser.lastName = req.body.lastName;
                    createUser.username = req.body.username;
                    createUser.password = req.body.password;
                    yield (0, class_validator_1.validateOrReject)(createUser);
                }
                catch (err) {
                    return res.status(400).send(err);
                }
                yield authService.register(req.body);
                return res.sendStatus(201);
            });
        });
    }
}
exports.AuthController = AuthController;
