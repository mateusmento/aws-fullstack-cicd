import bodyParser from 'body-parser';
import express, { Express, Router } from 'express';
import { Server } from 'http';

export class AppBuilder {
    private routes: Router[] = [Router()];

    withRoutes(...routes: Router[]) {
        this.routes.push(...routes);
        return this;
    }

    build() {
        const app = express();
        app.use(bodyParser.json());
        app.use(...this.routes);
        return new App(app);
    }
}

export class App {
    private server?: Server;

    constructor(private app: Express) {}

    start(port: number = 3000) {
        return new Promise<void>((res, rej) => {
            this.server = this.app.listen(process.env.PORT ?? port, res);
        });
    }

    close() {
        return new Promise<void>((res, rej) => {
            this.server?.close((err?: Error) => err ? rej(err) : res());
        });
    }
}
