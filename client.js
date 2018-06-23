// const SocketClient = require("./SocketClient.js");
// const client = new SocketClient('irc.chat.twitch.tv', 6667, 'operese', 'oauth:8150zj7gr2uwr1blcrdo3mn3eeh2um');

// client.launchConnection(whenConnected);

// function whenConnected(){
//   client.sendMessage("Hello");
// }

const Bot = require('./Bot.js');
const bot = new Bot();
bot.start(() => {
  console.log('started');
  bot.sendMessage("Bot is connected");
});