
import axios from 'axios';

const API_URL = 'http://localhost:5000';

async function testLogin() {
    console.log('--- Testing Root URL ---');
    try {
        const rootRes = await axios.get(API_URL);
        console.log('Root Status:', rootRes.status);
        console.log('Root Data:', rootRes.data);
    } catch (error: any) {
        console.error('Root Error:', error.message);
    }

    console.log('\n--- Testing Mock Login ---');
    try {
        const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
            email: 'admin@pragati.com',
            password: 'admin123'
        });
        console.log('Login Status:', loginRes.status);
        console.log('Login Data:', JSON.stringify(loginRes.data, null, 2));
    } catch (error: any) {
        if (error.response) {
            console.error('Login Error Status:', error.response.status);
            console.error('Login Error Data:', error.response.data);
        } else {
            console.error('Login Error:', error.message);
        }
    }
}

testLogin();
