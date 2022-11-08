const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { getPlayerStats, getClanStatsById } = require('../../funcs')

module.exports = {
    slash: new SlashCommandBuilder()
        .setName('userinfo')
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
            const name = interaction.options.getString("никнейм")
            const stats = await getPlayerStats(name)
            const clan = !stats.clan_id ? undefined : await getClanStatsById(stats.clan_id)

            const clanObj = {name: `Клан`, value: !clan ? `\`\`Нет\`\`` : `[\`\`${clan?.tag}] ${clan?.name}\`\`](https://ru.wargaming.net/users/wot/${clan.clan_id}/)`, inline: true}
            const all = stats.statistics.all

            const avgWins = ((all.wins / all.battles) * 100).toFixed(2)
            const avgLosses = ((all.losses / all.battles) * 100).toFixed(2)
            const avgDraws = ((all.draws / all.battles) * 100).toFixed(2)

            const embed = new MessageEmbed()
                .setColor(Config.colors.primary)
                .addFields([
                    {name: `\`\`${stats.nickname}\`\``, value: `**<:ratingribbon:991441436174200983> Рейтинг WG:** ${stats.global_rating}`, inline: true},
                    {name: '\u200b', value: '\u200b', inline: true},
                    clanObj,

                    {
                        name: `<:stats_btl:991441437457657916> Боёв: ${all.battles}`, value: `**Побед:** ${all.wins} (${avgWins}%)
**Поражений:** ${all.losses} (${avgLosses}%)
**Ничьих:** ${all.draws} (${avgDraws}%)
                `
                    },

                    {
                        name: `Макс. результаты:`, value: `
**<:dmgperbtl:991441416360296608> Урон:** ${all.max_damage}
**<:stats_frags:991441438887919807> Фраги:** ${all.max_frags}
**<:maxexp:991441430805487707> Чистый опыт:** ${all.max_xp}
                `, inline: true
                    },
                    {name: '\u200b', value: '\u200b', inline: true},
                    {
                        name: `Ср. значения:`, value: `
**<:dmgperbtl:991441416360296608> Урон:** ${(all.damage_dealt / all.battles).toFixed()}
**<:assisteddmg:991441410257604638> Ассист:** ${all.avg_damage_assisted}
**<:avgexp:991441413336215682> Чистый опыт:** ${all.battle_avg_xp}
                `, inline: true
                    },

                    {
                        name: '\u200b', value: `**Последний бой:** <t:${stats.last_battle_time}:D>
**Последняя игровая сессия:** <t:${stats.logout_at}:D>
**Создание аккаунта:** <t:${stats.created_at}:D>
            `
                    }
                ])

            !clan ? null : embed.setThumbnail(clan.emblems.x256.wowp)

            interaction.reply({embeds: [embed]})
        } catch (e) {
            console.log(e)
            interaction.default("Что-то пошло не так!\nПроверьте правильность написания команды", true)
        }
    }
}

