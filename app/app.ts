import bodyParser from 'body-parser';
import express from 'express';
import loggerMiddleware from './middleware/logger.middleware';
import {BookmarkRoutes} from './routes/bookmarkRoutes';
import cors from 'cors';

class App {
    public app: express.Application;
    public BookmarkPrv: BookmarkRoutes = new BookmarkRoutes();

    constructor() {
        this.app = express();
        this.config();


        this.app.use(cors(this.getCorsConfig()));
        this.app.use(loggerMiddleware);

        this.BookmarkPrv.routes(this.app);
        this.app.options('*', cors(this.getCorsConfig()));

    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    private getCorsConfig(): cors.CorsOptions {
        return {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: '*',
            preflightContinue: false,
            optionsSuccessStatus: 200
        };

    }


}

export default new App().app;