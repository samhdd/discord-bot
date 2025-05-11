const dotenv = require('dotenv');

dotenv.config();

// Import required Node.js and Discord.js modules
// File system module
const fs = require('node:fs');
// Path utilities
const path = require('node:path');
// Discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Get Discord token from environment variables
const token = process.env.DISCORD_TOKEN;

// Initialize Discord client with Guilds intent
// This allows the bot to receive information about guilds (servers)
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a collection to store commands
client.commands = new Collection();
// Load all commands from the commands directory
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Iterate through each command category folder
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	// Get all .js files in the command folder
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	// Load each command file
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		// Validate and register the command
		if ('data' in command && 'execute' in command) {
			// Add command to collection with name as key
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
// Event handler for when the client becomes ready
client.once(Events.ClientReady, readyClient => {
	// Log successful login with bot's username and tag
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);


// Event handler for slash command interactions
client.on(Events.InteractionCreate, async interaction => {
	// Only handle chat input (slash) commands
	if (!interaction.isChatInputCommand()) return;

	// Get the command from the collection
	const command = interaction.client.commands.get(interaction.commandName);

	// Handle unknown commands
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		// Execute the command
		await command.execute(interaction);
	}
	catch (error) {
		console.error('Command execution error:', error);

		// Handle errors by notifying the user
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
		else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}
});