import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import fs from 'fs';
import path from 'path';

let db: Database | null = null;

export const initializeDatabase = async () => {
    if (db) return db;

    const dbPath = path.join(__dirname, '../../database/pragati.sqlite');
    const sqlPath = path.join(__dirname, '../../database/pragati_design_studio.sql');

    try {
        // Open database
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log('Connected to the SQLite database.');

        // Check if tables exist
        const row = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='navbar_links'");

        // If not, execute the SQL file
        if (!row) {
            console.log('Initializing database with schema and seed data...');
            const sql = fs.readFileSync(sqlPath, 'utf8');

            // Split by semicolon to execute one by one (simplified) 
            // OR better, use exec() if supported for multiple statements
            await db.exec(sql);
            console.log('Database initialized successfully.');
        } else {
            console.log('Database already initialized.');
        }

        return db;
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

export const getDb = async () => {
    if (!db) {
        await initializeDatabase();
    }
    return db!;
};
