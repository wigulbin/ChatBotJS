var handler = module.exports = {
  handlePing: (socket, dataString) => {
    if(dataString.toString().trim() == 'PING :tmi.twitch.tv')
      socket.write("PONG :tmi.twitch.tv\r\n");
  },
  
  capReq: (socket) =>{
    socket.write("CAP REQ :twitch.tv/membership\r\n");
    socket.write("CAP REQ :twitch.tv/commands\r\n");
  },
  
  processMessage: (socket, fullMessage) => {
    let user = fullMessage.substring(fullMessage.indexOf("#"), fullMessage.indexOf(':') - 1);
    let message = fullMessage.substring(fullMessage.indexOf(":") + 1);
    console.log("User: " + user);
    console.log("Message: " + message);
  
    if(message.indexOf('!') === 0)
      commandHandler(socket, message.substring(1), user);
  }
}