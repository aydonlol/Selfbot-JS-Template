const Discord = require("legend.js"); // minecraft module
const client = new Discord.Client(); // minecraft client
const config = require("./config.json"); // minecraft config file
const fs = require("fs"); // minecraft file system module

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Discord.Collection();
fs.readdir("./data/commands/", (err, files) => {
  if (err) console.error(err);
  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("No commands found.");
    return;
  }
  
  jsfile.forEach((f, i) => {
    let props = require(`./data/commands/${f}`);
    const aliases = props.help.aliases;
    if (aliases) {
      aliases.forEach((alias) => {
        client.commands.set(alias, props);
      })
    };
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });

});

if (config.token === "") {
  console.log("Please enter your token in config.json");
  process.exit(1);
}
if (config.prefix === "") {
  console.log("Please enter your prefix in config.json");
  process.exit(1);
}

client.on("message", (message) => {
  if (message.author.id !== client.user.id) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.channel.send("there was an error trying to execute that command!");
    message.channel.send(error);
  }
});

client.login(config.token);
