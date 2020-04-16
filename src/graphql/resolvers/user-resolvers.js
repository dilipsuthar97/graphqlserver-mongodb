import User from '../../models/User';
import { requireAuth, requireAccess } from '../../services/auth';
import FavoriteTweet from '../../models/FavoriteTweet';

export default {
    signup: async (_, { fullName, ...rest }, ctx) => {
        try {
            await requireAccess(ctx.auth);

            let firstName = '';
            let lastName = '';
            const name = fullName.split(' ');
            for (let i = 0; i < name.length; i++) {
                i == 0 ? (firstName = name[i]) : (lastName = lastName + ' ' + name[i]);
            }

            const user_existed = await User.findOne({ email: rest.email });
            if (user_existed) {
                throw new Error(`User already exist with email ${rest.email}`);
            }

            const user = await User.create({ firstName, lastName, ...rest });

            // Create FavoriteTweet table for each user during signup because
            // when new user created all it's favorited tweets reference is stored in
            // this table
            await FavoriteTweet.create({ userId: user._id });

            return {
                token: user.createToken(),
                user
            }
        } catch (err) {
            throw err;
        }
    },

    login: async (_, { email, password }, ctx) => {
        try {
            await requireAccess(ctx.auth);

            const user = await User.findOne({ email });
            console.log(user);
            if (!user) {
                throw new Error('No such user found');
            }
            
            const valid = await user.authenticateUser(password);
            if (!valid) {
                throw new Error('Invalid password');
            }

            return {
                token: user.createToken(),
                user
            };
        } catch (err) {
            throw err;
        }
    },

    me: async (_, args, ctx) => {
        try {
            const me = await requireAuth(ctx.auth);
            return me;
        } catch (err) {
            throw err;
        }
    }
};
