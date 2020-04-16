import Tweet from '../../models/Tweet';
import FavoriteTweet from '../../models/FavoriteTweet';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const TWEET_ADDED = 'tweetAdded';

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
            const tweet = await Tweet.create({ ...args, user: ctx.auth.user._id });

            pubsub.publish(TWEET_ADDED, { [TWEET_ADDED]: tweet });  // Subscribe & publish when new tweete arrives

            return tweet;
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
    },

    favoriteTweet: async (_, { _id }, ctx) => {
        try {
            await requireAuth(ctx.auth);
            const favorites = await FavoriteTweet.findOne({ userId: ctx.auth.user._id });

            return favorites.userFavoritedOrLikedTweet(_id);

        } catch (err) {
            throw err;
        }
    },

    tweetAdded: {
        subscribe: () => pubsub.asyncIterator(TWEET_ADDED)
    }
};
