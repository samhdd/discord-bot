# Discord Bot Project

## Description
A Discord bot with utility commands including QR code generation, user information, and server management.

## Features
- QR code generation from text/URLs
- Server information commands
- User information commands
- Ping/pong response

## Installation
1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file with:
   - `DISCORD_TOKEN`: Your bot token (from Discord Developer Portal)
   - `CLIENT_ID`: Your bot's client ID (get from Discord Developer Portal > Application > General Information)
   - `GUILD_ID`: Your server ID (right-click server name > Copy Server ID)
4. Run `node deploy-commands.js` to register commands
5. Start the bot with `node index.js` (must be running for commands to work)
6. After bot is online, test commands in your server
## Usage
- Use `/ping` to test bot responsiveness
- Use `/qr [text]` to generate QR codes
- Use `/user` to get user information
- Use `/server` to get server information

## Customizing Commands
To add or modify commands, create new .js files in the `commands/utility/` directory. Each file should define a new command following the structure shown in existing command files.

After adding new commands, run `node deploy-commands.js` to register them with Discord.


## Contributing
Pull requests are welcome. Please open an issue first to discuss changes.

## License
MIT
