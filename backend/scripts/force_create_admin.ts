
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'database/pragati.sqlite');

async function forceCreateAdmin() {
    console.log('--- Force Creating Admin ---');
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        const email = 'admin@pragati.com';
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if exists
        const existing = await db.get("SELECT * FROM admins WHERE email = ?", email);
        if (existing) {
            console.log(`User ${email} exists. Updating password...`);
            await db.run("UPDATE admins SET password_hash = ? WHERE email = ?", [hashedPassword, email]);
            console.log("Password updated.");
        } else {
            console.log(`Creating user ${email}...`);
            await db.run("INSERT INTO admins (email, password_hash) VALUES (?, ?)", [email, hashedPassword]);
            console.log("User created.");
        }

        const finalUser = await db.get("SELECT * FROM admins WHERE email = ?", email);
        console.log("Verified User:", finalUser);

    } catch (error) {
        console.error("Error:", error);
    }
}

forceCreateAdmin();
