import express from 'express';
import 'reflect-metadata'
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/user.resolver';
import { createConnection } from 'typeorm';

const main = async () => {

    await createConnection();

    const schema = await buildSchema({
        resolvers: [UserResolver],
    })
    const apolloServer = new ApolloServer({ schema });

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server running in port 4000');
    })
}

main();

