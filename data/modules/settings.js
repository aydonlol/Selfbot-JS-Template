const https = require("https");
const cfgToken = require("../../config.json").token;

async function patchSettings(settings, token=cfgToken) {
  // Make PATCH request to discord settings api
  const options = {
    hostname: "discord.com",
    port: 443,
    path: "/api/v9/users/@me/settings",
    method: "PATCH",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US",
      Authorization: token,
      "Content-Type": "application/json",
      Origin: "https://discord.com",
      Referer: "https://discord.com/channels/@me",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.136 Chrome/91.0.4472.164 Electron/13.6.6 Safari/537.36",
      "X-Debug-Options": "bugReporterEnabled",
      "X-Discord-Locale": "en-US",
      "X-Super-Properties":
        "eyJvcyI6IkxpbnV4IiwiYnJvd3NlciI6IkRpc2NvcmQgQ2xpZW50IiwicmVsZWFzZV9jaGFubmVsIjoiY2FuYXJ5IiwiY2xpZW50X3ZlcnNpb24iOiIwLjAuMTM2Iiwib3NfdmVyc2lvbiI6IjUuMTguMTQtYXJjaDEtMSIsIm9zX2FyY2giOiJ4NjQiLCJzeXN0ZW1fbG9jYWxlIjoiZW4tVVMiLCJ3aW5kb3dfbWFuYWdlciI6InVua25vd24sdW5rbm93biIsImRpc3RybyI6IlwiQXJjaCBMaW51eFwiIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTM4MjM5LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
    },
  };

  return new Promise(function (resolve, reject) {
    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve();
      } else {
        req.pipe(process.stdout);
        throw new Error(
          `Got status code ${res.statusCode} ${res.statusMessage}`
        );
      }
    });

    req.write(JSON.stringify(settings));
    req.end();
  });
}

module.exports = {
  patchSettings,
};
