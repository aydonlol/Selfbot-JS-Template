const Discord = require("legend.js");
const client = new Discord.Client();
module.exports.help = {
    name: "activtity",
    description: "Sets custom activity - Streaming, Listening to, Playing, etc.",
    usage: "activity <type> <name>",
    category: "general",
    aliases: ["act"],
}
module.exports.execute = function (message, args) {
    if (args.length < 2) {
        message.channel.send("Please enter a type and name");
        return;
    }
    let type = args[0];
    let name = args.slice(1).join(" ");
    if (type === "streaming") {
        type = "STREAMING";
    } else if (type === "listening") {
        type = "LISTENING";
    } else if (type === "playing") {
        type = "PLAYING";
    } else {
        message.channel.send("Please enter a valid type");
        return;
    }
    client.user.setActivity(name, { type: type });
    message.channel.send("Activity set");
}
// Compare this snippet from data\commands\stopactivity.js:
