import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import helmet from 'helmet';
import compression from 'compression';
import { Database } from './database.js';
import ubicationRoutes from './routes/ubicationRoutes.js';
//Change require to import
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

class Server {
    public app: express.Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    
    config() {
        this.app.set('port', process.env.PORT || 5289);
        this.app.set('trust proxy', true);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        // this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    
    routes() {
        this.app.use('/api/ubications', ubicationRoutes);
    }
    
    async start() {
        await Database.init();
        this.app.listen(this.app.get('port'), () => {
        console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();

export default server.app;