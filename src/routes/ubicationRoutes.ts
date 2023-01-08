import { Request, Response, Router } from 'express';
import { Ubication } from '../models/database_model.js';

class UbicationRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', Ubication.getUbications);
        this.router.post('/', Ubication.createUbicationFromRequest);
        this.router.delete('/', Ubication.deleteUbicationFromRequest);
    }
}

const ubicationRoutes = new UbicationRoutes();
ubicationRoutes.routes();
export default ubicationRoutes.router;