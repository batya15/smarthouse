import * as mosca from 'mosca';

const ascoltatore = {
    //using ascoltatore
    //type: 'mongo',
    //url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    //mongo: {}
};

const settings = {
    backend: ascoltatore,
    port: 1883,
};

const server = new mosca.Server(settings);

server.on('clientConnected', (client: any) => {
    console.warn(client.connection.stream.remoteAddress);
    console.warn('client connected', client.id);
});

// fired when a message is received
server.on('published', (packet: any, client: any) => {
    console.warn('Published', packet.payload, client);
});

// fired when a client disconnects
server.on('clientDisconnected2', (client: any) => {
    console.warn('Client Disconnected:', client.id);
});

server.on('ready', setup);

const authenticate = (client: any, username: any, password: any, callback: any) => {
    const authorized = (username === 'uedfqehb' && password.toString() === 'aoJHGj-hlq9P');
    if (authorized) {
        client.user = username;
    }
    callback(null, authorized);
};

// fired when the mqtt server is ready
function setup() {
    server.authenticate = authenticate;
    console.warn('Mosca server is up and running');
}
