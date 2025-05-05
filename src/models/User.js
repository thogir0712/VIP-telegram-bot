import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    isVIP: {
        type: Boolean,
        default: false
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', userSchema);
