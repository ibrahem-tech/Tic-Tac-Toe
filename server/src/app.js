const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server);

const {makeKey} = require('./utils');
const {createGame, getGame, updateGame} = require('./data/games')
const {createPlayer, getPlayer, removePlayer} = require('./data/players');
const games = require('./data/games');

const PORT = process.env.PORT || 7000

io.on('connection', socket => {
    socket.on('disconnect', () => {
      const player = getPlayer(socket.id);
      if (player) {
        removePlayer(player.id);
      }
    });
  
    // Player create new game
    socket.on('createGame', ({ name }) => {
      const gameId = `game-${makeKey()}`;
  
      const player = createPlayer(socket.id, name, gameId, 'X');
  
      const game = createGame(gameId, player.id, null);
  
      socket.join(gameId);
      socket.emit('playerCreated', { player });
      socket.emit('gameUpdated', { game });
  
      socket.emit('notification', {
        message: `The game has been created. Game id: ${gameId}. Send this to your friend to join you`,
      });
      socket.emit('notification', {
        message: 'Waiting for opponent ...',
      });
    });
  
    socket.on('joinGame', ({ name, gameId }) => {
      // Check game id
      const game = getGame(gameId);
      if (!game) {
        socket.emit('notification', {
          message: 'Invalid game id',
        });
        return;
      }
      // Check Max player
      if (game.player2) {
        socket.emit('notification', {
          message: 'Game is full',
        });
        return;
      }
       // create player
       const player = createPlayer(socket.id, name, game.id, 'O');
       // Update  the game
       game.player2 = player.id;
       game.status = 'playing';
       updateGame(game);
   
       // notify other player
       socket.join(gameId);
       socket.emit('playerCreated', { player });
       socket.emit('gameUpdated', { game });
   
       socket.broadcast.emit('gameUpdated', { game });
       socket.broadcast.emit('notification', {
         message: `${name} has joined the game.`,
       });
     });

   
});





server.listen(PORT, () => {
    console.log(`Server is ready to listen on port ${PORT}`)
});