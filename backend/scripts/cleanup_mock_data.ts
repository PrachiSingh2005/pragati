
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'database/pragati.sqlite');

if (!fs.existsSync(dbPath)) {
    console.error(`Database file not found at: ${dbPath}`);
    process.exit(1);
}

async function cleanup() {
    console.log('--- Starting Data Cleanup ---');
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log('1. Deleting Mock Projects...');
        // Delete projects with "Test Project" in title
        const projResult = await db.run("DELETE FROM projects WHERE title LIKE '%Test Project%'");
        console.log(`   -> Deleted ${projResult.changes} projects.`);

        // Delete projects with "TestCat" or "TESTCAT" categories (if any left by ID association, though we filter by title mainly)
        // Let's also delete by category name match just in case
        const projCatResult = await db.run("DELETE FROM projects WHERE category LIKE 'TestCat%' OR category LIKE 'TESTCAT%'");
        console.log(`   -> Deleted ${projCatResult.changes} projects associated with Test Categories.`);


        console.log('2. Deleting Mock Categories...');
        const catResult = await db.run("DELETE FROM portfolio_categories WHERE name LIKE 'TestCat%' OR name LIKE 'TESTCAT%'");
        console.log(`   -> Deleted ${catResult.changes} categories.`);

        console.log('--- Cleanup Complete ---');

    } catch (error) {
        console.error('--- Cleanup Failed ---', error);
        process.exit(1);
    }
}

cleanup();
