import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const isVIPMember = async (userId) => {
    try {
        const user = await User.findOne({ telegramId: userId });
        return user?.isVIP || false;
    } catch (error) {
        console.error('Error checking VIP status:', error);
        return false;
    }
};

export const generateSecureLink = (photoId) => {
    const token = generateToken(photoId);
    return `${process.env.SERVER_URL}/photo/${token}`;
}; 