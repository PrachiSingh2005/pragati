import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database/pragati.sqlite');
import fs from 'fs';

if (!fs.existsSync(dbPath)) {
    console.error(`Database file not found at: ${dbPath}`);
    process.exit(1);
}

async function updateNavbar() {
    console.log('Opening database...');
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    console.log('Updating Navbar order...');

    // Home -> 1
    await db.run("UPDATE navbar_links SET display_order = 1 WHERE name = 'Home'");
    // About Us -> 2
    await db.run("UPDATE navbar_links SET display_order = 2 WHERE name = 'About Us'");
    // Portfolio -> 3
    await db.run("UPDATE navbar_links SET display_order = 3 WHERE name = 'Portfolio'");
    // Services -> 4
    await db.run("UPDATE navbar_links SET display_order = 4 WHERE name = 'Services'");

    console.log('Navbar order updated.');

    const links = await db.all("SELECT * FROM navbar_links ORDER BY display_order");
    console.log('New Navbar Order:', links);
}

updateNavbar().catch(console.error);
