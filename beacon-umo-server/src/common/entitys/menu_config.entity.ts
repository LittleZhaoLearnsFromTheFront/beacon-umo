import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "menu_config" })
export class MenuConfig {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    path: string;

    @CreateDateColumn()
    create_time: Date;

    @UpdateDateColumn()
    update_time: Date;

}