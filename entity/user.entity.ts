import { Entity, Column, PrimaryColumn, OneToOne, ManyToMany, Timestamp } from "typeorm"
import { AuthUser } from "./authUser.entity"

@Entity()
export class User {
    @PrimaryColumn()
    @OneToOne(() => AuthUser, (user) => user.id)
    authUserId: number

    @Column()
    firstName: string

    @Column()
    lastName: string

}