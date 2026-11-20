// http, check & sleep
import http from 'k6/http';
import { check, sleep } from 'k6';

// Test Configuration
export const options = {
    // Stages
    stages: [
        {duration: '10s', target: 5},
        {duration: '20s', target: 20},
        {duration: '25s', target: 50},
        {duration: '40s', target: 150},
        {duration: '45s', target: 40},
        {duration: '10s', target: 0}
    ]
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