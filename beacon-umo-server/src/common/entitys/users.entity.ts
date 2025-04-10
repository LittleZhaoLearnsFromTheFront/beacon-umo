import { Column, CreateDateColumn, Entity, Exclusion, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Templates } from "./templates.entity";

export enum UserOrigin {
    Applet = 'applet',
    Client = 'client'
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true, comment: '微信openid' })
    openid: string;

    @Column({ nullable: true, comment: '用户名' })
    username?: string;

    @Column({ nullable: true, comment: '密码' })
    password?: string;

    @Column({ unique: true, nullable: true, comment: '邮箱' })
    email?: string;

    @Column({ nullable: true, comment: '头像' })
    avatar?: string;

    @CreateDateColumn({ comment: '创建时间' })
    create_time: Date;

    @UpdateDateColumn({ comment: '更新时间' })
    update_time: Date;

    // 用户关联模版
    @ManyToOne(() => Templates, template => template.users)
    @JoinColumn({ name: 'template_id' })
    template: Templates

    // 创建的模版
    @OneToMany(() => Templates, template => template.client_user)
    client_template: Templates[];

    @Column({ type: 'enum', enum: [UserOrigin.Applet, UserOrigin.Client], default: UserOrigin.Applet })
    origin: UserOrigin;
}