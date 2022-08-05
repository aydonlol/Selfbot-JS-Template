const fetch = require('node-fetch');
module.exports.help = {
    name: "randomdog",
    description: "Sends a random dog",
    usage: "randomdog",
    category: "general",
    aliases: ["dog"],
}
module.exports.execute = function (message, args) {
    fetch('https://random.dog/woof.json')
        .then(res => res.json())
        .then(json => message.channel.send(json.url))
        .catch(err => message.channel.send(err));
        
}


