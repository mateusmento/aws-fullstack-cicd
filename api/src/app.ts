import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'http';

export class App {
    private server?: Server;

    start() {
        const app = express();
        app.use(bodyParser.json());        
        app.post('/issues', (req, res) => res.json({}));
        this.server = app.listen(process.env.PORT ?? 3000);
    }

    close() {
        this.server?.close();
    }
}
