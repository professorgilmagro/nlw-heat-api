import UserRepository from "../repositories/UserRepository";

class ProfileUserService {
    repository = new UserRepository()

    async execute(user_id: string) {
        const profile = await this.repository.getProfile(user_id)
        return profile;
    }
}

export default ProfileUserService