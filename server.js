const express = require("express")
const server = express()

server.all("/", (req, res) => {
  res.send("Запускаю процесс!")
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Cервер готов!")
  })
}

module.exports = keepAlive