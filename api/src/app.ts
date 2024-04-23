import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'http';
import createIssueRoute from './issue/commands/create-issue/create-issue.route';

export class App {
    private server?: Server;

    start() {
        const app = express();
        app.use(bodyParser.json());
        app.use(createIssueRoute);
        this.server = app.listen(process.env.PORT ?? 3000);
    }

    close() {
        this.server?.close();
    }
}
