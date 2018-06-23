"use strict"
const net = require('net');
const DataHandler = require('./DataHandler');

class SocketClient {
  constructor(login, commands){
    this.host = login.host;
    this.port = login.port;
    this.nick = login.nick;
    this.pass = login.pass;
    this.commands = commands;

    this.socket = net.connect({
      host: this.host,
      port: this.port
    });
    
    this.dataHandler = new DataHandler([], this.socket);
  }

  data(callback){
    return (message) => {
      let mess = message.toString();
      console.log(mess);

      this.dataHandler.handlePing(mess);

      //Initialize Connection
      if(mess.substring(0,18).trim() == ':tmi.twitch.tv 001'){
        this.dataHandler.capReq();
        callback();
      }

      let indexOfPriv = mess.indexOf('PRIVMSG')
      if(indexOfPriv !== -1){
        let fullMessage = mess.substring(indexOfPriv + 'PRIVMSG'.length).trim();
        this.dataHandler.processMessage(fullMessage);
      }
    }
  }
  
  connect(pass, nick){
    return () => {
      this.socket.write("PASS " + pass + "\r\n");
      this.socket.write("NICK " + nick + "\r\n");

      this.socket.write("JOIN #operese\r\n");
    }
  }

  end(){
    return (message) => {
      console.log('DONE');
      console.log(message);
    }
  }

  launchConnection(callback){
    this.socket.on('data', this.data(callback))
          .on('connect', this.connect(this.pass, this.nick))
          .on('end', this.end())
          .on('error', function(e){
            console.log(e);
          });
  }

  sendMessage(message){
    console.log("PRIVMSG #operese :" + message);
    this.socket.write("PRIVMSG #operese :" + message + "\r\n");
  }
  
}

module.exports = SocketClient