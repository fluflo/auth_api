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
exports.AuthService = void 0;
const auth_1 = require("../auth/auth");
class AuthService {
    constructor(authRepository, userRepository) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUser = yield this.authRepository.getUserByUsername(username);
            if (authUser && auth_1.Encrypt.comparePassword(password, authUser.password)) {
                return (0, auth_1.generateAccessToken)(authUser.id);
            }
            return null;
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.authRepository.getUserByUsername(user.username);
            if (existingUser)
                throw Error("User already exists");
            const authUser = yield this.authRepository.createUser({
                username: user.username,
                password: yield auth_1.Encrypt.cryptPassword(user.password)
            });
            if (!authUser || !authUser.id)
                throw Error("AuthUser was not created correctly");
            yield this.userRepository.createUser({
                authUserId: authUser.id,
                firstName: user.firstName,
                lastName: user.lastName
            });
        });
    }
}
exports.AuthService = AuthService;
