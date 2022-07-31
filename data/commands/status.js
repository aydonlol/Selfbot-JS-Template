const fs = require("fs");
const { patchSettings } = require("../modules/settings");
const statusfile = "./data/customstatus.txt";

module.exports.help = {
  name: "status",
  description: "Animated custom status",
  usage: "status <delay>",
  category: "general",
};

module.exports.execute = function (message, args) {
  if (args.length < 1) {
    message.channel.send("Please enter a delay");
    return;
  }
  if (isNaN(args[0])) {
    message.channel.send("Please enter a number");
    return;
  }
  if (args[0] <= 0) {
    message.channel.send("Please enter a number greater than 0");
    return;
  }
  let status = fs.readFileSync(statusfile, "utf8").split("\n");
  let i = 0;
  let interval = setInterval(async () => {
    if (i >= status.length) {
      i = 0;
    }
    await patchSettings({ custom_status: { text: status[i] } });
    i++;

    
  }, args[0] * 1000);
  message.channel.send("Status set");
};
