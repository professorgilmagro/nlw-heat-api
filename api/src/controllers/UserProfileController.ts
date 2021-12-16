import { Request, Response } from "express";
import ProfileUserService from "../services/ProfileUserService";

class UserProfileController {
    async handle(request: Request, response: Response) {
        const service = new ProfileUserService();
        try {
            const result = await service.execute(request.user_id);
            return response.json(result);
        } catch (e) {
            return response.json({ error: e.message })
        }
    }
}

export { UserProfileController }