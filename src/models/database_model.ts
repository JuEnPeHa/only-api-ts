import { nanoid } from 'nanoid';
import { Database } from '../database.js';
import { Request, Response } from 'express';


export class Ubication {
    public static id: string;
    public static latitude: string;
    public static longitude: string;
    public static date: string;
    public static ip: string;

    public constructor(
        public id: string,
        public latitude: string,
        public longitude: string,
        public date: string,
        public ip: string
    ) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date = date;
        this.ip = ip;
    }

    public static async getUbications(req: Request, res: Response) {
        const ubications = await Database.getUbications();
        res.json(ubications);
    }

    public static async getUbication(id: string) {
        return await Database.getUbication(id);
    }

    public static async createUbication(ubication: Ubication) {
        await Database.createUbication(ubication);
    }

    public static async createUbicationFromRequest(req: Request, res: Response) {
        const id = nanoid();
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const date = new Date().toLocaleString();
        const ip = req.ip;
        const ubication = new Ubication(id, latitude, longitude, date, ip);
        await Ubication.createUbication(ubication);
        res.json(ubication);
    }

    public static async deleteUbicationFromRequest(req: Request, res: Response) {
        const id = req.body.id;
        console.log(id);
        const deleted: boolean = await Database.deleteUbication(id);
        res.json({ deleted: deleted });
    }

    public static async getUbicationFromRequest(req: any) {
        const id = req.body.id;
        return await Ubication.getUbication(id);
    }


    public static async getUbicationFromRequestById(req: any) {
        const id = req.params.id;
        return await Ubication.getUbication(id);
    }

}