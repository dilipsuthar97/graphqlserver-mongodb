import mongoose, { Schema } from 'mongoose';

const TweetSchema = new Schema({
        text: {
            type: String,
            minlength: [5, 'Text should be longer'],
            maxlength: [144, 'Text too long']
        },
        user: {
            type: Schema.Types.ObjectId,    // Connection to the User object via mongodb object ID
            ref: 'User'
        },
        likesCount: {
            type: Number,
            default: 0
        }
},{ timestamps: true });

TweetSchema.statics = {
    incLikesCount(tweetId) {
        return this.findByIdAndUpdate(tweetId, { $inc: { likesCount: 1 } }, { new: true });
    },
    decLikesCount(tweetId) {
        return this.findByIdAndUpdate(tweetId, { $inc: { likesCount: -1 } }, { new: true });
    }
}

export default mongoose.model('Tweet', TweetSchema);
