import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import { decodeToken } from '../services/auth';

// This is a auth middleware
const auth = async (req, res, next) => {
    try {
        const { authorization, accesskey } = req.headers;
        console.log('----- Authorization: ', authorization, '\n----- AccessKey: ', accesskey);

        if (accesskey != null) {
            if (authorization != null) {
                const user = await decodeToken(authorization);
                req.auth = {
                    user: user,
                    accesskey: accesskey
                };
            } else {
                req.auth = {
                    user: null,
                    accesskey: accesskey,
                }
            }
        } else {
            req.auth = null;
        }

        return next();
    } catch (err) {
        throw err
    }
}

export default (app) => {
    app.use(bodyParser.json()); // add body-parser as the json parser middleware
    app.use(auth);  // auth middleware

    const server = new ApolloServer({   // apollo server setup instance
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({
            auth: req.auth,
        }),
        introspection: true,
        playground: true
    });
    server.applyMiddleware({ app }); // apollo server connection as a middleware

    app.use('/', (req, res) => res.send('Welcome to the GraphQL server :)'));
    
    return server;
}