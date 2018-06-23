const SocketClient = require("./SocketClient.js");

class Bot {
  constructor(commands){
    this.client = new SocketClient('irc.chat.twitch.tv', 6667, 'operese', 'oauth:8150zj7gr2uwr1blcrdo3mn3eeh2um', commands);
    this.commands = commands;
  }


  start(callBack) {
    this.client.launchConnection(callBack);
    console.log("Connecting to: " + this.client.host + " as " + this.client.nick)
  }


  sendMessage(message){
    this.client.socket.write("PRIVMSG #operese :" + message + "\r\n")
  }
}

module.exports = Bot