import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Password extends BaseEntity{
    @Column()
    password: string;
    
    @Column()
    salt: string;

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;
}