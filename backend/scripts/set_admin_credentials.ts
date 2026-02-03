
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'database/pragati.sqlite');

async function setAdmin() {
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.error('Usage: npx tsx scripts/set_admin_credentials.ts <email> <password>');
        process.exit(1);
    }

    console.log(`--- Setting Admin Credentials for ${email} ---`);
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        // Check availability
        const existing = await db.get("SELECT * FROM admins WHERE email = ?", email);

        // We will also update ANY existing admin to this new one if we want "single admin" mode, 
        // but for now let's just Upsert this specific email or Update if only 1 admin exists?
        // Let's being smart: If there is ONLY one admin and it's a "test/mock" one (like admin@pragati.com), maybe verified by ID?
        // Safest is to just Upsert.

        if (existing) {
            console.log(`Updating password for existing user ${email}...`);
            await db.run("UPDATE admins SET password_hash = ? WHERE email = ?", [hashedPassword, email]);
        } else {
            // Check if we should replace the "mock" admin? 
            // Better not delete data implicitly. Just add new one.
            console.log(`Creating new admin user...`);
            await db.run("INSERT INTO admins (email, password_hash) VALUES (?, ?)", [email, hashedPassword]);
        }

        console.log("✅ Success! You can now login with these credentials.");

    } catch (error) {
        console.error("Error:", error);
    }
}

setAdmin();
