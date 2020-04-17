import GraphQLDate from 'graphql-date';

import TweetResolvers from './tweet-resolvers';
import UserResolvers from './user-resolvers';
import User from '../../models/User';

export default {
    Date: GraphQLDate,
    Tweet: {
        user: (parent) => User.findById(parent.user),   // Here parent is a Obj retured after createTweet API
    },
    Query: {
        getTweet: TweetResolvers.getTweet,
        getTweets: TweetResolvers.getTweets,
        me: UserResolvers.me,
        myTweets: TweetResolvers.myTweets,
    },
    Mutation: {
        createTweet: TweetResolvers.createTweet,
        updateTweet: TweetResolvers.updateTweet,
        deleteTweet: TweetResolvers.deleteTweet,
        favoriteTweet: TweetResolvers.favoriteTweet,
        signup: UserResolvers.signup,
        login: UserResolvers.login,
    },
    Subscription: {
        tweetAdded: TweetResolvers.tweetAdded,
        tweetFavorited: TweetResolvers.tweetFavorited,
    }
};
