const SocketClient = require("./SocketClient.js");
const login = require('./Login');

class Bot {
  constructor(commands){
    this.client = new SocketClient(login, commands);
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