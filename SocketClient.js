"use strict"
const net = require('net');
const commandHandler = require('./Commands');
const noticeHandler = require('./Notice');
const dataHandler = require('./DataHandler');

class SocketClient {
  constructor(host, port, nick, pass){
    this.host = host;
    this.port = port;
    this.nick = nick;
    this.pass = pass;

    this.socket = net.connect({
      host: this.host,
      port: this.port
    });
  }

  data(socket, callback){
    return function(message){
      let mess = message.toString();
      console.log(mess);

      dataHandler.handlePing(socket, mess);

      if(mess.substring(0,18).trim() == ':tmi.twitch.tv 001'){
        dataHandler.capReq(socket);
        callback();
      }

      let indexOfPriv = mess.indexOf('PRIVMSG')
      if(indexOfPriv !== -1){
        let fullMessage = mess.substring(indexOfPriv + 'PRIVMSG'.length).trim();
        dataHandler.processMessage(socket, fullMessage);
      }
    }
  }

  
  
  connect(socket, pass, nick){
    return function(){
      socket.write("PASS " + pass + "\r\n");
      socket.write("NICK " + nick + "\r\n");

      socket.write("JOIN #operese\r\n");

    }
  }

  end(socket){
    return function(message){
      console.log('DONE');
      console.log(message);
    }
  }

  launchConnection(callback){
    this.socket.on('data', this.data(this.socket, callback))
          .on('connect', this.connect(this.socket, this.pass, this.nick))
          .on('end', this.end(this.socket))
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