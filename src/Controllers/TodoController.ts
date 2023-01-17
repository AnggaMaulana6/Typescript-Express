import { Request, Response } from "express";
import IController from "./ControllerInterface";
const db = require("../db/models");
import TodoService from "../Services/TodoService";



class TodoController implements IController {
    index = async (req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req);
        const todos = await service.getAll();
        
        return res.send({
            data: todos,
            message:""
        });
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req);
        const todos = await service.store();
        
        return res.send({
            data: todos,
            message:"~~~ Created Todo Succeses ~~~"
        });
    }
    show = async (req: Request, res: Response): Promise<Response> =>{
        const service: TodoService = new TodoService(req);
        const todo = await service.getOne();
        
        return res.send({
            data: todo,
            message:""
        });
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req);
        const todo = await service.update();
        
        return res.send({
            data: todo,
            message:"~~~ Todo Updated ~~~"
        });
    }
    delete= async (req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req);
        const todo = await service.delete();
        
        return res.send({
            data: todo,
            message:"~~~ Todo Deleted ~~~"
        });
    }
    
}

export default new TodoController();