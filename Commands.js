function handleCommands(socket, command, user){
  switch(command){
    case 'mods':
    case 'disconnect':
    case 'subscribers':
    case 'subscribersoff':
    case 'clear':
      socket.write("PRIVMSG #operese :/" + command + "\r\n");
    default:
      socket.write("Invalid command\r\n");
  
  }
}




module.exports = handleCommands;