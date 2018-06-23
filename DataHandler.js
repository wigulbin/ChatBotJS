const commandHandler = require('./Commands');

class DataHandler{
  constructor(commands, socket){
    this.commands = commands;
    this.socket = socket;
  }

  handlePing(dataString){
    if(dataString.toString().trim() == 'PING :tmi.twitch.tv'){
      this.socket.write("PONG :tmi.twitch.tv\r\n");
      console.log("Pong");
    }
  }

  capReq(){
    this.socket.write("CAP REQ :twitch.tv/membership\r\n");
    this.socket.write("CAP REQ :twitch.tv/commands\r\n");
    this.socket.write("CAP REQ :twitch.tv/tags\r\n");
  }

  processMessage(fullMessage){
    let user = fullMessage.substring(fullMessage.indexOf("#"), fullMessage.indexOf(':') - 1);
    let message = fullMessage.substring(fullMessage.indexOf(":") + 1);
    console.log("User: " + user);
    console.log("Message: " + message);
  
    if(message.indexOf('!') === 0)
      commandHandler(this.socket, message.substring(1), user);
  }
}

module.exports = DataHandler