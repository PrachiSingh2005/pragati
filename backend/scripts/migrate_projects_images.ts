import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database/pragati.sqlite');
import fs from 'fs';

if (!fs.existsSync(dbPath)) {
    console.error(`Database file not found at: ${dbPath}`);
    process.exit(1);
}

async function migrate() {
    console.log('Opening database...');
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    console.log('Checking projects table for images column...');
    const tableInfo = await db.all("PRAGMA table_info(projects)");
    const hasImagesColumn = tableInfo.some((col: any) => col.name === 'images');

    if (!hasImagesColumn) {
        console.log('Adding images column to projects table...');
        await db.run("ALTER TABLE projects ADD COLUMN images TEXT");
        console.log('Column added successfully.');
    } else {
        console.log('images column already exists.');
    }

    console.log('Migration complete.');
}

migrate().catch(console.error);
