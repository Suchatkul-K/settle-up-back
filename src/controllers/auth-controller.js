import prisma from "../models/prisma.js";
import * as userService from "../services/user-service.js"
import * as hashService from "../services/hash-service.js"

export async function register  (req,res,next) {
    try {
        console.log(req.body);
        const exist = await userService.getUserByEmail(req.body.email)
        if(exist) {
            return res.status(400).json({message: "invalid, user email already in use"})
        }
        const hashPassword = await hashService.hash(req.body.password)
        // console.log(hashPassword);
        req.body.password = hashPassword
        await userService.createUser(req.body)
        // console.log(req.body);
        res.status(201).json({message: "create user"})
    } catch (error) {
        console.log(error);
    }
    
}

export async function login (req,res,next) {
    try {
        const existUser = await userService.getUserByEmail(req.body.email)
        if(!existUser) {
            return res.status(401).json({message: "invalid: registered user"})
        }
        // compare pass
        // jwt
        delete existUser.password
        res.status(200).json({message: "login success", existUser})
    } catch (error) {
        console.log(error);
    }
}