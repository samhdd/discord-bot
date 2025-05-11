// Import required Discord.js module
const { SlashCommandBuilder } = require('discord.js');

// Define the ping command
module.exports = {
	// Command configuration
	data: new SlashCommandBuilder()
		// Command name
		.setName('ping')
		// Command description
		.setDescription('Replies with Pong!'),

	// Command execution handler
	async execute(interaction) {
		// Send response to the interaction
		await interaction.reply('Pong!');
	},
};