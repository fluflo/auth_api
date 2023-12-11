import * as express from "express"

import * as dotenv from 'dotenv'

import { UserRepository } from "./repository/user.repository";
import { AuthService } from "./service/auth.service";
import { AuthUserRepository } from "./repository/authUser.repository";
import { AuthController } from "./controller/auth.controller";
import dataSource from "./data-source";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/user.controller";

dotenv.config()

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err)=> {
        console.error("Error during Data Source initialization:", err)
    }) 

const userRepository = new UserRepository(dataSource)
const authRepository = new AuthUserRepository(dataSource)

const authService = new AuthService(authRepository, userRepository)
const userService = new UserService(userRepository)
// create and setup express app
const app = express()

app.use(express.json())

// register routes
new AuthController(app, authService).registerEndpoints()
new UserController(app, userService).registerEndpoints()

// start express server
app.listen(3000)
