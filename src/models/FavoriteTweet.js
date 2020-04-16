import mongoose, { Schema } from 'mongoose';

import Tweet from './Tweet';

const FavoriteTweetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tweets: [{
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }]
});

FavoriteTweetSchema.methods = {
    async userFavoritedOrLikedTweet(tweetId) {
        if (this.tweets.some(t => t.equals(tweetId))) {
            // We already have the liked / favorited this tweet so => remore it
            this.tweets.pull(tweetId);
            await this.save();

            const tweet = await Tweet.decLikesCount(tweetId);

            const t = tweet.toJSON();

            return {
                isFavorited: false,
                ...t
            }
        }

        // We don't have liked this tweet so => add it
        const tweet = await Tweet.incLikesCount(tweetId);

        const t = tweet.toJSON();

        this.tweets.push(tweetId);
        await this.save();

        return {
            isFavorited: true,
            ...t
        }
    }
}

FavoriteTweetSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model('FavoriteTweet', FavoriteTweetSchema);