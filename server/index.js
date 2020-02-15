/* eslint no-console: "off" */
const server = require('./server');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));

// var app = express();
// var server = require('http').createServer(app).listen(8080);
// var io = require('socket.io').listen(server);
