import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    openid: string;

    @Column({ nullable: true })
    username?: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    avatar?: string;

    @CreateDateColumn()
    create_time: Date;

    @UpdateDateColumn()
    update_time: Date;
}