// parse all group chats and leave them all
const config = require("./config.json");
const fs = require("fs");
module.exports.help = { 
    name: "leaveallgroupchats",
    description: "Leaves all group chats",
    usage: "leaveallgroupchats",
    category: "general",
    aliases: ["leaveallgc", "leaveallgroupchats"],
}


