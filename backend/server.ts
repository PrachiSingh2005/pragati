import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from './src/routes/api.routes';
import { initializeDatabase } from './src/config/db';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets (images)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Basic root route
app.get('/', (req, res) => {
    res.send('Pragati Design Studio API is running. Access endpoints at /api/...');
});

// Routes
app.use('/api', apiRoutes);

// Initialize DB and start server
const startServer = async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
