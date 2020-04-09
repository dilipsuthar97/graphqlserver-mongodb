import jwt from 'jsonwebtoken';

import User from '../models/User';

import constants from '../config/constants';

export const decodeToken = (authorization) => {
    try {
        const [bearer, token] = authorization.split(' ');

        if (bearer === 'Bearer') {
            console.log('decoding token...')
            return jwt.verify(token, constants.JWT_SECRET);
        }
    } catch (err) {
        throw new Error('Token not valid');
    }
};

export const requireAccess = async (auth) => {
    if (!auth || auth.accesskey != constants.ACCESS_KEY) {
        throw new Error('Invalid Access Key!');
    }
};

export const requireAuth = async (auth) => {

    if (!auth || auth.accesskey != constants.ACCESS_KEY) {
        throw new Error('Invalid Access Key!');
    }

    if (!auth.user || !auth.user._id) {
        throw new Error('Unauthorized!');
    }

    const me = await User.findById(auth.user._id);
    if (!me) {
        throw new Error('Unauthorized!');
    }

    return me;
};