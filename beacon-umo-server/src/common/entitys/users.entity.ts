import { Column, CreateDateColumn, Entity, Exclusion, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Templates } from "./templates.entity";

export enum UserOrigin {
    Applet = 'applet',
    Client = 'client'
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    openid: string;

    @Column({ nullable: true })
    username?: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ unique: true, nullable: true })
    email?: string;

    @Column({ nullable: true })
    avatar?: string;

    @CreateDateColumn()
    create_time: Date;

    @UpdateDateColumn()
    update_time: Date;

    @ManyToOne(() => Templates, template => template.users)
    template: Templates

    @Column({ type: 'enum', enum: [UserOrigin.Applet, UserOrigin.Client], default: UserOrigin.Applet })
    origin: UserOrigin;
}