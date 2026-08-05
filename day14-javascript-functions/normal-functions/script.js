// normal function

function welcome() {
  // function body
  console.log("Welcome learners");
}

// callback
welcome();
welcome();
welcome();

let a = 5;
let b = 10;

let c = 100;
let d = 101;

function addNumbers(n1, n2) {
  // let n1 = 5;
  // let n2 = 10;
  console.log(n1 + n2);
}

addNumbers(a, b);
addNumbers(c, d);

function validator(num1, num2) {
  if (num1 > num2) {
    console.log("C is greater than D");
  } else if (num1 === num2) {
    console.log("Both are equal");
  } else {
    console.log("D is greater than C");
  }
}

validator(c, d);

let scores = 400;
let student = "Narasimhan";

let scores2 = 465;
let studentname = "Someone";

function grade(marks, student) {
  if (marks >= 450) {
    return `Congrats ${student}, you've got A+ Grade`;
  } else if (marks >= 400) {
    return `Congrats ${student}, you've got B Grade`;
  } else if (marks >= 350) {
    return `Congrats ${student}, you've got C Grade`;
  } else {
    return `Needs improvement ${student}`;
  }
}

console.log(grade(scores, student));
console.log(grade(scores2, studentname));

// return statement
function greet() {
  // console.log("Welcome");
  return "Welcome";
}

console.log(greet());

// Function Currying
function addNums(a){
  return function (b){
    return function (c){
      return a + b + c;
    }
  }
};

console.log(addNums(10)(10)(100));