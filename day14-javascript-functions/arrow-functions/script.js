// arrow function

function welcome(username){
    return `Welcome back ${username}`
};

console.log(welcome("Narasimhan"));

// arrow function does not need the function keyword
// - arrow function symbol - () => 
// const greet = () => {
    // function body
// }

// greet();
const greet = (name) => `You're logged in, welcome back ${name}`;

console.log(greet("Narasimhan"));

// LEARNERS TASK: Practice the Student Grading system
// (refer: from normal function file)