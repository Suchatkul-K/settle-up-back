import prisma from "../models/prisma.js";
import * as userService from "../services/user-service.js"
import * as hashService from "../services/hash-service.js"
import * as jwtService from "../services/jwt-service.js"

export async function register  (req,res,next) {
    try {
        console.log(req.body);
        const exist = await userService.getUserByEmail(req.body.email)
        if(exist) {
            return res.status(400).json({message: "invalid, user email already in use"})
        }
        const hashPassword = await hashService.hash(req.body.password)
        req.body.password = hashPassword
        delete req.body.confirmPassword

        const newUser = await userService.createUser({data : req.body})
        delete newUser.password
        const accessToken = jwtService.sign({ userId : newUser.id})

        res.status(201).json({ accessToken, newUser})
    } catch (error) {
        console.log(error);
        next();
    }
    
}

export async function login (req,res,next) {
    try {
        const existUser = await userService.getUserByEmail(req.body.email)
        if(!existUser) {
            return res.status(400).json({message: "invalid: unregistered user"})
        }
        // compare pass
        const matchingPass = await hashService.compare(req.body.password,existUser.password)
        if(!matchingPass) {
            return res.status(400).json({message: "invalid: incorrect password"})
        }
        // jwt
        const accessToken = jwtService.sign({ userId : existUser.id})
        delete existUser.password

        res.status(200).json({accessToken, existUser})
    } catch (error) {
        console.log(error);
        next()
    }
}