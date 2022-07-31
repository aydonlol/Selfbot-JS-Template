module.exports.help = {
    name: "randomcat",
    description: "Sends a random cat",
    usage: "randomcat",
    category: "general",
    aliases: ["cat"],
}
module.exports.execute = function (message, args) {
    message.channel.send("https://cataas.com/cat");
}

