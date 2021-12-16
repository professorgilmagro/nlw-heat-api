import { Prisma, User } from ".prisma/client";
import { response } from "express";
import { sign } from "jsonwebtoken";
import { IUserResponse } from "../services/AuthenticateUserService";
import RepositoryBase from "./base";

class UserRepository extends RepositoryBase {

    get model() {
        return this.client.user
    }

    async findByGithubOrCreate(data: IUserResponse): Promise<User> {
        let user = await this.findByGithubId(data.id);

        if (!user) {
            return await this.create({
                github_id: data.id,
                name: data.name,
                login: data.login,
                avatar_url: data.avatar_url
            })
        }

        return user;
    }

    async findByGithubId(id: number): Promise<User> {
        return this.model.findFirst({ where: { "github_id": id } })
    }

    async create(userData): Promise<User> {
        return this.model.create({ data: userData });
    }

    generateToken(user: User) {
        return sign({
            userData: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id
            }
        },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )
    }

    async getProfile(user_id: string) {
        return this.model.findFirst({
            where: {
                id: user_id
            }
        })
    }
}

export default UserRepository;