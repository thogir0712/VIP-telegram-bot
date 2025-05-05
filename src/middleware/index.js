import { rateLimit } from '@grammyjs/ratelimiter';
import { isVIPMember } from '../utils/auth.js';

export const setupMiddleware = (bot) => {
    // Rate limiting middleware
    bot.use(rateLimit({
        timeFrame: 1000, // 1 second
        limit: 5, // 5 messages per second
    }));

    // VIP channel access middleware
    bot.use(async (ctx, next) => {
        if (ctx.chat?.type === 'channel' && ctx.chat.id.toString() === process.env.VIP_CHANNEL_ID) {
            // Check if the user is a VIP member
            const isVIP = await isVIPMember(ctx.from?.id);
            if (!isVIP) {
                await ctx.reply('Access denied. This channel is for VIP members only.');
                return;
            }
        }
        await next();
    });

    // Logging middleware
    bot.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.from?.username || 'Unknown'} - ${ctx.message?.text || 'No text'} - ${ms}ms`);
    });
}; 