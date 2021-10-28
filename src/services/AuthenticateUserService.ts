import axios from "axios"
import { response } from "express"
import UserRepository from "../repositories/UserRepository"

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    login: string,
    name: string,
    id: number,
    avatar_url: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const tokenResponse = await this.rquestToken(code)
    const userResponse = await this.requestUser(tokenResponse.access_token)
    const userRepository = new UserRepository();
    const user = await userRepository.findByGithubOrCreate(userResponse)
    const token = userRepository.generateToken(user);
    return {token, user};
  }

  async rquestToken(code: string) {
    const url = `${process.env.GITHUB_OAUTH_URL}/access_token`
    const {data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(url, null, {
        params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        },
        headers: {
            "Accept": "application/json"
        }
    })

    return accessTokenResponse;
  }

  async requestUser(access_token: string) {
    const {data} = await axios.get<IUserResponse>(`${process.env.GITHUB_API_URL}/user`, {
        headers: {
            authorization:  `Bearer ${access_token}`
        }
    })

    return data;
  }
}

export {AuthenticateUserService, IUserResponse}