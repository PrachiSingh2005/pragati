
import axios from 'axios';

async function debugLogin() {
    try {
        console.log('Hitting: http://localhost:5000/api/auth/login');
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'ps@gmail.com',
            password: 'password123'
        });
        console.log('Status:', res.status);
        console.log('Data:', res.data);
    } catch (error: any) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

debugLogin();
