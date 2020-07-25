const http = require('http');
const server = http.createServer();
const PORT = process.env.PORT || 7000

server.listen(PORT, () => {
    console.log(`Server is ready to listen on port ${PORT}`)
});