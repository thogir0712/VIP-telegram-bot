import { Bot, session } from 'grammy';
import { FileAdapter } from '@grammyjs/storage-file';
import { run } from '@grammyjs/runner';
import { config } from 'dotenv';
import { setupMiddleware } from './middleware/index.js';
import { setupHandlers } from './handlers/index.js';
import { connectDB } from './config/database.js';
import "dotenv/config";
import bot from "./bot.js";
import { hydrateReply } from "@grammyjs/parse-mode";
import responseMessages from "./responses/response.js";
import UserRepository from "./repository/userRepo.js";
import createGift from "./utils/gift_utils.js";
import changebalance from "./utils/balanChange.js";
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import fetchDownloadLink from './utils/fetchDownloadLink.js'
import { countUsersForUrl, countUsersByUsername, getResults, getAllResults, countTotalUsers, getResultsUser } from './utils/fileSearch.js';
import fss from 'fs/promises';
import { InputFile } from "grammy";
import chalk from "chalk";
import importAllFiles from "./utils/convertDb.js";
import { exec } from 'child_process';
import checkUserPermission from "./utils/checkUserPermission.js";
import { validCc } from "./utils/validador_cc.js";

// Load environment variables
config();

// Initialize bot
const bot = new Bot(process.env.BOT_TOKEN);

// Setup session middleware
bot.use(session({
    initial: () => ({}),
    storage: new FileAdapter('sessions.json')
}));

// Setup middleware
setupMiddleware(bot);

// Setup handlers
setupHandlers(bot);

// Error handling
bot.catch((err) => {
    console.error('Bot error:', err);
});

// Start the bot
async function startBot() {
    try {
        // Connect to database
        await connectDB();
        
        // Start the bot
        await run(bot);
        console.log('Bot started successfully!');
    } catch (error) {
        console.error('Failed to start bot:', error);
        process.exit(1);
    }
}

startBot();
