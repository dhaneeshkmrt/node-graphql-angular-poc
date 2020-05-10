import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql";
import { Password } from "./password";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    age: number

    @Field()
    @Column()
    gender: string;

    @Field()
    @Column()
    email: string;

    @Field({ defaultValue: 0 })
    userStatus: number;
    
    @OneToOne(()=> Password)
    @JoinColumn()
    password: Password

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