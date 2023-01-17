import { Request, Response } from "express";
// import { ParamsDictionary } from "express-serve-static-core";
// import { ParsedQs } from "qs";
// import IController from "./ControllerInterface";
import Authentication from "../Utils/Authentication";
const db = require("../db/models");




class AuthController  {
    register = async (req: Request, res: Response): Promise<Response> => {
        let { username, password } = req.body;
        const hashPassword: string = await Authentication.passwordHash(password);

        await db.user.create({ username, password: hashPassword });
        
        return res.send("~~~ Registrasi Sukses !!! ~~~")
        //return res.send("Ini adalah endpoint index")
    }
    login = async (req: Request, res: Response): Promise <Response> =>{
        // cari data user by Username
        let { username, password } = req.body;

        const user = await db.user.findOne({
            where: { username }
        });

        
        // check password
            let compare = await Authentication.passwordCompare(password, user.password);

        // generate token
        if(compare) {
            let token = Authentication.generateToken(user.id, username, user.password);
            return res.send({
                token
            })
        }

        return res.send("~~~ Auth Faild ~~~");
        //return res.send("~~~ Create Sukses ~~~");
        //return res.send(req.body);
    }
}

export default new AuthController();