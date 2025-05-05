# VIP Telegram Bot

A secure Telegram bot for managing VIP content with protection against unauthorized sharing.

## Features

- Secure photo sharing in VIP channels
- Protection against unauthorized content forwarding
- VIP member access control
- Secure link generation for photo access
- Rate limiting and security measures

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Telegram Bot Token (from @BotFather)
- VIP Channel ID

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd vip-telegram-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
BOT_TOKEN=your_bot_token_here
VIP_CHANNEL_ID=your_channel_id_here
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
SERVER_URL=your_server_url_here
```

4. Start the bot:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Usage

1. Start the bot with `/start`
2. Use `/help` to see available commands
3. VIP members can use `/photo` to share photos in the VIP channel

## Security Features

- Rate limiting to prevent abuse
- JWT-based secure links
- Protection against content forwarding
- VIP member verification
- MongoDB for secure data storage

## Contributing

Feel free to submit issues and enhancement requests.
