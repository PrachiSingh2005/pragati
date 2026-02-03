
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';
const TEST_EMAIL = 'admin@pragati.com';
const TEST_PASSWORD = 'password123';

async function testAuth() {
    console.log('--- Starting Auth Flow Test ---');

    // 1. Register (might fail if exists, which is fine)
    console.log(`1. Attempting to register ${TEST_EMAIL}...`);
    try {
        await axios.post(`${API_URL}/register`, {
            email: TEST_EMAIL,
            password: TEST_PASSWORD
        });
        console.log('   -> Registration Success');
    } catch (error: any) {
        if (error.response?.status === 409) {
            console.log('   -> User already exists (Expected if running again)');
        } else {
            console.error('   -> Registration Failed:', error.response?.data || error.message);
        }
    }

    // 2. Login (Should Success)
    console.log(`2. Attempting to login with CORRECT credentials...`);
    try {
        const res = await axios.post(`${API_URL}/login`, {
            email: TEST_EMAIL,
            password: TEST_PASSWORD
        });
        if (res.data.token) {
            console.log('   -> Login Success. Token received.');
        } else {
            console.error('   -> Login Failed. No token.');
        }
    } catch (error: any) {
        console.error('   -> Login Failed:', error.response?.data || error.message);
    }

    // 3. Login (Should Fail)
    console.log(`3. Attempting to login with WRONG password...`);
    try {
        await axios.post(`${API_URL}/login`, {
            email: TEST_EMAIL,
            password: 'wrongpassword'
        });
        console.error('   -> Unwanted Success! Login should have failed.');
    } catch (error: any) {
        if (error.response?.status === 401) {
            console.log('   -> Login Failed as expected (401).');
        } else {
            console.error('   -> Unexpected Error:', error.response?.data || error.message);
        }
    }
}

testAuth();
