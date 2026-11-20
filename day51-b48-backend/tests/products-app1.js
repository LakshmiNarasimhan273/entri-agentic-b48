// http, check & sleep
import http from 'k6/http';
import { check, sleep } from 'k6';

// Test Configuration
export const options = {
    vus: 10,
    duration: '30s'
};

// Test function
export default function(){
    // API Call
    const response = http.get('http://localhost:8081/products');

    // Validate the response
    check(response, {
        'Status code is 200': (res) => res.status === 200,

        'Response time below 500ms': (res) => res.timings.duration < 500
    });
    sleep(1);
};