// Import required modules
const { SlashCommandBuilder } = require('discord.js');
const QRCode = require('qrcode');

// Define the QR command
module.exports = {
	// Command configuration
	data: new SlashCommandBuilder()
		// Command name
		.setName('qr')
		// Command description
		.setDescription('Generate a QR code from text or URL')
		.addStringOption(option =>
			// Option name
			option.setName('text')
			// Option description
				.setDescription('The text or URL to encode in the QR code')
			// Make option required
				.setRequired(true)),
	// Command execution handler
	async execute(interaction) {
		// Get input text from interaction
		const text = interaction.options.getString('text');

		try {
			// Generate QR code as a Data URL
			const qrImage = await QRCode.toDataURL(text);

			// Convert Data URL to Buffer for Discord attachment
			const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
			const buffer = Buffer.from(base64Data, 'base64');

			// Send the QR code image as an attachment
			await interaction.reply({
				content: 'Here is your QR code:',
				files: [{ attachment: buffer, name: 'qr.png' }],
			});
		}
		catch (error) {
			// Handle errors during QR generation
			console.error('QR generation error:', error);
			await interaction.reply({
				content: 'Failed to generate QR code.',
				ephemeral: true,
			});
		}
	},
};