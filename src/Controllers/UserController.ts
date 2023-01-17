import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IController from "./ControllerInterface";


let data: any[] = [
    { id: 1, name: "Angga"},
    { id: 2, name: "Roihan"},
    { id: 3, name: "Raya"},
    { id: 4, name: "Abyan"},
    { id: 5, name: "Esa"},
];

class UserController implements IController {
    index(req: Request, res: Response): Response{
        console.log("Ini adalah Index User");
        return res.send(data);
        //return res.send("Ini adalah endpoint index")
    }
    create(req: Request, res: Response): Response{
        const { id, name } = req.body;

        data.push({ id, name });

        return res.send("~~~ Create Sukses ~~~");
        //return res.send(req.body);
    }
    show(req: Request, res: Response): Response{
        const { id } = req.params;

        let person = data.find(item => item.id == id);
        return res.send(person);
    }
    update(req: Request, res: Response): Response{
        const { id } = req.params;
        const { name } = req.body;

        let person = data.find(item => item.id == id);
        person.name = name;

        return res.send("~~~ Update Sukese ~~~");
    }
    delete(req: Request, res: Response): Response{
        const { id } = req.params;

        let poeple = data.filter(item => item.id != id);
        return res.send(poeple);
    }
    
}

export default new UserController();