const axios = require("axios")

module.exports = {

    async getPlayerStats(name) {
        const userId = (await axios(`https://api.worldoftanks.ru/wot/account/list/?application_id=${process.env.APP_ID}&search=${name}`)).data.data[0].account_id
        return (await axios(`https://api.worldoftanks.ru/wot/account/info/?application_id=${process.env.APP_ID}&account_id=${userId}`)).data.data[userId]
    },

    async getClanStatsByName(name) {
        const clanId = (await axios(`https://api.worldoftanks.ru/wot/clans/list/?application_id=${process.env.APP_ID}&search=${name}&fields=name%2C+clan_id`)).data.data[0].clan_id
        return Object.assign(
            (await axios(`https://api.worldoftanks.ru/wot/clans/info/?application_id=${process.env.APP_ID}&fields=name%2C+color%2C+created_at%2C+leader_name%2C+members_count%2C+motto%2C+emblems.x256%2C+tag%2C+clan_id&clan_id=${clanId}`)).data.data[clanId],
            (await axios(`https://api.worldoftanks.ru/wot/clanratings/clans/?application_id=${process.env.APP_ID}&clan_id=${clanId}`)).data.data[clanId]
            )
    },

    async getClanStatsById(id) {
        return (await axios(`https://api.worldoftanks.ru/wot/clans/info/?application_id=${process.env.APP_ID}&fields=name%2C+color%2C+created_at%2C+leader_name%2C+members_count%2C+clan_id%2C+motto%2C+emblems.x256%2C+tag&clan_id=${id}`)).data.data[id]
    },

    async getClanGKmatches(name) {
        const clanId = (await axios(`https://api.worldoftanks.ru/wot/clans/list/?application_id=${process.env.APP_ID}&search=${name}&fields=name%2C+clan_id`)).data.data[0].clan_id
        return (await axios(`https://api.worldoftanks.ru/wot/globalmap/clanbattles/?application_id=${process.env.APP_ID}&clan_id=${clanId}`)).data.data
    },
}