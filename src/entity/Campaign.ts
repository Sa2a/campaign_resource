import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Campaign {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    country: string;

    @Column()
    budget: number;

    @Column()
    goal: string;

    @Column()
    category: string;
}