const { SlashCommandBuilder } = require('discord.js');
const QRCode = require('qrcode');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qr')
		.setDescription('Generate a QR code from text or URL')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('The text or URL to encode in the QR code')
				.setRequired(true)),
	async execute(interaction) {
		const text = interaction.options.getString('text');

		try {
			// Generate QR code as a Data URL
			const qrImage = await QRCode.toDataURL(text);

			// Convert Data URL to Buffer
			const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
			const buffer = Buffer.from(base64Data, 'base64');

			// Send the image as an attachment
			await interaction.reply({
				content: 'Here is your QR code:',
				files: [{ attachment: buffer, name: 'qr.png' }],
			});
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Failed to generate QR code.', ephemeral: true });
		}
	},
};