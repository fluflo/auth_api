import * as jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import * as bcrypt from 'bcrypt';


export function generateAccessToken(userId) :string{
    return jwt.sign({
        "sub": userId,
        "iat": Math.floor(Date.now()/1000)
    }, process.env.TOKEN_SECRET, {expiresIn: 60*60}) as string
}


export function authenicateToken(req :Request, res :Response, next :NextFunction){
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err:any, user: any) => {
        if (err) {
            console.error(err)
            return res.sendStatus(403)
        } 
        
        req.userId = user.sub
        next()
    })
}

export const Encrypt = {

    cryptPassword: (password: string) =>
        bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash),
    
    comparePassword: (password: string, hashPassword: string) =>
            bcrypt.compare(password, hashPassword)
            .then(resp => resp)
    
}