import * as mosca from 'mosca';

let ascoltatore = {
    //using ascoltatore
    //type: 'mongo',
    //url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    //mongo: {}
};

let settings = {
    port: 1883,
    backend: ascoltatore
};

let server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
    console.log(client.connection.stream.remoteAddress);
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
    console.log('Published', packet.payload, client);
});

// fired when a client disconnects
server.on('clientDisconnected2', function (client) {
    console.log('Client Disconnected:', client.id);
});

server.on('ready', setup);

let authenticate = function (client, username, password, callback) {
    let authorized = (username === 'uedfqehb' && password.toString() === 'aoJHGj-hlq9P');
    if (authorized) client.user = username;
    callback(null, authorized);
};


// fired when the mqtt server is ready
function setup() {
    server.authenticate = authenticate;
    console.log('Mosca server is up and running');
}