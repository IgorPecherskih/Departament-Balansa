const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { getClanStatsByName } = require('../../funcs')

module.exports = {
  slash: new SlashCommandBuilder()
    .setName('claninfo')
    .setDescription("Информация о клане")
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
      const clan = await getClanStatsByName(name)
      const clanName = `[${clan?.tag || "Нет"}] ${clan?.name || "Нет"}`

      const embed = new MessageEmbed()
        .setColor(clan.color)
        .setDescription(` [\`\`${clanName}\`\`](https://eu.wargaming.net/clans/wot/${clan.clan_id}/) `)
        .setThumbnail(clan.emblems.x256.wowp)
        .addFields([
          { name: `Девиз:`, value: `${clan.motto ? clan.motto : "Нет"}` },

          { name: 'Лидер клана:', value: `\`\`${clan.leader_name}\`\``, inline: true },
          { name: `<:members_count:991441432340594790> Личный состав:`, value: `${clan.members_count}`, inline: true },
          { name: `Создан:`, value: `<t:${clan.created_at}:D>`, inline: true },

          {
            name: `<:pedestal:991441433527599205> Рейтинг клана:`,
            value: `**${clan.efficiency.value}** (${!clan.efficiency.rank_delta ? `---` : `**${clan.efficiency.rank}** место | ${(clan.efficiency.rank_delta.toString())[0] == "-" ? `${clan.efficiency.rank_delta}` : `+${clan.efficiency.rank_delta}`}`})`,
            inline: true
          },
          {
            name: `<:avgwins:991441414888112198> Ср. % побед по клану`,
            value: `**${clan.wins_ratio_avg.value}** (${!clan.fb_elo_rating_10.rank_delta ? `---` : `**${clan.fb_elo_rating_10.rank}** место | ${(clan.wins_ratio_avg.rank_delta.toString())[0] == "-" ? `${clan.wins_ratio_avg.rank_delta}` : `+${clan.wins_ratio_avg.rank_delta}`}`})`,
            inline: true
          },

          { name: '\u200b', value: '\u200b' },

          {
            name: `<:logo_fb:991441427546517554> Укрепрайон ЭЛО:`,
            value: `<:fb_elo_rating_10:991441421070512279> **${clan.fb_elo_rating_10.value}** (${!clan.fb_elo_rating_10.rank_delta ? `---` : `**${clan.fb_elo_rating_10.rank}** место | ${(clan.fb_elo_rating_10.rank_delta?.toString())[0] == "-" ? `${clan.fb_elo_rating_10.rank_delta}` : `+${clan.fb_elo_rating_10.rank_delta}`}`})
                        <:fb_elo_rating_8:991441419778666546> **${clan.fb_elo_rating_8.value}** (${!clan.fb_elo_rating_8.rank_delta ? `---` : `**${clan.fb_elo_rating_8.rank}** место | ${(clan.fb_elo_rating_8.rank_delta?.toString())[0] == "-" ? `${clan.fb_elo_rating_8.rank_delta}` : `+${clan.fb_elo_rating_8.rank_delta}`}`})
                        <:fb_elo_rating_6:991441417987698709> **${clan.fb_elo_rating_6.value}** (${!clan.fb_elo_rating_6.rank_delta ? `---` : `**${clan.fb_elo_rating_6.rank}** место | ${(clan.fb_elo_rating_6.rank_delta?.toString())[0] == "-" ? `${clan.fb_elo_rating_6.rank_delta}` : `+${clan.fb_elo_rating_6.rank_delta}`}`})                        
                        `,
            inline: true
          },
          {
            name: `<:logo_gm:991441429048082532> Глобальная карта ЭЛО:`,
            value: `<:gm_elo_rating_10:991441425906532462> **${clan.gm_elo_rating_10.value}** (${!clan.gm_elo_rating_10.rank_delta ? `---` : `**${clan.gm_elo_rating_10.rank}** место | ${(clan.gm_elo_rating_10.rank_delta?.toString())[0] == "-" ? `${clan.gm_elo_rating_10.rank_delta}` : `+${clan.gm_elo_rating_10.rank_delta}`}`})
                        <:gm_elo_rating_6:991441422584664294> **${clan.gm_elo_rating_8.value}** (${!clan.gm_elo_rating_8.rank_delta ? `---` : `**${clan.gm_elo_rating_8.rank}** место | ${(clan.gm_elo_rating_8.rank_delta?.toString())[0] == "-" ? `${clan.gm_elo_rating_8.rank_delta}` : `+${clan.gm_elo_rating_8.rank_delta}`}`})
                        <:gm_elo_rating_8:991441424203657356> **${clan.gm_elo_rating_6.value}** (${!clan.gm_elo_rating_6.rank_delta ? `---` : `**${clan.gm_elo_rating_6.rank}** место | ${(clan.gm_elo_rating_6.rank_delta?.toString())[0] == "-" ? `${clan.gm_elo_rating_6.rank_delta}` : `+${clan.gm_elo_rating_6.rank_delta}`}`})
                        `,
            inline: true
          },
        ])

      interaction.reply({ embeds: [embed] })
    } catch (e) {
      console.log(e)
      interaction.default("Что-то пошло не так!\nПроверьте правильность написания команды", true)
    }
  }
}

