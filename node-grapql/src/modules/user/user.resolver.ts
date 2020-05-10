
import {
    Resolver, Query, Mutation, Arg, InputType, Field,
} from "type-graphql";
import { User } from '../../entities/user'
import { Length, Max, IsEmail, MaxLength } from "class-validator";
import { Password } from "../../entities/password";
import bcrypt from "bcrypt";
import { IsEmailAlreadyExist } from "../custom-validator/is-email-already-exist.validator";

@InputType()
class UserRegisterInputs {
    @Field()
    @Length(2, 255)
    firstName: string;

    @Field()
    @Length(2, 255)
    lastName: string;

    @Field()
    @Max(255)
    age: number;

    @Field()
    @Length(3, 6)
    gender: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "Email already in use" })
    email: string;

    @Field()
    @MaxLength(255)
    password: string;
}

@Resolver()
export class UserResolver {

    @Query(() => [User])
    async users() {
        return await User.find();
    }

    @Query(() => User)
    async user(@Arg('id') id: number) {
        const result = await User.findOne(id);
        return result;
    }

    @Query(() => User, { nullable: true })
    async isLogin(@Arg('email') email: string, @Arg('password') password: string) {
        const user = await User.findOne({ email }, { relations: ['password'] });
        if (user) {
            const isSuccess = bcrypt.compareSync(password, user.password.password);
            if (isSuccess) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Mutation(() => User)
    async newUser(
        @Arg('user') { firstName, lastName, age, gender, email, password: userPassword }: UserRegisterInputs
    ) {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(userPassword, salt);
        const passwordTable = await Password.create({ password, salt }).save();
        return await User.create({ firstName, lastName, age, gender, email, userStatus: 1, password: passwordTable }).save();
    }

}


