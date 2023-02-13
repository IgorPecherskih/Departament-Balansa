module.exports = {
    name: 'ready',
    async execute(client) {
        require('../../handlers/cmd.js').init(client)
        console.log(`✨ ${client.user.tag} принялся за работу!`);
        client.user.setStatus("online"); // Устанавливаем статус, один из: dnd (красный), idle (оранжевывй) , online (зеленый) , invisible (нивидимка) 
    client.user.setActivity("на колёсной арте",{type:"PLAYING"}) // Пишем во что играет / слушает / смотрит / стримит бот ; вместо STREAMING можно записать WATCHING (смотрит) / LISTENING (слушает) / PLAYING (играет); Если бот стримит - тогда нужно вписать url *TWITCH* стрима , если нет - убрать этот параметр вместе с запятой перед ним
}
    }