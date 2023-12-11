import { UserRepository } from "../repository/user.repository";

export class UserService {
    userRepository: UserRepository
    constructor(
        userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }

    async getUser(userId :number){
        return await this.userRepository.getUserById(userId)
    }
}