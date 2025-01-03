import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class Templates {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    create_time: Date;

    @UpdateDateColumn()
    update_time: Date;

    @OneToMany(() => Users, user => user.template)
    users: Users[]
}