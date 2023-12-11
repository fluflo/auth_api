import { DataSource, Not, Repository } from "typeorm";
import { User } from "../entity/user.entity";

export class UserRepository {
    repository: Repository<User>
    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(User)
    }

    async getAllUsers(): Promise<User[]>{
        return await this.repository.find()
    }

    async getAllUsersExcept(ignoreUserId :number): Promise<User[]>{
        return await this.repository.find({
            where: {
                authUserId: Not(ignoreUserId)
            }
        })
    }

    async getUserById(id: number): Promise<User | null>{
        return await this.repository.findOneBy({
            authUserId: id
        })
    }

    async createUser(user: User): Promise<User>{
        return await this.repository.save(user)
    }

    async updateUser(user: User) : Promise<void>{
        await this.repository.update({
            authUserId: user.authUserId
        },user)
    }
}