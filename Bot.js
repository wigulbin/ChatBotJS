const SocketClient = require("./SocketClient.js");

class Bot {
  constructor(){
    this.client = new SocketClient('irc.chat.twitch.tv', 6667, 'operese', 'oauth:8150zj7gr2uwr1blcrdo3mn3eeh2um');
  }


  start(callBack) {
    this.client.launchConnection(callBack);
  }


  sendMessage(message){

  }
}

module.exports = Bot