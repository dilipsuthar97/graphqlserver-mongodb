import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            default: null,
        },
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
        },
        password: String,
        profile: {
            type: String,
            default: null,
        },
    },
    { timestamps: true },
);

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await this.hashPassword(this.password);
        return next();
    }

    return next();
});

UserSchema.methods = {
    hashPassword(password) {
        return bcrypt.hash(password, 10);
    },
    authenticateUser(password) {
        return bcrypt.compare(password, this.password);
    },
    createToken() {
        return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
    }
};

export default mongoose.model('User', UserSchema);
