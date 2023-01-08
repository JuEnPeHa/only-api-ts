var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Low, JSONFile } from "lowdb";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
let file = join(__dirname, "db.json");
let db;
export var Database;
(function (Database) {
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            const adapter = new JSONFile(file);
            db = new Low(adapter);
            yield db.read();
            db.data || (db.data = []);
            yield db.write();
            console.log(`Database connected at ${file} with data: ${db.data}`);
        });
    }
    Database.init = init;
    function getUbications() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.read();
            return db.data;
        });
    }
    Database.getUbications = getUbications;
    function getUbication(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.read();
            const internalData = db.data || [];
            return internalData.find((u) => u.id === id) || "Ubication not found";
        });
    }
    Database.getUbication = getUbication;
    function createUbication(ubication) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.read();
            db.data != null ? db.data.push(ubication) : (db.data = [ubication]);
            yield db.write();
        });
    }
    Database.createUbication = createUbication;
    function deleteUbication(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.read();
            const internalData = db.data || [];
            let found = false;
            //Run a for each to find the ubication with the id and delete it
            internalData.forEach((u, index) => {
                console.log(u.id);
                if (u.id === id) {
                    console.log("Deleting ubication");
                    internalData.splice(index, 1);
                    found = true;
                }
            });
            yield db.write();
            return found;
        });
    }
    Database.deleteUbication = deleteUbication;
})(Database = Database || (Database = {}));
