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

// Login Admin (Real Database Authentication)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            console.log('[Login] Missing email or password');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        console.log(`[Login] Attempt for email: ${email}`);

        // Get database connection
        const db = await getDb();

        // Fetch admin by email
        const admin = await db.get(
            'SELECT * FROM administrators WHERE email = ?',
            [email.toLowerCase().trim()]
        );

        // Check if admin exists
        if (!admin) {
            console.log(`[Login] Admin not found: ${email}`);
            return res.status(401).json({ error: 'Admin not found' });
        }

        console.log(`[Login] Admin found: ${admin.email} (ID: ${admin.id})`);

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

        if (!isPasswordValid) {
            console.log(`[Login] Incorrect password for: ${email}`);
            return res.status(401).json({ error: 'Incorrect password' });
        }

        console.log(`[Login] Password verified for: ${email}`);

        // Create JWT token
        const tokenPayload = {
            id: admin.id,
            email: admin.email,
            role: 'admin'
        };

        const token = jwt.sign(
            tokenPayload,
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log(`[Login] Success! Token generated for: ${email}`);

        // Return success response
        res.json({
            user: {
                id: admin.id,
                email: admin.email
            },
            token
        });

    } catch (error) {
        console.error('[Login] Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
