/* eslint-disable no-console */
import mongoose from 'mongoose';

import constants from './constants';

// mongoose.Promise = global.Promise;  // optional
mongoose.set('debug', true); // debug mode on

try {
    mongoose.connect(constants.DB_URL, {
        // mongo connection here
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (err) {
    mongoose.createConnection(constants.DB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('open', () => {
    console.log('Open to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Failed connection to mongo: ', err);
});
