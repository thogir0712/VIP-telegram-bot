import { generateSecureLink } from '../utils/auth.js';
import { User } from '../models/User.js';

export const setupHandlers = (bot) => {
    // Start command
    bot.command('start', async (ctx) => {
        const userId = ctx.from.id;
        const username = ctx.from.username;

        try {
            // Create or update user
            await User.findOneAndUpdate(
                { telegramId: userId },
                { 
                    telegramId: userId,
                    username: username,
                    lastActive: new Date()
                },
                { upsert: true, new: true }
            );

            await ctx.reply('Welcome to the VIP Bot! Use /help to see available commands.');
        } catch (error) {
            console.error('Error in start command:', error);
            await ctx.reply('An error occurred. Please try again later.');
        }
    });

    // Help command
    bot.command('help', async (ctx) => {
        const helpText = `
Available commands:
/start - Start the bot
/help - Show this help message
/photo - Send a photo to the VIP channel
        `;
        await ctx.reply(helpText);
    });

    // Photo command
    bot.command('photo', async (ctx) => {
        try {
            // Check if user is VIP
            const user = await User.findOne({ telegramId: ctx.from.id });
            if (!user?.isVIP) {
                await ctx.reply('This command is only available for VIP members.');
                return;
            }

            await ctx.reply('Please send the photo you want to share in the VIP channel.');
        } catch (error) {
            console.error('Error in photo command:', error);
            await ctx.reply('An error occurred. Please try again later.');
        }
    });

    // Handle photo messages
    bot.on('message:photo', async (ctx) => {
        try {
            // Check if user is VIP
            const user = await User.findOne({ telegramId: ctx.from.id });
            if (!user?.isVIP) {
                await ctx.reply('Only VIP members can share photos.');
                return;
            }

            // Get the largest photo size
            const photo = ctx.message.photo[ctx.message.photo.length - 1];
            const fileId = photo.file_id;

            // Generate secure link
            const secureLink = generateSecureLink(fileId);

            // Send to VIP channel
            await bot.api.sendPhoto(process.env.VIP_CHANNEL_ID, fileId, {
                caption: `Shared by @${ctx.from.username}\n\nAccess link: ${secureLink}`
            });

            await ctx.reply('Photo has been shared in the VIP channel!');
        } catch (error) {
            console.error('Error handling photo:', error);
            await ctx.reply('An error occurred while processing your photo. Please try again later.');
        }
    });

    // Handle unauthorized forwards
    bot.on('message', async (ctx) => {
        if (ctx.message.forward_from_chat?.id.toString() === process.env.VIP_CHANNEL_ID) {
            await ctx.deleteMessage();
            await ctx.reply('Forwarding content from the VIP channel is not allowed.');
        }
    });
}; 