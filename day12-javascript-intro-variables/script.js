// variables

// var, let, const

// variable declaration

// syntax: keyword variableName = variableValue;
var username = "narasimhan";
console.log(username);

let role = "mentor";
console.log(role);

const skills = "web development";
console.log(skills);

// Nature of Variable keywords * FAQ in product interviews
// var - global scope | values can be updated
// let - block scope  | values can be updated in different way
// const - block scope | values cannot updated once it is assigned

// Values updates nature

// Global scope accept the second variable creation
var a = 5;
var a = 10;
console.log(a);

// Block scope never accept the second variable creation
let b = 2;
b = 100;
console.log(b);

// const can't allow to change the value
const profession = "mentor";
// profession = "developer";
console.log(profession);

// * Interview Question - Hoisting`(one and only supporting variable key is VAR)

console.log(entri);
var entri = "edtech";

console.log(laptop);
const laptop;

// module 1 - week 4 - javascript syntax