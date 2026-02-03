
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database/pragati.sqlite');

async function checkAdmins() {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log('--- Admins Table ---');
        const admins = await db.all("SELECT * FROM admins");
        console.log(admins);

        if (admins.length === 0) {
            console.log("No admins found.");
        }
    } catch (error) {
        console.error("Error checking admins:", error);
    }
}

checkAdmins();
