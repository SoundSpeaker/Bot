const { bot } = require('./../config.js');
const { Client } = require("discord.js");
const { JsonDatabase } = require("wio.db");

module.exports = class extends Client {

  constructor() {
    super({

      intents: bot.intents,
      scopes: bot.scopes,

      ws: {
        version: "10"
      }
    });
    global.client = this
    global.db = new JsonDatabase({ databasePath: "./database/database.json" });
      
  
    require("../handlers/command-loader")
    require("../handlers/command-handler")(this)
    require("../handlers/event-handler")(this)

    process.on("unhandledRejection", (reason, promise) => console.log(reason, promise))
    process.on("uncaughtException", (err) => console.log(err))
  }

  login() {
    super.login(bot.token).catch(e => console.log(e))
  };
};
