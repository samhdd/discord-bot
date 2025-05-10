const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('codeqr')
		.setDescription('turn command arguments into outputs like QR code'),
	async execute() {} }