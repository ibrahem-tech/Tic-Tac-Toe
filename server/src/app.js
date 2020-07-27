const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server);

const {makeKey} = require('./utils');
const {createGame} = require('./data/games')
const {createPlayer, getPlayer, removePlayer} = require('./data/players')

const PORT = process.env.PORT || 7000

io.on('connection', socket => {

    socket.on('disconnect', () => {
        const player = getPlayer(socket.id);
        if(player){
            removePlayer(player.id)
        }
    })
    //Players create a new game
    socket.on('createGame', ({ name }) => {
        const gameId = `game-${makeKey()}`;
    
        const player = createPlayer(socket.id, name, gameId, 'X');
    
        const game = createGame(gameId, player.id, null);

        socket.join(gameId);
        socket.emit('playerCreated', {player});
        socket.emit('gameUpdated', {game})

        
        socket.emit('notification', {
            message: `The game gas been created. Game id is ${gameId}. Send this to your feiend to join.`
        });
        socket.emit('notification', {
            message: 'Wating for opponent...'
        });
   })
});

server.listen(PORT, () => {
    console.log(`Server is ready to listen on port ${PORT}`)
});