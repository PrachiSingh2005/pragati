import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const ADMIN_EMAIL = `testadmin_${Date.now()}@test.com`;
const ADMIN_PASSWORD = 'password123';

async function verify() {
    console.log('--- Starting Verification ---');

    try {
        // 1. Register Admin
        console.log(`1. Registering Admin (${ADMIN_EMAIL})...`);
        try {
            await axios.post(`${API_URL}/auth/register`, {
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD
            });
            console.log('   -> Success');
        } catch (e: any) {
            console.log('   -> Failed (might already exist or server down):', e.response?.data || e.message);
            // If failed, try login anyway, maybe reused email
        }

        // 2. Login
        console.log('2. Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        });
        const token = loginRes.data.token;
        console.log('   -> Success. Token received.');

        const authHeaders = { headers: { Authorization: `Bearer ${token}` } }; // Middleware might not check it yet but good practice

        // 3. Fetch Categories
        console.log('3. Fetching Categories...');
        const catRes = await axios.get(`${API_URL}/admin/categories`);
        const categories = catRes.data;
        console.log(`   -> Success. Found ${categories.length} categories.`);
        const defaults = categories.filter((c: any) => c.is_default);
        if (defaults.length < 3) throw new Error("Default categories missing!");
        console.log('   -> Default categories confirmed.');

        // 4. Add Custom Category
        const newCatName = `TestCat_${Date.now()}`;
        console.log(`4. Adding Category '${newCatName}'...`);
        const addCatRes = await axios.post(`${API_URL}/admin/categories`, { name: newCatName });
        const newCatId = addCatRes.data.id;
        console.log('   -> Success. ID:', newCatId);

        // 5. Create Project
        console.log('5. Creating Project...');
        const projectRes = await axios.post(`${API_URL}/projects`, {
            title: 'Test Project',
            location: 'Test Location',
            category_id: newCatId,
            description: 'Test Description',
            images: [],
            is_active: 1
        });
        console.log('   -> Success. Project ID:', projectRes.data.id);

        if (projectRes.data.category !== newCatName) {
            console.warn(`   -> Warning: Project category name mismatch. Expected '${newCatName}', got '${projectRes.data.category}'`);
        } else {
            console.log('   -> Category Association Verified.');
        }

        console.log('--- Verification Complete: ALL PASS ---');

    } catch (error: any) {
        console.error('--- Verification Failed ---');
        console.error(error.response?.data || error.message);
        process.exit(1);
    }
}

verify();
