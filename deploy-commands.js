const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;
const commands = [];

const commandsPath = path.join(__dirname, 'commands', 'utility');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing required properties`);
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Refreshing ${commands.length} application commands...`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} commands`);
	}
	catch (error) {
		console.error(error);
	}
})();