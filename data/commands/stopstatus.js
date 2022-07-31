const status = require('./status.js');
module.exports.help = {
    name: "stopstatus",
};

module.exports.execute = function (message, args) {
    if (status.interval === null) return message.channel.send('Status is not running');

    message.channel.send("Stopping status");
    clearInterval(status.interval);
    status.interval = null;
    
}