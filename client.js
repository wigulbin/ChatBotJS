const Bot = require('./Bot.js');
const bot = new Bot();
bot.start(() => {
  console.log('started');
  bot.sendMessage("Bot is connected");
});