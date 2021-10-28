import {Request, Response} from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AutheticateUserController {
    async handle(request: Request, response: Response) {
        const service = new AuthenticateUserService();
        const {code} = request.body;
        try {
            const result = await service.execute(code);
            return response.json(result);
        } catch(e) {
            return response.json({error: e.message})
        }
    }
}

export {AutheticateUserController}