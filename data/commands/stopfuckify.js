const fuckify = require('./fuckify');
module.exports.help = {
    name: "stopfuckify",
    description: "Stops fuckify",
    usage: "stopfuckify",
    category: "general",
    aliases: ["stopfuck"],
}
module.exports.execute = function (message, args) {
    if(fuckify.interval === null) return message.channel.send('Fuckify is not running');
    message.channel.send("Stopping fuckify");
    clearInterval(fuckify.interval);
    fuckify.interval = null;
}
