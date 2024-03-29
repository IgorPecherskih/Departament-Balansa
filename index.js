const { Client, Collection } = require("discord.js")
const keepAlive = require("./server")
require('dotenv').config()
const client = new Client({
    intents: 4095 // Get intents bitfield here: https://ziad87.net/intents/
})
client.setMaxListeners(0)

client.commands = new Collection()
client.commandsArray = []

global.Config = require('./jsons/config.json')

require('./handlers/events.js').init(client)

client.login() // Login with DISCORD_TOKEN on .env

client.on('error', error => console.log(error))
client.on('warn', warn => console.log(warn))
process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

module.exports = client;
keepAlive()