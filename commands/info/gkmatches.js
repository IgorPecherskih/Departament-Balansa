const { Client, CommandInteraction, MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require("fs")
const { getClanGKmatches, getClanStatsById } = require('../../funcs')

module.exports = {
  slash: new SlashCommandBuilder()
    .setName('gkmatches')
    .setDescription("Информация о клановых боях на ГК")
    .addStringOption(option => option.setName("название")
      .setDescription("Название клана")
      .setRequired(true)),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(client, interaction) {
    try {
      const name = interaction.options.getString("название")
      const matches = await getClanGKmatches(name)

      if (matches.length == 0) return interaction.default("У этого клана не найдено боёв", true)

      const str = []
      for (let i = 0; i < matches.length; i++) {
        str.push(`Время: ${convertDate(matches[i].time)}\nПровинция: ${matches[i].province_name}\nТип атаки: ${matches[i].attack_type}\nТип боя: ${matches[i].type}\nПротивник: ${await getCompetitor(matches[i].competitor_id)}\n`)
      }

      fs.writeFileSync(`matches.txt`, str.join("\n\n"))

      interaction.reply({ files: [new MessageAttachment('./matches.txt')] })
    } catch (e) {
      console.log(e)
      interaction.default("Что-то пошло не так!\nПроверьте правильность написания команды", true)
    }
  }
}

function convertDate(data) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  return new Date(data).toLocaleDateString('ru', options)
}

async function getCompetitor(id) {
  return (await getClanStatsById(id)).tag
}