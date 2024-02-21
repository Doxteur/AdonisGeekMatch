import Ws from '../../app/Services/Ws';

Ws.boot();

console.log('on passe dans fichier scket');

Ws.io.on('connection', (socket) => {
  console.log('on passe dans le ws.io.on');
  socket.emit('news', { hello: 'world' })
  console.log('New connection:', socket.id);

  const roomId = socket.handshake.query.roomId;
  if (typeof roomId === 'string') {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room: ${roomId}`);
  }

  socket.on('chat.message', (message) => {
    console.log(`Message received in room ${roomId}:`, message);
    if (typeof roomId === 'string') {
      Ws.io.to(roomId).emit('chat.message', message);
    }
  });
});
