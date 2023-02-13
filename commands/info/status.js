const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { getPlayerStats, getClanStatsById } = require('../../funcs')

module.exports = {
	slash: new SlashCommandBuilder()
			.setName('online')
			.setDescription("Получить информацию о игроке")
			.addStringOption(option=>option.setName("никнейм")
					.setDescription("Никнейм пользователя")
					.setRequired(true)),
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	async execute(client, interaction) {
		try {
			const online = [];

			const response = await fetch('https://api.wgstatus.com/api/data/wot', {
				method: 'GET'
			})
					.then(response => response.json())
					.then(data => {
						data.results[0][2].data.servers.forEach(n => arr.push(n.online))
						console.log(online)})

			const embed = new MessageEmbed()
					.setColor(Config.colors.primary)
					.addFields([
						{name: `EU`,  value: `${online[0]}`}
					])
		} catch (error) {
			console.log(error)
		}
	}
}


