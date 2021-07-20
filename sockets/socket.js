const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

//Nova instancia da class Bands
const bands = new Bands();

bands.addBand(new Band('Quenn',));
bands.addBand(new Band('Bon Jovi',));
bands.addBand(new Band('Metalica',));

console.log( bands)



//Mensagem de socket
io.on('connection', client => {

    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });


    client.on('mensagem', (payload) => {
        console.log('Mensagem', payload);

        io.emit( 'mensagem', { admin: 'Nova Mensagem'})

    });

    /*client.on('emitir-mensagem', (payload) => {
        // io.emit('Nova mensagem', payload ); //emite a todos  
        client.broadcast.emit('nova-mensagem', payload); //emite a todos menos quem emitiu
    })*/

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {

        const newBand = new Band(payload.name);
        bans.addBand(newBand);
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', (payload) => {
        
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands());

    });


});