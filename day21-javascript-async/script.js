// JavaScript Runtime Flow
console.log(1);
console.log(3);
console.log(2);

// easy example

function one(){
    console.log("Function one");
}

function two(){
    console.log("Function two");
    one();
}

two();

// Synchronous Code
console.log("Started");

function timeDelay(){
    const start = Date.now();
    
    while(Date.now() - start < 2000){

    }
}

timeDelay();

console.log("Executed after time taken");

console.log("End");

// Asynchronous Code
console.log("Started");

// inbuild function - setTimeout - it runs the task once the time is done
setTimeout(function(){
    console.log("Executed After time taken");
}, 4000);

console.log("End");

// Real-time analogy - Food Order - Async
console.log("Customer enters restaurant");

console.log("Customer palces food order");

setTimeout(() => {
    console.log("Food is ready");
}, 5000);

console.log("Customer talks to friend");

console.log("Customer checks phone");

// Tricky interview problem - Multiple async tasks
console.log("Started");

setTimeout(() => {
    console.log("Task 1 completed");
}, 3000);

setTimeout(() => {
    console.log("Task 2 completed");
}, 1000);

setTimeout(() => {
    console.log("Task 3 completed");
}, 2000);

console.log("End");

// API - Applicaiton Programming Interface
// API is just a link | it returns all the data in json(JavaScript Object Notation) format (object like format)

console.log("Started");
// https://fakestoreapi.com/products
fetch("https://fakestoreapi.com/products")
.then(response => response.json())
.then(data => {
    console.log("User data");
    console.log(data);
});

console.log("End");