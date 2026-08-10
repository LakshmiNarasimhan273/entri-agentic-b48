// loops

// initial variable, condition, update
// run-time: 10ms
for (let i = 1; i <= 10; i++) {
  // console.log(i);
}

// while loop
// run-time: 100ms
let i = 0;

while (i <= 5) {
  // console.log(i);
  i++;
}

// Arrays
let fruits = ["Apple", "Banana", "Mango", "Cherry"];
console.log(fruits);

console.log(fruits[1]);
console.log(fruits[3]);
console.log(fruits[0]);

console.log(fruits.length);

// Object
let learner = {
  // key: value
  name: "Narasimhan",
  course: "FSD",
  moduleCount: 2,
  currentTopic: "JS - Essentials",
  skills: ["html", "css", "js"],
};

console.log(learner);

console.log(learner.name);
console.log(learner.course);

// Real-time examples

// for loop + Array
let veggies = ["Brinjal", "Tomato", "Carrot", "Drum-stick"];
// console.log(veggies[2]);
for (let i = 0; i < veggies.length; i++) {
  console.log(veggies[i]);
}

// Array of Object
let learners = [
  { name: "narasimhan", course: "FSD" },
  { name: "arun", course: "DA" },
  { name: "someone", course: "DS" },
];

console.log(learners);
console.log(learners[1].name);
console.log(learners[2].name);

// Array of Object + for loop
let students = [
  {
    name: "Arun",
    age: 21,
    course: "MERN",
  },
  {
    name: "Priya",
    age: 22,
    course: "Java",
  },
  {
    name: "Kumar",
    age: 20,
    course: "Python",
  },
];

for (let i = 0; i < students.length; i++) {
  console.log(students[i].name);
}
console.log(" ---");
// Real-time example
// Displaying the top scorers

let juniors = [
  {
    name: "Arun",
    course: "MERN",
    score: 85,
  },
  {
    name: "Priya",
    course: "MERN",
    score: 92,
  },
  {
    name: "Karthik",
    course: "MERN",
    score: 76,
  },
  {
    name: "Divya",
    course: "MERN",
    score: 95,
  },
];

for (let i = 0; i < juniors.length; i++) {
  // requirement check
  if (juniors[i].score >= 90) {
    console.log("Name:", juniors[i].name);
    console.log("Score", juniors[i].score);
  }
};
