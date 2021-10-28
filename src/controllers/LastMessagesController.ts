import { Request, Response } from "express";
import LastMessagesService from "../services/LastMessagesService";

class LastMessagesController {
    async handle(request: Request, response: Response) {
        const service = new LastMessagesService();
        try {
            const result = await service.execute();
            return response.json(result);
        } catch (e) {
            return response.json({ error: e.message })
        }
    }
}

export { LastMessagesController }