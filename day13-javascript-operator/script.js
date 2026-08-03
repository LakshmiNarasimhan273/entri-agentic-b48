// Expressions
let username = "Narasimhan";
let role = "admin";
console.log("Welcome back", username, role);

// Expression B type
console.log(`Welcome Back ${username} ${role} you're logged in`);

// Operators

// Arithmetic operator
let num1 = 70;
let num2 = 54;

console.log(num1 + num2);
console.log(num1 - num2);
console.log(num1 * num2);
console.log(num1 / num2);
console.log(5 + 5);

// Assignment operator * = *
let balance = 1000;
// balance = balance + 500;
balance += 500; // pre assignment operator
console.log(balance);

balance -= 300;
console.log(balance);

// Comparison(relational) operator
let age = 18;
console.log(age > 18);
console.log(age < 18);
console.log(age >= 18);
console.log(age <= 18);

// * Important operators
console.log(age == "18");
// == it checks the value is equal or not
console.log(age === "18");
// === it checks the both value and data types are equal
console.log(age !== 20);

// Logical Operator
// (AND, OR, NOT)

let userAge = 20;
let eligible = false;
// AND &&
console.log(userAge >= 18 && eligible);
// OR ||
console.log(userAge >= 18 || eligible);
// NOT (opposite)
let loggedin = false;
console.log(!loggedin);

// Increment & Decrement Operator
let likes = 500;
likes++;
console.log(likes);
likes--;
console.log(likes);

// Ternary operator
// ? - true
// : - false
let citizenAge = 17;
citizenAge >= 18 ? console.log("Eligible") : console.log("Not Eligible");

// Conditional Statements
// if(true) else(false)

// level 1
if (citizenAge >= 18) {
  console.log("Eligible for voting");
} else {
  console.log("Not eligible for voting");
}

// level 2
let mark = 320;

if (mark >= 450) {
  console.log("Grade A");
} else if (mark >= 400) {
  console.log("Grade B");
} else if (mark >= 350) {
  console.log("Grade C");
} else {
  console.log("Low Mark");
}

// level 3
// nested condition
let eligibleAge = 30;
let userId = false;

if(eligibleAge >= 20){
    // id proof check
    if(userId){
        console.log("Entry allowed");
    }else{
        console.log("ID required");
    }
} else {
    console.log("Age Constraints");
}

// Real world example
// Online shopping + logic

let productPrice = 1000;
let quantity = 2;
let productAvailable = true;
let userLoggedin = true;
let walletAmount = 2500;
let primeUser = false;

// Calculate the total price
let totalPrice = productPrice * quantity;

if(productAvailable){

    if(userLoggedin){
        if(primeUser){
            totalPrice -= 100;
        }
        if(walletAmount >= totalPrice){
            console.log("Order placed successfully");
            console.log("Total amount", totalPrice);
        } else {
            console.log("Insufficient balance");
        }
    } else {
        console.log("Please login first");
    }


} else {
    console.log("Product out of stock");
}