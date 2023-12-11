"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const user_repository_1 = require("./repository/user.repository");
const auth_service_1 = require("./service/auth.service");
const authUser_repository_1 = require("./repository/authUser.repository");
const auth_controller_1 = require("./controller/auth.controller");
const data_source_1 = require("./data-source");
dotenv.config();
data_source_1.default
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const userRepository = new user_repository_1.UserRepository(data_source_1.default);
const authRepository = new authUser_repository_1.AuthUserRepository(data_source_1.default);
const authService = new auth_service_1.AuthService(authRepository, userRepository);
// create and setup express app
const app = express();
app.use(express.json());
// register routes
new auth_controller_1.AuthController(app, authService).registerEndpoints();
// start express server
app.listen(3000);
