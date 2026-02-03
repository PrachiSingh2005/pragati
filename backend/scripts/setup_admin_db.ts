import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'database/pragati.sqlite');

if (!fs.existsSync(dbPath)) {
    console.error(`Database file not found at: ${dbPath}`);
    process.exit(1);
}

const DEFAULT_CATEGORIES = ['Residential', 'Commercial', 'Hospitality'];

async function setupAdminDb() {
    console.log('Opening database...');
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    console.log('Setting up Admin DB Schema...');

    // 1. Portfolio Categories
    await db.exec(`
        CREATE TABLE IF NOT EXISTS portfolio_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            is_default BOOLEAN DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Seed Default Categories
    for (const cat of DEFAULT_CATEGORIES) {
        const exists = await db.get('SELECT id FROM portfolio_categories WHERE name = ?', cat);
        if (!exists) {
            console.log(`Seeding default category: ${cat}`);
            await db.run('INSERT INTO portfolio_categories (name, is_default) VALUES (?, 1)', cat);
        }
    }

    // 2. Admins Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Check if any admin exists, if not create a default one (optional, but good for testing if requested, 
    // user said "Admins can ADD... custom categories" and "Admin registers using own email/password", 
    // but implies we need an initial way to register or seed? 
    // Task 2C says "Admin registers using own email/password". 
    // Task 2A says "Delete... Seeded admin users".
    // I will NOT seed an admin unless necessary. I will create a registration endpoint.

    // 3. Update Projects Table (Add category_id)
    console.log('Checking projects table for category_id...');
    const tableInfo = await db.all("PRAGMA table_info(projects)");
    const hasCategoryId = tableInfo.some((col: any) => col.name === 'category_id');

    if (!hasCategoryId) {
        console.log('Adding category_id column to projects table...');
        await db.run("ALTER TABLE projects ADD COLUMN category_id INTEGER REFERENCES portfolio_categories(id)");

        // Migrate existing string categories to IDs
        console.log('Migrating existing project categories...');
        const projects = await db.all('SELECT id, category FROM projects');

        for (const p of projects) {
            if (p.category) {
                // Find matching category ID
                let catRow = await db.get('SELECT id FROM portfolio_categories WHERE name = ?', p.category);

                // If not found (was a custom string), insert it as custom category
                if (!catRow) {
                    console.log(`Found custom category '${p.category}' in projects. Adding to categories...`);
                    const result = await db.run('INSERT INTO portfolio_categories (name, is_default) VALUES (?, 0)', p.category);
                    catRow = { id: result.lastID };
                }

                // Update project
                await db.run('UPDATE projects SET category_id = ? WHERE id = ?', [catRow.id, p.id]);
            }
        }
        console.log('Project categories migrated.');
    } else {
        console.log('category_id column already exists.');
    }

    console.log('Database setup complete.');
}

setupAdminDb().catch(console.error);
