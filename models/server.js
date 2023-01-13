const express = require('express');
const cors = require('cors');
const hbs = require('hbs');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.mainPath = '/';
        this.jsonPath = '/json'

        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.set('view engine', 'hbs');
        hbs.registerPartials(`views/partials`);

        this.app.use(express.static(`public`));

        this.app.use(cors());

        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.mainPath, require('../routes/main-routes'));
        this.app.use(this.jsonPath, require('../routes/json-routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = {
    Server
};