"use strict"
const net = require('net');
const noticeHandler = require('./Notice');
const DataHandler = require('./DataHandler');


class SocketClient {
  constructor(host, port, nick, pass, commands){
    this.host = host;
    this.port = port;
    this.nick = nick;
    this.pass = pass;
    this.commands = commands;

    this.socket = net.connect({
      host: this.host,
      port: this.port
    });
    
    this.dataHandler;
  }

  data(callback){
    return (message) => {
      let mess = message.toString();
      console.log(mess);

      //Initialize Connection
      if(mess.substring(0,18).trim() == ':tmi.twitch.tv 001'){
        this.dataHandler = new DataHandler([], this.socket);
        this.dataHandler.capReq();
        callback();
      }

      this.dataHandler.handlePing(this.socket, mess);

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