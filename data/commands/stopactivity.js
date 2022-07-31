const Discord = require("legend.js");
const client = new Discord.Client();
module.exports.help = {
    name: "stopactivity",
    description: "Stops custom activity",
    usage: "stopactivity",
    category: "general",
    aliases: ["stopact"],
}
module.exports.execute = function (message, args) {
    message.channel.send("Stopping activity");
    client.user.setActivity(null);
}
// Compare this snippet from data\commands\status.js: