import '@babel/polyfill';
import express from 'express';

import constants from './config/constants';
import './config/db';
import middlewares from './config/middlewares';
import mocks from './mocks';

const app = express(); // create an instance of express
// app.use(express.static('public'));
const server = middlewares(app);

// mocks().then(() => {    // adding mock data into mongo server --don't take it much seriously, focus on inside part
    app.listen(constants.PORT, (err) => {
        if (err) {
            console.error('Server error: ', err);
        } else {
            console.log(`🚀 GraphQL server is ready at localhost:${constants.PORT}${server.graphqlPath}`);
        }
    });
// });
