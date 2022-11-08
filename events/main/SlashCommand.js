const { Interaction, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        if(!interaction.guild) return;

        const cmd = client.commands.get(interaction.commandName)
        if (!cmd) return;

        interaction.default = async (message, foo) => await interaction.reply({ embeds: [new MessageEmbed({ description: message, color: Config.colors.success })], ephemeral: foo })

        cmd.execute(client, interaction)
    }
}
