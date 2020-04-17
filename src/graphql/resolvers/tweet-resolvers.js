import Tweet from '../../models/Tweet';
import FavoriteTweet from '../../models/FavoriteTweet';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const TWEET_ADDED = 'tweetAdded';
export const TWEET_FAVORITED = 'tweetFavorited';

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
            const p1 = Tweet.find({}).sort({ createdAt: -1 });
            const p2 = FavoriteTweet.findOne({ userId: ctx.auth.user._id });
            const [tweets, favorites] = await Promise.all([p1, p2]);

            // It will check if logged in user have liked/favorited tweets
            // if found change isFavorited value of Tweet type to true 
            // and if not than change it to false
            // and return new array of modifed tweets for each user!!
            const tweetsToSend = tweets.reduce((arr, tweet) => {
                const tweetJSON = tweet.toJSON();

                if (favorites.tweets.some(t => t.equals(tweet._id))) {
                    arr.push({
                        ...tweetJSON,
                        isFavorited: true
                    });
                } else {
                    arr.push({
                        ...tweetJSON,
                        isFavorited: false
                    })
                }

                return arr;
            }, []); // Here [] is initial value for arr in callback function
            
            return tweetsToSend;
        } catch (err) {
            throw err;
        }
    },

    createTweet: async (_, args, ctx) => {
        try {
            await requireAuth(ctx.auth);
            const tweet = await Tweet.create({ ...args, user: ctx.auth.user._id });

            // Subscription event
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
    },
    tweetFavorited: {
        subscribe: () => pubsub.asyncIterator(TWEET_FAVORITED)
    }
};
