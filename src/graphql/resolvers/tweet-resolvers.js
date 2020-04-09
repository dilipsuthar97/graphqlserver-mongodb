import Tweet from '../../models/Tweet';
import { requireAuth } from '../../services/auth';

export default {
    getTweet: async (parent, args, ctx) => {
        try {
            await requireAuth(ctx.auth);
            return Tweet.findById(args._id);
        } catch (err) {
            throw err;
        }
    },

    getTweets: async (_, args, ctx) => {
        try {
            await requireAuth(ctx.auth);
            return Tweet.find({}).sort({ createdAt: -1 });
        } catch (err) {
            throw err;
        }
    },

    createTweet: async (_, args, ctx) => {
        try {
            await requireAuth(ctx.auth);
            return Tweet.create({ ...args, user: ctx.auth.user._id });
        } catch (err) {
            throw err;
        }
    },

    updateTweet: async (_, { _id, ...rest }, ctx) => {
        try {
            await requireAuth(ctx.auth)
            const tweet = await Tweet.findOne({ _id, user: ctx.auth.user._id });

            if (!tweet) {
                throw new Error('Not found!');
            }

            Object.entries(rest).forEach(([key, value], index) => {
                tweet[key] = value;
            });

            return tweet.save();
        } catch (err) {
            throw err;
        }
    },
    
    deleteTweet: async (_, { _id }, ctx) => {
        try {
            await requireAuth(ctx.auth);
            const tweet = await Tweet.findOne({ _id, user: ctx.auth.user._id });

            if (!tweet) {
                throw new Error('Not found!');
            }

            tweet.remove();

            return {
                message: 'Delete Success',
            };
        } catch (err) {
            throw err;
        }
    },

    myTweets: async (_, args, ctx) => {
        try {
            await requireAuth(ctx.auth);
            return Tweet.find({ user: ctx.auth.user._id }).sort({ createdAt: -1 });
        } catch (err) {
            throw err;
        }
    }
};
