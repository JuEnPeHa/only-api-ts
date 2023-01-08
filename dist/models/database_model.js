var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nanoid } from 'nanoid';
import { Database } from '../database.js';
export class Ubication {
    constructor(id, latitude, longitude, date, ip) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date = date;
        this.ip = ip;
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date = date;
        this.ip = ip;
    }
    static getUbications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ubications = yield Database.getUbications();
            res.json(ubications);
        });
    }
    static getUbication(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Database.getUbication(id);
        });
    }
    static createUbication(ubication) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Database.createUbication(ubication);
        });
    }
    static createUbicationFromRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = nanoid();
            const latitude = req.body.latitude;
            const longitude = req.body.longitude;
            const date = new Date().toLocaleString();
            const ip = req.ip;
            const ubication = new Ubication(id, latitude, longitude, date, ip);
            yield Ubication.createUbication(ubication);
            res.json(ubication);
        });
    }
    static deleteUbicationFromRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            console.log(id);
            const deleted = yield Database.deleteUbication(id);
            res.json({ deleted: deleted });
        });
    }
    static getUbicationFromRequest(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield Ubication.getUbication(id);
        });
    }
    static getUbicationFromRequestById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            return yield Ubication.getUbication(id);
        });
    }
}
