import { Low, JSONFile } from "lowdb";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Ubication } from "./models/database_model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
let file = join(__dirname, "db.json");
let db: Low<Ubication[]>;

export module Database {
    export async function init() {
        const adapter = new JSONFile<Ubication[]>(file);
        db = new Low(adapter);
        await db.read();
        db.data ||= [];
        await db.write();
        console.log(`Database connected at ${file} with data: ${db.data}`);
    }

    export async function getUbications() {
        await db.read();
        return db.data;
    }

    export async function getUbication(id: string): Promise<Ubication | string> {
        await db.read();
        const internalData = db.data || [];
        return internalData.find((u) => u.id === id) || "Ubication not found";
    }

    export async function createUbication(ubication: Ubication) {
        await db.read();
        db.data != null ? db.data.push(ubication) : (db.data = [ubication]);
        await db.write();
    }

    export async function deleteUbication(id: string): Promise<boolean> {
        await db.read();
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
        }
        );
        await db.write();
        return found;
    }
}