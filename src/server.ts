import express from 'express';
import { Express, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { healthCheckRoute } from './routes';

export class HTTPServer {
    private static instance: HTTPServer;
    private app = express();
    private port = 3000;

    private constructor() {
        this.app.use(cors())
        /*this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());*/

        const routes: ((app: Express) => void)[] = [
            healthCheckRoute
        ];
        routes.forEach(route => route(this.app));

        this.app.use((request: Request, result: Response) => {
            result.status(404).send({ url: request.originalUrl + ' not found' })
        });
    }

    public static getInstance(): HTTPServer {
        if (!HTTPServer.instance) {
            HTTPServer.instance = new HTTPServer();
        }

        return HTTPServer.instance;
    }

    public run() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

const server = HTTPServer.getInstance();

server.run();
