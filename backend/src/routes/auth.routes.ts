import { Router } from 'express';
import { getDb } from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'pragati-secret-key-change-this-in-prod';

// Register Admin (Optional - mainly for initial setup via Postman/Curl)
router.post('/register', async (req, res) => {
    try {
        const db = await getDb();
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const result = await db.run(
                'INSERT INTO admins (email, password_hash) VALUES (?, ?)',
                [email, hashedPassword]
            );
            res.status(201).json({ id: result.lastID, email, message: 'Admin created successfully' });
        } catch (dbError: any) {
            if (dbError.message && dbError.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'Email already exists' });
            }
            throw dbError;
        }

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login Admin
router.post('/login', async (req, res) => {
    try {
        const db = await getDb();
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('[Login Attempt] Missing email or password');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        console.log(`[Login Attempt] Email: ${email}`);

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();
        const admin = await db.get('SELECT * FROM admins WHERE email = ?', normalizedEmail);

        console.log(`[Login Attempt] DB Result:`, admin ? 'Found User' : 'User Not Found');

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, admin.password_hash);
        console.log(`[Login Attempt] Password Valid: ${isValid}`);

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            user: { id: admin.id, email: admin.email },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
