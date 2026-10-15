// import axios from 'axios';
// const axios = require('axios');
const express = require('express');
const app = express();

// 3000, 3001, 3002, 8080, 8081, 8082, 8083
app.listen(8080, () => {
    console.log("Server running on 8080");
});