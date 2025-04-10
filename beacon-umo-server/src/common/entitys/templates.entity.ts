import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./users.entity";


export type TemplateConfig = {
    swiper?: {
        title: string;
        image: string
    }[],
    gridBar?: {
        title: string;
        image: string;
        link: string;
    }[]
}
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

    @Column({ type: 'simple-json', nullable: true })
    config: TemplateConfig

    // 模版拥有人
    @OneToMany(() => Users, user => user.template)
    users: Users[];

    // 模版创建人
    @ManyToOne(() => Users, user => user.client_template)
    @JoinColumn({ name: 'client_user_id' })
    client_user: Users
}