import { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { UserService } from "../service/user.service"
import { authenicateToken } from "../auth/auth";

export class UserController {
    userService :UserService
    app :core.Express
    constructor(
        app :core.Express,
        userService :UserService
    ){
        this.app = app
        this.userService = userService
    }
    registerEndpoints(){
        const app = this.app
        const userService = this.userService
        app.get("/me", authenicateToken, async function (req: Request, res: Response) {
            if (req.userId){
                const users = await userService.getUser(req.userId)
                return res.status(200).json(users)
            }
        
            return res.status(401)
        })
        
    
    }

}