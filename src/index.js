/**
 * @author Dilip Suthar
 */

import '@babel/polyfill';
import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import constants from './config/constants';
import './config/db';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import middlewares from './config/middlewares';
import mocks from './mocks';

const app = express(); // create an instance of express

middlewares(app);

const server = new ApolloServer({   // apollo server setup instance
    typeDefs: schema,
    resolvers,
    context: ({ req, res }) => ({   // Context config
        auth: req.auth,
    }),
    uploads: false,
    // subscriptions: {    // Subscriptions config
    //     path: constants.SUBSCRIPTIONS_PATH,
    //     onConnect: async (connectionParams, webSocket, context) => {
    //         console.log(`Subscription client connected using Apollo server's built-in SubscriptionServer.`)
    //         console.log('context => ', context)
    //     },
    //     onDisconnect: async (webSocket, context) => {
    //         console.log(`Subscription client disconnected.`)
    //     }
    // },
    introspection: true,
    playground: true
});
server.applyMiddleware({ app, path: constants.GRAPHQL_PATH }); // apollo server connection with express as a middleware

app.use('/', (req, res) => res.send('Welcome to the GraphQL server :)'));

const _httpServer = http.createServer(app);
// server.installSubscriptionHandlers(_httpServer);

// mocks().then(() => {    // adding mock data into mongo server --don't take it much seriously, focus on inside part
    // app.listen(constants.PORT, (err) => {
    //     if (err) {
    //         console.error('Server error: ', err);
    //     } else {
    //         console.log(`🚀 GraphQL server is ready at http://${constants.BASE_URL}${server.graphqlPath}`);
    //         console.log(`🚀 Subscriptions is ready at ws://${constants.BASE_URL}${server.subscriptionsPath}`);
    //     }
    // });
// });

// mocks().then(() => {
    _httpServer.listen(constants.PORT, err => {
        if (err) {
            console.error('Server error: ', err);
        } else {
            new SubscriptionServer({
                schema: makeExecutableSchema({ typeDefs: schema, resolvers }),
                execute,
                subscribe,
                onConnect: async (connectionParams, webSocket, context) => {
                    console.log(`Subscription client connected using new SubscriptionServer.`)
                },
                onDisconnect: async (webSocket, context) => {
                    console.log(`Subscription client disconnected.`)
                }
            }, {
                server: _httpServer,
                path: constants.SUBSCRIPTIONS_PATH
            });

            console.log(`🚀 GraphQL server is ready at http://${constants.BASE_URL}${server.graphqlPath}`);
            console.log(`🚀 Subscriptions is ready at ws://${constants.BASE_URL}${server.subscriptionsPath}`);
        }
    })
// });
