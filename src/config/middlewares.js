import bodyParser from 'body-parser';

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
}