import { Messsage, Prisma, User } from ".prisma/client";
import { request, response } from "express";
import { sign } from "jsonwebtoken";
import RepositoryBase from "./base";

class MessageRepository extends RepositoryBase {
    get model() {
        return this.client.messsage
    }

    async create(text: string, user_id: string) {
        const response = await this.model.create({
            data: {
                text,
                user_id
            },
            include: {
                user: true
            }
        })

        return response;
    }

    async getLastMessages(take = 10) {
        return this.model.findMany({
            take,
            orderBy: { created_at: "asc" },
            include: { user: true }
        })
    }
}

export default MessageRepository;